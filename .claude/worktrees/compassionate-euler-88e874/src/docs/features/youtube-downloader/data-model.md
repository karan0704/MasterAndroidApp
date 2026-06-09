# YouTube Downloader - Data Model

---

## Database Schema

### youtube_downloads Table

```sql
CREATE TABLE youtube_downloads (
  id TEXT PRIMARY KEY,
  youtube_id TEXT NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  quality TEXT NOT NULL,
  status TEXT NOT NULL,
  file_path TEXT,
  total_size INTEGER,
  downloaded_size INTEGER DEFAULT 0,
  file_size INTEGER,
  created_at TEXT NOT NULL,
  started_at TEXT,
  completed_at TEXT,
  error_message TEXT
);
```

### Column Details

| Column | Type | Purpose | Example |
|--------|------|---------|---------|
| id | TEXT | Unique download ID | `abc123_hd_1717939200000` |
| youtube_id | TEXT | YouTube video ID | `dQw4w9WgXcQ` |
| title | TEXT | Video title | `Rick Astley - Never Gonna Give You Up` |
| url | TEXT | Original YouTube URL | `https://www.youtube.com/watch?v=...` |
| quality | TEXT | Selected quality | `hd`, `fhd`, `audio`, etc. |
| status | TEXT | Download status | `pending`, `downloading`, `completed`, `failed`, `paused` |
| file_path | TEXT | Local file path | `/Documents/youtube-downloads/videos/...` |
| total_size | INTEGER | Expected file size (bytes) | `52428800` |
| downloaded_size | INTEGER | Currently downloaded (bytes) | `26214400` |
| file_size | INTEGER | Actual file size after completion | `52428800` |
| created_at | TEXT | ISO timestamp | `2026-06-08T10:30:00Z` |
| started_at | TEXT | ISO timestamp when download started | `2026-06-08T10:30:05Z` |
| completed_at | TEXT | ISO timestamp when finished | `2026-06-08T10:35:00Z` |
| error_message | TEXT | Error details if failed | `HTTP 404: Not Found` |

---

## TypeScript Types

### VideoMetadata
```typescript
interface VideoMetadata {
  youtubeId: string;        // Extracted from URL
  title: string;            // From YouTube API
  duration: number;         // Seconds
  thumbnail?: string;       // URL to thumbnail
  uploader?: string;        // Channel name
  url: string;              // Original input URL
}
```

### VideoQuality
```typescript
type VideoQuality = 
  | 'hdr'       // 4K HDR
  | 'dolby'     // 1440p Dolby Vision
  | 'fhd'       // 1080p Full HD
  | 'hd'        // 720p HD
  | 'standard'  // 480p Standard
  | 'low'       // 360p Low
  | 'audio';    // MP3 Audio Only
```

### Download
```typescript
interface Download {
  id: string;                    // Unique ID
  youtube_id: string;            // YouTube video ID
  title: string;                 // Video title
  url: string;                   // Original YouTube URL
  quality: VideoQuality;         // Selected quality
  status: DownloadStatus;        // Current status
  file_path?: string;            // Local file path
  total_size?: number;           // Expected size (bytes)
  downloaded_size: number;       // Downloaded so far (bytes)
  file_size?: number;            // Actual size after completion
  created_at: string;            // ISO timestamp
  started_at?: string;           // When download started
  completed_at?: string;         // When completed
  error_message?: string;        // Error if failed
  speed?: number;                // Bytes per second (calculated)
  eta?: number;                  // Seconds remaining (calculated)
}
```

### DownloadStatus
```typescript
type DownloadStatus = 
  | 'pending'      // Queued, not started
  | 'downloading'  // Currently downloading
  | 'completed'    // Successfully finished
  | 'failed'       // Error occurred
  | 'paused';      // User paused
```

### DownloadsState
```typescript
interface DownloadsState {
  activeDownloads: Download[];      // pending, downloading, paused
  completedDownloads: Download[];   // completed only
  failedDownloads: Download[];      // failed only
}
```

---

## File System Structure

### Directory Layout
```
/Documents/
└── youtube-downloads/
    ├── videos/              # MP4, WebM, etc.
    │   ├── dQw4w9WgXcQ_hd_1717939200000.mp4
    │   ├── dQw4w9WgXcQ_fhd_1717939205000.mp4
    │   └── ...
    ├── audio/               # MP3 files
    │   ├── dQw4w9WgXcQ_audio_1717939210000.mp3
    │   └── ...
    └── thumbnails/          # Cached thumbnails
        ├── dQw4w9WgXcQ.jpg
        └── ...
```

