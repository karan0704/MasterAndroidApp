import type { VideoMetadata } from '../contracts/youtube.contract';
import { VIDEO_QUALITIES } from '../contracts/youtube.contract';

// YouTube ID extraction from URL
function extractYoutubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

export const youtubeService = {
  /**
   * Fetch video metadata from YouTube
   * In production, this would call a backend API that uses yt-dlp
   */
  async fetchVideoMetadata(url: string): Promise<VideoMetadata> {
    const youtubeId = extractYoutubeId(url);

    if (!youtubeId) {
      throw new Error('Invalid YouTube URL');
    }

    // Mock metadata - replace with real API call
    // In production: POST to backend /api/youtube/metadata with { url }
    try {
      const response = await fetch('http://localhost:3000/api/youtube/metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        youtubeId,
        title: data.title || 'Unknown',
        duration: data.duration || 0,
        thumbnail: data.thumbnail,
        uploader: data.uploader,
        url,
      };
    } catch (error) {
      console.error('Failed to fetch metadata:', error);
      // Return mock data for testing without backend
      return {
        youtubeId,
        title: 'Sample Video',
        duration: 300,
        thumbnail: undefined,
        uploader: 'Sample Channel',
        url,
      };
    }
  },

  /**
   * Get available qualities for a video
   * In production, query backend for actual available formats
   */
  async getAvailableQualities(youtubeId: string): Promise<{ quality: string; label: string }[]> {
    // Mock implementation
    return [
      { quality: 'hdr', label: 'HDR (4K)' },
      { quality: 'dolby', label: 'Dolby (1440p)' },
      { quality: 'fhd', label: 'FHD (1080p)' },
      { quality: 'hd', label: 'HD (720p)' },
      { quality: 'standard', label: 'Standard (480p)' },
      { quality: 'low', label: 'Low (360p)' },
      { quality: 'audio', label: 'Audio Only (MP3)' },
    ];
  },

  /**
   * Get download URL for a specific quality
   * In production, calls backend to get direct download URL
   */
  async getDownloadUrl(
    youtubeId: string,
    quality: string,
  ): Promise<{ url: string; size: number; mimeType: string }> {
    // Mock implementation - replace with real backend call
    try {
      const response = await fetch('http://localhost:3000/api/youtube/download-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ youtubeId, quality }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to get download URL:', error);
      // Mock response for testing
      return {
        url: `https://mock-download.example.com/${youtubeId}/${quality}`,
        size: 50 * 1024 * 1024, // 50MB mock size
        mimeType: quality === 'audio' ? 'audio/mpeg' : 'video/mp4',
      };
    }
  },

  /**
   * Validate if URL is a valid YouTube URL
   */
  isValidYoutubeUrl(url: string): boolean {
    return extractYoutubeId(url) !== null;
  },
};
