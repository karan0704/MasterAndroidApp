import RNFS from 'react-native-fs';
import { getDatabase } from '../../../storage/db/database';
import type { Download, VideoQuality } from '../contracts/youtube.contract';
import { youtubeService } from './youtubeService';

const DOWNLOADS_DIR = `${RNFS.DocumentDirectoryPath}/youtube-downloads`;
const VIDEOS_DIR = `${DOWNLOADS_DIR}/videos`;
const AUDIO_DIR = `${DOWNLOADS_DIR}/audio`;
const THUMBNAILS_DIR = `${DOWNLOADS_DIR}/thumbnails`;

// Track active downloads for progress updates
const activeDownloadsProgress = new Map<string, { abortController: AbortController }>();

export const downloadService = {
  /**
   * Initialize directories for downloads
   */
  async ensureDirectories(): Promise<void> {
    const dirs = [DOWNLOADS_DIR, VIDEOS_DIR, AUDIO_DIR, THUMBNAILS_DIR];

    for (const dir of dirs) {
      const exists = await RNFS.exists(dir);
      if (!exists) {
        await RNFS.mkdir(dir, { NSURLIsExcludedFromBackupKey: true });
      }
    }
  },

  /**
   * Start a new download
   */
  async startDownload(
    youtubeId: string,
    title: string,
    url: string,
    quality: VideoQuality,
  ): Promise<Download> {
    await this.ensureDirectories();

    const id = `${youtubeId}_${quality}_${Date.now()}`;
    const timestamp = new Date().toISOString();

    // Get download URL from youtube service
    const downloadInfo = await youtubeService.getDownloadUrl(youtubeId, quality);

    // Determine file path
    const ext = quality === 'audio' ? '.mp3' : '.mp4';
    const dir = quality === 'audio' ? AUDIO_DIR : VIDEOS_DIR;
    const filePath = `${dir}/${youtubeId}_${quality}_${Date.now()}${ext}`;

    // Create download record in database
    const db = await getDatabase();
    await db.executeAsync(
      `INSERT INTO youtube_downloads (
        id, youtube_id, title, url, quality, status,
        file_path, total_size, downloaded_size, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        youtubeId,
        title,
        url,
        quality,
        'pending',
        filePath,
        downloadInfo.size,
        0,
        timestamp,
      ],
    );

    // Start download
    const abortController = new AbortController();
    activeDownloadsProgress.set(id, { abortController });

    // Download in background
    this.performDownload(id, youtubeId, filePath, downloadInfo.url, downloadInfo.size).catch(
      error => {
        console.error(`Download failed: ${error.message}`);
        this.markDownloadFailed(id, error.message).catch(console.error);
      },
    );

    // Return initial download object
    return {
      id,
      youtube_id: youtubeId,
      title,
      url,
      quality,
      status: 'downloading' as const,
      file_path: filePath,
      total_size: downloadInfo.size,
      downloaded_size: 0,
      created_at: timestamp,
    } as Download;
  },

  /**
   * Perform actual file download with progress tracking
   */
  async performDownload(
    downloadId: string,
    youtubeId: string,
    filePath: string,
    downloadUrl: string,
    totalSize: number,
  ): Promise<void> {
    const db = await getDatabase();

    try {
      // Update status to downloading
      await db.executeAsync(
        `UPDATE youtube_downloads SET status = ?, started_at = ? WHERE id = ?`,
        ['downloading', new Date().toISOString(), downloadId],
      );

      // Use RNFS downloadFile for better React Native support with progress tracking
      const downloadResult = await RNFS.downloadFile({
        fromUrl: downloadUrl,
        toFile: filePath,
        progressInterval: 500,
        begin: () => {
          // Download started
        },
        progress: async (res: { bytesWritten: number; contentLength: number }) => {
          // Update progress in database
          const percentage = Math.floor((res.bytesWritten / res.contentLength) * 100);
          await db.executeAsync(
            `UPDATE youtube_downloads SET downloaded_size = ? WHERE id = ?`,
            [res.bytesWritten, downloadId],
          );
        },
      }).promise;

      if (downloadResult.statusCode !== 200) {
        throw new Error(`Download failed with status ${downloadResult.statusCode}`);
      }

      // Mark as completed
      const fileStats = await RNFS.stat(filePath);
      await db.executeAsync(
        `UPDATE youtube_downloads SET status = ?, completed_at = ?, downloaded_size = ?, file_size = ? WHERE id = ?`,
        ['completed', new Date().toISOString(), fileStats.size, fileStats.size, downloadId],
      );

      activeDownloadsProgress.delete(downloadId);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Pause a download
   */
  async pauseDownload(downloadId: string): Promise<void> {
    const db = await getDatabase();

    const progress = activeDownloadsProgress.get(downloadId);
    if (progress) {
      progress.abortController.abort();
    }

    await db.executeAsync(`UPDATE youtube_downloads SET status = ? WHERE id = ?`, [
      'paused',
      downloadId,
    ]);
  },

  /**
   * Resume a paused download
   */
  async resumeDownload(downloadId: string): Promise<void> {
    const db = await getDatabase();

    const result = await db.executeAsync<Download>(
      `SELECT * FROM youtube_downloads WHERE id = ?`,
      [downloadId],
    );

    if (result.rows.length === 0) {
      throw new Error('Download not found');
    }

    const download = result.rows.item(0) as Download;
    const youtubeId = download.youtube_id || download.youtubeId;
    const filePath = download.file_path || download.filePath;

    if (!youtubeId) throw new Error('Invalid download: missing youtube_id');
    if (!filePath) throw new Error('Invalid download: missing file_path');

    // Restart download
    const downloadInfo = await youtubeService.getDownloadUrl(
      youtubeId,
      download.quality,
    );

    const abortController = new AbortController();
    activeDownloadsProgress.set(downloadId, { abortController });

    this.performDownload(
      downloadId,
      youtubeId,
      filePath,
      downloadInfo.url,
      downloadInfo.size,
    ).catch(error => {
      this.markDownloadFailed(downloadId, error.message).catch(console.error);
    });

    await db.executeAsync(`UPDATE youtube_downloads SET status = ? WHERE id = ?`, [
      'downloading',
      downloadId,
    ]);
  },

  /**
   * Cancel a download and delete partial file
   */
  async cancelDownload(downloadId: string): Promise<void> {
    const db = await getDatabase();

    const progress = activeDownloadsProgress.get(downloadId);
    if (progress) {
      progress.abortController.abort();
      activeDownloadsProgress.delete(downloadId);
    }

    const result = await db.executeAsync<Download>(
      `SELECT * FROM youtube_downloads WHERE id = ?`,
      [downloadId],
    );

    if (result.rows.length > 0) {
      const download = result.rows.item(0) as Download;
      if (download.filePath) {
        const exists = await RNFS.exists(download.filePath);
        if (exists) {
          await RNFS.unlink(download.filePath);
        }
      }
    }

    await db.executeAsync(`DELETE FROM youtube_downloads WHERE id = ?`, [downloadId]);
  },

  /**
   * Mark download as failed
   */
  async markDownloadFailed(downloadId: string, errorMessage: string): Promise<void> {
    const db = await getDatabase();

    await db.executeAsync(
      `UPDATE youtube_downloads SET status = ?, error_message = ? WHERE id = ?`,
      ['failed', errorMessage, downloadId],
    );

    activeDownloadsProgress.delete(downloadId);
  },

  /**
   * Get active downloads
   */
  async getActiveDownloads(): Promise<Download[]> {
    const db = await getDatabase();

    const result = await db.executeAsync<Download>(
      `SELECT * FROM youtube_downloads WHERE status IN ('pending', 'downloading', 'paused')
       ORDER BY created_at DESC`,
      [],
    );

    const downloads: Download[] = [];
    for (let i = 0; i < result.rows.length; i++) {
      downloads.push(result.rows.item(i) as Download);
    }

    return downloads;
  },

  /**
   * Get completed downloads
   */
  async getCompletedDownloads(): Promise<Download[]> {
    const db = await getDatabase();

    const result = await db.executeAsync<Download>(
      `SELECT * FROM youtube_downloads WHERE status = 'completed'
       ORDER BY completed_at DESC LIMIT 50`,
      [],
    );

    const downloads: Download[] = [];
    for (let i = 0; i < result.rows.length; i++) {
      downloads.push(result.rows.item(i) as Download);
    }

    return downloads;
  },

  /**
   * Get failed downloads
   */
  async getFailedDownloads(): Promise<Download[]> {
    const db = await getDatabase();

    const result = await db.executeAsync<Download>(
      `SELECT * FROM youtube_downloads WHERE status = 'failed'
       ORDER BY created_at DESC LIMIT 50`,
      [],
    );

    const downloads: Download[] = [];
    for (let i = 0; i < result.rows.length; i++) {
      downloads.push(result.rows.item(i) as Download);
    }

    return downloads;
  },

  /**
   * Get download by ID
   */
  async getDownload(downloadId: string): Promise<Download | null> {
    const db = await getDatabase();

    const result = await db.executeAsync<Download>(
      `SELECT * FROM youtube_downloads WHERE id = ?`,
      [downloadId],
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows.item(0) as Download;
  },

  /**
   * Get all downloads
   */
  async getAllDownloads(): Promise<Download[]> {
    const db = await getDatabase();

    const result = await db.executeAsync<Download>(
      `SELECT * FROM youtube_downloads ORDER BY created_at DESC`,
      [],
    );

    const downloads: Download[] = [];
    for (let i = 0; i < result.rows.length; i++) {
      downloads.push(result.rows.item(i) as Download);
    }

    return downloads;
  },
};
