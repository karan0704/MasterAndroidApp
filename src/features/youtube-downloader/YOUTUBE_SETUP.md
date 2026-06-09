# YouTube Downloader - Setup & Integration Guide

## 🎯 Architecture

Complete on-device YouTube downloader with **zero external servers**:

```
┌─────────────────────────────────┐
│  React Native UI (Mobile)       │
│  - URL input                    │
│  - Quality selector             │
│  - Download progress            │
└──────────────┬──────────────────┘
               ↓
┌─────────────────────────────────┐
│  Rust Backend (localhost:3000)  │
│  - yt-dlp integration           │
│  - Metadata extraction          │
│  - Format selection             │
│  - File serving                 │
└──────────────┬──────────────────┘
               ↓
┌─────────────────────────────────┐
│  Device Storage                 │
│  - SQLite metadata              │
│  - Downloaded videos            │
└─────────────────────────────────┘
```

## 🔧 Prerequisites

### For Development (Windows/Mac/Linux)

1. **Rust Backend Running:**
   ```bash
   cd "D:\a) Apps\Master Android App\Master-Android-App-RustBE - Backend"
   cargo run --release
   ```
   ✅ Backend will be available at `http://127.0.0.1:3000`

2. **Mobile Emulator or Device:**
   ```bash
   # Start React Native development
   cd "D:\a) Apps\Master Android App\MasterAndroidApp"
   npm start
   ```

3. **Deploy to Android:**
   ```bash
   npm run android
   ```

## 📱 On Mobile Device Setup

### Step 1: Install Rust Backend APK

When deployed to mobile, the Rust backend needs to:
1. Run as a background service
2. Listen on `localhost:3000`
3. Start automatically when app opens
4. Include bundled `yt-dlp` binary

**Current Status:** 🔄 In Progress
- Backend needs Android-native integration
- JNI bridge required for Rust ↔ React Native communication

### Step 2: Direct Backend to Mobile Backend

The frontend automatically connects to `http://127.0.0.1:3000` via the updated `youtubeService.ts`

**Configuration:**
```ts
// src/features/youtube-downloader/services/youtubeService.ts
const BACKEND_URL = 'http://127.0.0.1:3000';
```

### Step 3: Network Requirements

On mobile device:
- ✅ Internet/WiFi for YouTube API calls
- ✅ Localhost:3000 for internal backend
- ✅ Device storage for downloads

## 🚀 Current Implementation Status

### ✅ Completed

- [x] Frontend UI with URL input
- [x] Metadata fetching via backend
- [x] Quality selector
- [x] Download progress tracking
- [x] SQLite storage for download history
- [x] Service layer architecture
- [x] Error handling
- [x] Real HTTP calls to backend (NOT mock)

### 🔄 In Progress

- [ ] Android Kotlin bridge for Rust backend service
- [ ] yt-dlp binary bundled in APK
- [ ] Automatic backend startup
- [ ] Background download management
- [ ] Video player integration

### ⏳ Future

- [ ] FFmpeg integration for video processing
- [ ] Playlist support
- [ ] Offline metadata access
- [ ] Download queue optimization

## 📡 API Endpoints

The frontend calls these endpoints on the Rust backend:

### 1. Health Check
```
GET http://127.0.0.1:3000/health
```

Response:
```json
{
  "status": "Backend is running ✅ with Real YouTube Data",
  "timestamp": "2024-06-08T12:00:00Z"
}
```

### 2. Fetch Video Metadata
```
POST http://127.0.0.1:3000/api/youtube/metadata
Content-Type: application/json

{
  "url": "https://www.youtube.com/watch?v=VIDEO_ID"
}
```

Response:
```json
{
  "youtube_id": "VIDEO_ID",
  "title": "Video Title",
  "duration": 600,
  "uploader": "Channel Name",
  "url": "https://www.youtube.com/watch?v=VIDEO_ID"
}
```

### 3. Get Download URL
```
POST http://127.0.0.1:3000/api/youtube/download-url
Content-Type: application/json

{
  "youtube_id": "VIDEO_ID",
  "quality": "fhd"
}
```

Response:
```json
{
  "url": "http://127.0.0.1:3000/api/download/VIDEO_ID/fhd",
  "size": 250000000,
  "mime_type": "video/mp4"
}
```

### 4. Download File
```
GET http://127.0.0.1:3000/api/download/VIDEO_ID/QUALITY
```

Returns the actual video file as binary data.

## 🗂️ File Organization

```
src/features/youtube-downloader/
├── contracts/
│   └── youtube.contract.ts          # Type definitions
├── services/
│   ├── youtubeService.ts            # Backend API calls ✅ UPDATED
│   └── downloadService.ts           # File download + progress ✅ UPDATED
├── store/
│   └── downloadsStore.ts            # UI state management
├── hooks/
│   └── useYoutubeDownloads.ts       # React hook with logic
├── ui/
│   ├── DownloadsScreen.tsx          # Main screen
│   └── components/
│       ├── DownloadItem.tsx         # Download row component
│       └── QualitySelector.tsx      # Quality picker
├── index.ts                         # Export barrel
└── YOUTUBE_SETUP.md                 # This file
```

