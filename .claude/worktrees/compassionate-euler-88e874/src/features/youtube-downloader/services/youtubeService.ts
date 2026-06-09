import type { VideoMetadata } from '../contracts/youtube.contract';

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

const BACKEND_URL = 'http://192.168.1.27:3000';

export const youtubeService = {
  async fetchVideoMetadata(url: string): Promise<VideoMetadata> {
    const youtubeId = extractYoutubeId(url);

    if (!youtubeId) {
      throw new Error('Invalid YouTube URL');
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/youtube/metadata`, {
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
      throw error;
    }
  },

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

  async getDownloadUrl(
    youtubeId: string,
    quality: string,
  ): Promise<{ url: string; size: number; mimeType: string }> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/youtube/download-url`, {
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
      throw error;
    }
  },

  isValidYoutubeUrl(url: string): boolean {
    return extractYoutubeId(url) !== null;
  },
};
