import { useEffect, useRef, useState } from 'react';
import type { Download, VideoQuality, DownloadsState } from '../contracts/youtube.contract';
import { downloadService } from '../services/downloadService';
import { youtubeService } from '../services/youtubeService';
import { downloadsStore } from '../store/downloadsStore';

export function useYoutubeDownloads() {
  const [state, setState] = useState<DownloadsState>({
    activeDownloads: [],
    completedDownloads: [],
    failedDownloads: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoMetadata, setVideoMetadata] = useState<any>(null);
  const [availableQualities, setAvailableQualities] = useState<
    { quality: string; label: string }[]
  >([]);

  const isMountedRef = useRef(true);
  const refreshIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Initialize
  useEffect(() => {
    const initializeDownloads = async () => {
      try {
        setIsLoading(true);
        await downloadService.ensureDirectories();

        const active = await downloadService.getActiveDownloads();
        const completed = await downloadService.getCompletedDownloads();
        const failed = await downloadService.getFailedDownloads();

        if (isMountedRef.current) {
          setState({ activeDownloads: active, completedDownloads: completed, failedDownloads: failed });
          setError(null);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to initialize';
        if (isMountedRef.current) {
          setError(message);
        }
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      }
    };

    initializeDownloads();

    // Start refresh interval for progress updates
    refreshIntervalRef.current = setInterval(async () => {
      try {
        const active = await downloadService.getActiveDownloads();
        if (isMountedRef.current) {
          setState(prev => ({ ...prev, activeDownloads: active }));
        }
      } catch (err) {
        console.error('Error refreshing downloads:', err);
      }
    }, 1000); // Update every second

    return () => {
      isMountedRef.current = false;
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, []);

  const fetchVideoMetadata = async (url: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Validate URL
      if (!youtubeService.isValidYoutubeUrl(url)) {
        throw new Error('Invalid YouTube URL');
      }

      // Fetch metadata
      const metadata = await youtubeService.fetchVideoMetadata(url);
      setVideoMetadata(metadata);

      // Get available qualities
      const qualities = await youtubeService.getAvailableQualities(metadata.youtubeId);
      setAvailableQualities(qualities);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch metadata';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const startDownload = async (quality: VideoQuality) => {
    if (!videoMetadata) {
      setError('No video selected');
      return;
    }

    try {
      setError(null);
      const download = await downloadService.startDownload(
        videoMetadata.youtubeId,
        videoMetadata.title,
        videoMetadata.url,
        quality,
      );

      if (isMountedRef.current) {
        setState(prev => ({
          ...prev,
          activeDownloads: [download, ...prev.activeDownloads],
        }));
      }

      // Clear metadata after starting
      setVideoMetadata(null);
      setAvailableQualities([]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to start download';
      setError(message);
    }
  };

  const pauseDownload = async (downloadId: string) => {
    try {
      setError(null);
      await downloadService.pauseDownload(downloadId);

      if (isMountedRef.current) {
        setState(prev => ({
          ...prev,
          activeDownloads: prev.activeDownloads.map(d =>
            d.id === downloadId ? { ...d, status: 'paused' } : d,
          ),
        }));
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to pause download';
      setError(message);
    }
  };

  const resumeDownload = async (downloadId: string) => {
    try {
      setError(null);
      await downloadService.resumeDownload(downloadId);

      if (isMountedRef.current) {
        setState(prev => ({
          ...prev,
          activeDownloads: prev.activeDownloads.map(d =>
            d.id === downloadId ? { ...d, status: 'downloading' } : d,
          ),
        }));
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to resume download';
      setError(message);
    }
  };

  const cancelDownload = async (downloadId: string) => {
    try {
      setError(null);
      await downloadService.cancelDownload(downloadId);

      if (isMountedRef.current) {
        setState(prev => ({
          ...prev,
          activeDownloads: prev.activeDownloads.filter(d => d.id !== downloadId),
        }));
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to cancel download';
      setError(message);
    }
  };

  return {
    // State
    activeDownloads: state.activeDownloads,
    completedDownloads: state.completedDownloads,
    failedDownloads: state.failedDownloads,
    isLoading,
    error,
    videoMetadata,
    availableQualities,

    // Actions
    fetchVideoMetadata,
    startDownload,
    pauseDownload,
    resumeDownload,
    cancelDownload,
    setError,
  };
}