## 🔗 Integration with Home Screen

The YouTube downloader should be accessible from the home screen. Check `HomeScreen.tsx` for the launch button:

```tsx
<Button 
  onPress={() => downloadsStore.openDownloads()}
  title="YouTube Downloader"
/>
```

## 🐛 Troubleshooting

### "Failed to connect to backend"

**Problem:** Frontend can't reach Rust backend  
**Solution:**
1. Verify backend is running: `cargo run --release`
2. Check backend is listening on port 3000
3. On Android emulator: Use `10.0.2.2:3000` instead of `127.0.0.1:3000`

### "Invalid YouTube URL"

**Problem:** URL extraction fails  
**Solution:**
- Supported formats:
  - `https://www.youtube.com/watch?v=VIDEO_ID`
  - `https://youtu.be/VIDEO_ID`
  - `https://youtube.com/watch?v=VIDEO_ID`

### "Download fails silently"

**Problem:** Download starts but doesn't complete  
**Solution:**
1. Check internet connection
2. Verify yt-dlp is installed on backend machine
3. Check backend logs for errors
4. Ensure download directory has write permissions

## 🧪 Testing

### Manual Testing on Desktop

1. **Start backend:**
   ```bash
   cargo run --release
   ```

2. **Start frontend:**
   ```bash
   npm start
   ```

3. **Test API directly:**
   ```bash
   # Test metadata fetching
   curl -X POST http://localhost:3000/api/youtube/metadata \
     -H "Content-Type: application/json" \
     -d '{"url":"https://youtu.be/dQw4w9WgXcQ"}'

   # Test download URL
   curl -X POST http://localhost:3000/api/youtube/download-url \
     -H "Content-Type: application/json" \
     -d '{"youtube_id":"dQw4w9WgXcQ","quality":"fhd"}'
   ```

4. **Test in app:**
   - Open Downloads screen
   - Paste a YouTube URL
   - Select quality
   - Click Download
   - Monitor progress in UI

### Testing on Mobile Emulator

1. Backend must be accessible from emulator network:
   ```bash
   # Android emulator uses 10.0.2.2 to reach host machine
   # Update youtubeService.ts:
   const BACKEND_URL = 'http://10.0.2.2:3000'; // For emulator
   ```

2. For real device on same WiFi:
   ```bash
   # Get your PC's local IP
   ipconfig getifaddr en0  # macOS
   ipconfig                # Windows (look for IPv4)
   
   # Update youtubeService.ts:
   const BACKEND_URL = 'http://192.168.X.X:3000'; // Your local IP
   ```

## 📊 Database Schema

Downloads are stored in SQLite:

```sql
CREATE TABLE youtube_downloads (
  id TEXT PRIMARY KEY,
  youtube_id TEXT NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  quality TEXT NOT NULL,
  status TEXT DEFAULT 'pending',     -- pending|downloading|completed|failed|paused
  file_path TEXT,
  file_size INTEGER,
  downloaded_size INTEGER DEFAULT 0,
  total_size INTEGER,
  speed INTEGER,                     -- bytes/sec
  eta INTEGER,                       -- seconds remaining
  created_at TEXT NOT NULL,
  started_at TEXT,
  completed_at TEXT,
  error_message TEXT
);
```

## 🎯 Next Steps

1. **Desktop Testing:** Run backend and test frontend locally
2. **Android Integration:** Create Kotlin service for Rust backend
3. **Bundling:** Include yt-dlp binary in APK
4. **Testing on Device:** Deploy to real mobile device
5. **Optimization:** Battery drain, storage efficiency, network usage

## 📝 Code Changes Summary

### Updated Files:
- `youtubeService.ts` - Now calls real backend instead of mock
- `downloadService.ts` - Real HTTP downloads with progress tracking

### New Features:
- Real yt-dlp integration
- Backend health check
- Actual video downloads from YouTube
- Progress tracking with speed/ETA
- Proper error messages

## 🔐 Privacy & Security

- ✅ All processing on device (no cloud)
- ✅ No external API keys required
- ✅ Downloads stored in app directory
- ✅ Metadata cached locally
- ✅ Full offline capability planned

## 📚 Related Documentation

- [Rust Backend Setup](../../../Master-Android-App-RustBE%20-%20Backend/README.md)
- [Project Architecture](../../../src/docs/engineering/architecture-principles.md)
- [Technology Stack](../../../src/docs/engineering/technology-stack.md)
- [Engineering Rules](../../../CLAUDE.md)

---

**Last Updated:** June 2026  
**Status:** Frontend ✅ Backend ✅ Mobile Integration 🔄
