import RNFS from 'react-native-fs';
import { getDatabase } from '../../../storage/db/database';
import type { Download, VideoQuality } from '../contracts/youtube.contract';
import { youtubeService } from './youtubeService';

const DOWNLOADS_DIR = `${RNFS.DocumentDirectoryPath}/youtube-downloads`;
const VIDEOS_DIR = `${DOWNLOADS_DIR}/videos`;
const AUDIO_DIR = `${DOWNLOADS_DIR}/audio`;
const THUMBNAILS_DIR = `${DOWNLOADS_DIR}/thumbnails`;

const activeDownloadsProgress = new Map<string, { abortController: AbortController }>();

export const downloadService = {
  async ensureDirectories(): Promise<void> {
    const dirs = [DOWNLOADS_DIR, VIDEOS_DIR, AUDIO_DIR, THUMBNAILS_DIR];
    for (const dir of dirs) {
      const exists = await RNFS.exists(dir);
      if (!exists) {
        await RNFS.mkdir(dir, { NSURLIsExcludedFromBackupKey: true });
      }
    }
  },

  async startDownload(
    youtubeId: string,
    title: string,
    url: string,
    quality: VideoQuality,
  ): Promise<Download> {
    await this.ensureDirectories();

    const id = `${youtubeId}_${quality}_${Date.now()}`;
    const timestamp = new Date().toISOString();

    const downloadInfo = await youtubeService.getDownloadUrl(youtubeId, quality);

    const ext = quality === 'audio' ? '.mp3' : '.mp4';
    const dir = quality === 'audio' ? AUDIO_DIR : VIDEOS_DIR;
    const filePath = `${dir}/${youtubeId}_${quality}_${Date.now()}${ext}`;

    const db = await getDatabase();
    await db.executeAsync(
      `INSERT INTO youtube_downloads (
        id, youtube_id, title, url, quality, status,
        file_path, total_size, downloaded_size, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, youtubeId, title, url, quality, 'pending', filePath, downloadInfo.size, 0, timestamp],
    );

    const abortController = new AbortController();
    activeDownloadsProgress.set(id, { abortController });

    this.performDownload(id, youtubeId, filePath, downloadInfo.url, downloadInfo.size).catch(
      error => {
        console.error(`Download failed: ${error.message}`);
        this.markDownloadFailed(id, error.message).catch(console.error);
      },
    );

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

  async performDownload(
    downloadId: string,
    youtubeId: string,
    filePath: string,
    downloadUrl: string,
    totalSize: number,
  ): Promise<void> {
    const db = await getDatabase();

    try {
      await db.executeAsync(
        `UPDATE youtube_downloads SET status = ?, started_at = ? WHERE id = ?`,
        ['downloading', new Date().toISOString(), downloadId],
      );

      const task = RNFS.downloadFile({
        fromUrl: downloadUrl,
        toFile: filePath,
        begin: () => {
          console.log(`Download started: ${downloadId}`);
        },
        progress: (res) => {
          const progress = res.bytesWritten / (res.contentLength || totalSize);
          console.log(`Download progress: ${downloadId} - ${Math.round(progress * 100)}%`);
        },
      });

      const result = await task.promise;

      if (result.statusCode !== 200) {
        throw new Error(`Download failed with status ${result.statusCode}`);
      }

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

  async pauseDownload(downloadId: string): Promise<void> {
    const db = await getDatabase();
    const progress = activeDownloadsProgress.get(downloadId);
    if (progress) {
      progress.abortController.abort();
    }
    await db.executeAsync(`UPDATE youtube_downloads SET status = ? WHERE id = ?`, ['paused', downloadId]);
  },

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

    const downloadInfo = await youtubeService.getDownloadUrl(youtubeId, download.quality);

    const abortController = new AbortController();
    activeDownloadsProgress.set(downloadId, { abortController });

    this.performDownload(downloadId, youtubeId, filePath, downloadInfo.url, downloadInfo.size).catch(
      error => {
        this.markDownloadFailed(downloadId, error.message).catch(console.error);
      },
    );

    await db.executeAsync(`UPDATE youtube_downloads SET status = ? WHERE id = ?`, ['downloading', downloadId]);
  },

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

  async markDownloadFailed(downloadId: string, errorMessage: string): Promise<void> {
    const db = await getDatabase();
    await db.executeAsync(
      `UPDATE youtube_downloads SET status = ?, error_message = ? WHERE id = ?`,
      ['failed', errorMessage, downloadId],
    );
    activeDownloadsProgress.delete(downloadId);
  },

  async getActiveDownloads(): Promise<Download[]> {
    const db = await getDatabase();
    const result = await db.executeAsync<Download>(
      `SELECT * FROM youtube_downloads WHERE status IN ('pending', 'downloading', 'paused') ORDER BY created_at DESC`,
      [],
    );

    const downloads: Download[] = [];
    for (let i = 0; i < result.rows.length; i++) {
      downloads.push(result.rows.item(i) as Download);
    }
    return downloads;
  },

  async getCompletedDownloads(): Promise<Download[]> {
    const db = await getDatabase();
    const result = await db.executeAsync<Download>(
      `SELECT * FROM youtube_downloads WHERE status = 'completed' ORDER BY completed_at DESC LIMIT 50`,
      [],
    );

    const downloads: Download[] = [];
    for (let i = 0; i < result.rows.length; i++) {
      downloads.push(result.rows.item(i) as Download);
    }
    return downloads;
  },

  async getFailedDownloads(): Promise<Download[]> {
    const db = await getDatabase();
    const result = await db.executeAsync<Download>(
      `SELECT * FROM youtube_downloads WHERE status = 'failed' ORDER BY created_at DESC LIMIT 50`,
      [],
    );

    const downloads: Download[] = [];
    for (let i = 0; i < result.rows.length; i++) {
      downloads.push(result.rows.item(i) as Download);
    }
    return downloads;
  },

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
