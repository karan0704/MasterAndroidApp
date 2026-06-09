# YouTube Downloader - Architecture

---

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Android Device                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │         Downloads Screen (UI)                    │  │
│  │  - URL Input                                     │  │
│  │  - Quality Selector                              │  │
│  │  - Download List (3 tabs)                        │  │
│  └──────────────────────────────────────────────────┘  │
│                        ↕                                │
│  ┌──────────────────────────────────────────────────┐  │
│  │    useYoutubeDownloads Hook                      │  │
│  │  - Manages UI state                              │  │
│  │  - Coordinates service calls                     │  │
│  │  - Updates every 1 second                        │  │
│  └──────────────────────────────────────────────────┘  │
│                        ↕                                │
│  ┌──────────────────────────────────────────────────┐  │
│  │    Service Layer                                 │  │
│  │  ┌──────────────────────────────────────────┐   │  │
│  │  │ youtubeService                           │   │  │
│  │  │ - Validate URL                           │   │  │
│  │  │ - Fetch metadata from backend            │   │  │
│  │  │ - Get available qualities                │   │  │
│  │  │ - Get download URL                       │   │  │
│  │  └──────────────────────────────────────────┘   │  │
│  │  ┌──────────────────────────────────────────┐   │  │
│  │  │ downloadService                          │   │  │
│  │  │ - Start/pause/resume/cancel              │   │  │
│  │  │ - RNFS.downloadFile() for streaming      │   │  │
│  │  │ - Progress tracking                      │   │  │
│  │  │ - Database updates                       │   │  │
│  │  └──────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────┘  │
│                        ↕                                │
│  ┌──────────────────────────────────────────────────┐  │
│  │    Storage Layer                                 │  │
│  │  ┌──────────────────────────────────────────┐   │  │
│  │  │ SQLite Database                          │   │  │
│  │  │ - youtube_downloads table                │   │  │
│  │  │ - Download metadata & status             │   │  │
│  │  └──────────────────────────────────────────┘   │  │
│  │  ┌──────────────────────────────────────────┐   │  │
│  │  │ File System (RNFS)                       │   │  │
│  │  │ - /youtube-downloads/videos/             │   │  │
│  │  │ - /youtube-downloads/audio/              │   │  │
│  │  │ - /youtube-downloads/thumbnails/         │   │  │
│  │  └──────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────┘  │
│                        ↕                                │
└─────────────────────────────────────────────────────────┘
                        ↕
┌─────────────────────────────────────────────────────────┐
│           Backend Services (PC/Server)                  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  POST /api/youtube/metadata                             │
│  ├─ Extract YouTube ID                                 │
│  ├─ Fetch video metadata                               │
│  └─ Return: {title, duration, thumbnail, uploader}    │
│                                                          │
│  POST /api/youtube/download-url                         │
│  ├─ Generate download link                             │
│  ├─ Select quality format                              │
│  └─ Return: {url, size, mimeType}                      │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## Data Flow

### 1. User Pastes URL
```
User enters URL
    ↓
youtubeService.isValidYoutubeUrl()
    ↓
[Invalid] → Show error
[Valid] → youtubeService.fetchVideoMetadata()
    ↓
Backend /api/youtube/metadata
    ↓
[Success] → Display metadata
[Failure] → Display error, offer mock data
```

### 2. User Selects Quality & Downloads
```
User taps "Start Download"
    ↓
downloadService.startDownload()
    ↓
youtubeService.getDownloadUrl()
    ↓
Backend /api/youtube/download-url
    ↓
[Success] → RNFS.downloadFile(url)
[Failure] → Mark as failed, show error
    ↓
Database updated with progress
    ↓
UI refreshes every 1 second
    ↓
File saved to device storage
```

### 3. Progress Updates
```
RNFS.downloadFile() progress callback
    ↓
Database: UPDATE youtube_downloads SET downloaded_size = ?
    ↓
Hook refreshInterval (1 second)
    ↓
SELECT * FROM youtube_downloads
    ↓
UI renders progress bar
    ↓
User sees real-time updates
```

