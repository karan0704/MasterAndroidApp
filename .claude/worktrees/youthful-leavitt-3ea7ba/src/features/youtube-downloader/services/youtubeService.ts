import type { VideoMetadata } from '../contracts/youtube.contract';
import { BACKEND_URL } from '../../../core/config/backend';

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
   * Fetch video metadata from YouTube via Rust backend
   */
  async fetchVideoMetadata(url: string): Promise<VideoMetadata> {
    const youtubeId = extractYoutubeId(url);

    if (!youtubeId) {
      throw new Error('Invalid YouTube URL');
    }

    const response = await fetch(`${BACKEND_URL}/api/youtube/metadata`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch metadata: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      youtubeId: data.youtube_id || youtubeId,
      title: data.title || 'Unknown',
      duration: data.duration || 0,
      thumbnail: data.thumbnail,
      uploader: data.uploader,
      url,
    };
  },

  /**
   * Get available qualities for a video
   */
  async getAvailableQualities(youtubeId: string): Promise<{ quality: string; label: string }[]> {
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
   * Get download URL for a specific quality from backend
   */
  async getDownloadUrl(
    youtubeId: string,
    quality: string,
  ): Promise<{ url: string; size: number; mimeType: string }> {
    const response = await fetch(`${BACKEND_URL}/api/youtube/download-url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ youtube_id: youtubeId, quality }),
    });

    if (!response.ok) {
      throw new Error(`Failed to get download URL: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      url: data.url,
      size: data.size,
      mimeType: data.mime_type || 'video/mp4',
    };
  },

  /**
   * Validate if URL is a valid YouTube URL
   */
  isValidYoutubeUrl(url: string): boolean {
    return extractYoutubeId(url) !== null;
  },
};