### File Naming Convention
```
{youtubeId}_{quality}_{timestamp}.{extension}

Examples:
- dQw4w9WgXcQ_hd_1717939200000.mp4
- dQw4w9WgXcQ_audio_1717939210000.mp3
- dQw4w9WgXcQ.jpg (thumbnail)
```

---

## State Management

### UI State (downloadsStore)

```typescript
interface DownloadsPanelState {
  isVisible: boolean;              // Panel open/closed
  selectedTab: 'active' | 'completed' | 'failed';  // Current tab
}
```

### Hook State (useYoutubeDownloads)

```typescript
interface UseYoutubeDownloadsState {
  // Download lists
  activeDownloads: Download[];
  completedDownloads: Download[];
  failedDownloads: Download[];
  
  // UI state
  isLoading: boolean;
  error: string | null;
  
  // Metadata for current selection
  videoMetadata: VideoMetadata | null;
  availableQualities: QualityOption[];
}
```

---

## Data Lifecycle

### 1. User Enters URL

**State:**
```
videoMetadata: null
availableQualities: []
error: null
```

**Action:** User enters URL → validateUrl() → fetchVideoMetadata()

**New State:**
```
videoMetadata: {
  youtubeId: "...",
  title: "...",
  duration: 213,
  ...
}
availableQualities: [
  {quality: "hdr", label: "HDR (4K)"},
  {quality: "hd", label: "HD (720p)"},
  ...
]
```

### 2. User Starts Download

**Database Entry Created:**
```
{
  id: "abc123_hd_1717939200000",
  youtube_id: "dQw4w9WgXcQ",
  title: "Rick Astley - Never Gonna Give You Up",
  url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  quality: "hd",
  status: "pending",
  file_path: "/Documents/youtube-downloads/videos/...",
  total_size: 52428800,
  downloaded_size: 0,
  created_at: "2026-06-08T10:30:00Z"
}
```

**Status Transitions:**
```
pending → downloading → completed
              ↓
              paused → downloading → completed
              
              ↓
              failed (+ error_message)
```

### 3. Download Progress

**Every 1 Second:**
```
UPDATE youtube_downloads 
SET downloaded_size = ?
WHERE id = ?

// Then UI queries:
SELECT * FROM youtube_downloads 
WHERE status IN ('pending', 'downloading', 'paused')
```

**UI Calculates:**
```
progress = downloaded_size / total_size
speed = bytes_per_second
eta = (total_size - downloaded_size) / speed
```

### 4. Download Completes

**Final State:**
```
{
  status: "completed",
  completed_at: "2026-06-08T10:35:00Z",
  file_size: 52428800,
  downloaded_size: 52428800
}
```

**File:** Saved to `/Documents/youtube-downloads/videos/...`

---

## Backend API Response Format

### Metadata Response
```json
{
  "title": "Rick Astley - Never Gonna Give You Up",
  "duration": 213,
  "thumbnail": "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  "uploader": "Rick Astley Official"
}
```

### Download URL Response
```json
{
  "url": "https://cache.example.com/download/abc123.mp4",
  "size": 52428800,
  "mimeType": "video/mp4"
}
```

---

## Storage Calculations

### Size Estimates

| Quality | Typical Size | Typical Duration |
|---------|------------|-----------------|
| HDR (4K) | 500MB - 2GB | 5-20 minutes |
| 1440p Dolby | 400MB - 1.5GB | 5-20 minutes |
| 1080p FHD | 200MB - 800MB | 5-20 minutes |
| 720p HD | 100MB - 400MB | 5-20 minutes |
| 480p Standard | 50MB - 200MB | 5-20 minutes |
| 360p Low | 30MB - 100MB | 5-20 minutes |
| Audio MP3 | 5MB - 20MB | 5-20 minutes |

### Device Storage Recommendation

- **Minimum:** 500MB free space
- **Recommended:** 2GB free space
- **Optimal:** 5GB+ free space

---

## Cleanup Strategy (Future)

```typescript
// Auto-cleanup old files (not implemented yet)
- Delete files older than 30 days
- Keep most recent 10 downloads
- Alert user when approaching storage limit
```