---

## File Organization

```
src/features/youtube-downloader/
├── contracts/
│   └── youtube.contract.ts      # Type definitions
├── services/
│   ├── youtubeService.ts        # Backend API calls
│   └── downloadService.ts       # Download management
├── hooks/
│   └── useYoutubeDownloads.ts   # State management
├── store/
│   └── downloadsStore.ts        # UI panel state
├── ui/
│   ├── DownloadsScreen.tsx      # Main screen
│   └── components/
│       ├── DownloadItem.tsx     # Individual download
│       └── QualitySelector.tsx  # Quality picker
└── index.ts                     # Exports
```

---

## Service Layer Interface

### youtubeService

```typescript
// Extract YouTube ID from URL
isValidYoutubeUrl(url: string): boolean

// Fetch video metadata from backend
fetchVideoMetadata(url: string): Promise<VideoMetadata>
  // Calls: POST /api/youtube/metadata
  // Falls back to mock if backend unavailable

// Get available quality options
getAvailableQualities(youtubeId: string): Promise<QualityOption[]>

// Get download URL for quality
getDownloadUrl(youtubeId: string, quality: string): 
  Promise<{url, size, mimeType}>
  // Calls: POST /api/youtube/download-url
```

### downloadService

```typescript
// Create download directories
ensureDirectories(): Promise<void>

// Start new download
startDownload(youtubeId, title, url, quality): Promise<Download>
  // Creates DB entry
  // Starts RNFS.downloadFile()

// Pause download
pauseDownload(downloadId): Promise<void>

// Resume paused download
resumeDownload(downloadId): Promise<void>

// Cancel and delete
cancelDownload(downloadId): Promise<void>

// Get download status
getActiveDownloads(): Promise<Download[]>
getCompletedDownloads(): Promise<Download[]>
getFailedDownloads(): Promise<Download[]>
```

---

## Backend API Contract

### POST /api/youtube/metadata

**Request:**
```json
{
  "url": "https://www.youtube.com/watch?v=..."
}
```

**Response (Success):**
```json
{
  "title": "Video Title",
  "duration": 213,
  "thumbnail": "https://...",
  "uploader": "Channel Name"
}
```

**Error Handling:**
- Invalid URL → HTTP 400
- Not found → HTTP 404
- Server error → HTTP 500

### POST /api/youtube/download-url

**Request:**
```json
{
  "youtubeId": "dQw4w9WgXcQ",
  "quality": "hd"
}
```

**Response (Success):**
```json
{
  "url": "https://download-url.../file.mp4",
  "size": 52428800,
  "mimeType": "video/mp4"
}
```

**Error Handling:**
- Invalid quality → HTTP 400
- Video not available → HTTP 404
- Server error → HTTP 500

---

## Error Recovery

| Error | Frontend Response | User Sees |
|-------|------------------|-----------|
| Invalid URL | Show error message | "Invalid YouTube URL" |
| Backend down | Use mock data | Works with fake video |
| Download fails | Mark as failed | "Failed" status + error msg |
| Storage full | Fail gracefully | Error message |
| Network drops | Pause download | Can resume later |
| Invalid quality | Show error | "Quality not available" |

---

## Performance Considerations

- **Metadata fetch:** Cached for 1 hour (future optimization)
- **Progress updates:** Every 1 second via database polling
- **File streaming:** RNFS handles chunks automatically
- **Memory:** Streaming doesn't load entire file in RAM
- **UI refresh:** Debounced to 1-second intervals

---

## Future Enhancements

1. **Caching:** Remember metadata for 1 hour
2. **Queue:** Multiple downloads simultaneously
3. **Bandwidth limiting:** User-configurable speed
4. **Resume capability:** For interrupted downloads
5. **Playlist support:** Download entire playlists
6. **Video playback:** Built-in player for downloaded files
