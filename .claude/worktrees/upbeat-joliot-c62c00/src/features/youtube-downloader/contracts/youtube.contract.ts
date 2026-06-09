export type VideoQuality = 'hdr' | 'dolby' | 'fhd' | 'hd' | 'standard' | 'low' | 'audio';

export const VIDEO_QUALITIES: VideoQuality[] = ['hdr', 'dolby', 'fhd', 'hd', 'standard', 'low', 'audio'];

export interface VideoMetadata {
  youtubeId: string;
  title: string;
  duration: number;
  thumbnail?: string;
  uploader?: string;
  url: string;
}

export interface Download {
  id: string;
  youtube_id: string;
  youtubeId?: string;
  title: string;
  url: string;
  quality: VideoQuality;
  status: 'pending' | 'downloading' | 'completed' | 'failed' | 'paused';
  file_path?: string;
  filePath?: string;
  file_size?: number;
  fileSize?: number;
  downloaded_size: number;
  downloadedSize?: number;
  total_size?: number;
  totalSize?: number;
  speed?: number;
  eta?: number;
  created_at: string;
  createdAt?: string;
  started_at?: string;
  startedAt?: string;
  completed_at?: string;
  completedAt?: string;
  error_message?: string;
  errorMessage?: string;
  [key: string]: any;
}

export interface DownloadProgress {
  downloadId: string;
  downloadedBytes: number;
  totalBytes: number;
  speed: number;
  eta: number;
  percentage: number;
}

export interface DownloadsState {
  activeDownloads: Download[];
  completedDownloads: Download[];
  failedDownloads: Download[];
}

export interface DownloadsPanelState {
  isVisible: boolean;
  selectedTab: 'active' | 'completed' | 'failed';
}
