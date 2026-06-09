# Starting the Rust Backend - Real YouTube Downloads

**Status:** ✅ Backend compiled and ready  
**Date:** June 8, 2026

---

## 🚀 QUICK START

### Prerequisites

1. **yt-dlp Installed**
   ```powershell
   # Check if yt-dlp is installed:
   yt-dlp --version
   
   # If not, install:
   pip install yt-dlp
   # OR (Windows)
   winget install yt-dlp
   ```

2. **Backend Built**
   ```powershell
   cd "D:\a) Apps\Master Android App\Master-Android-App-RustBE - Backend"
   cargo build --release
   ```
   ✅ Already done! Binary at: `target/release/youtube_backend.exe`

### Step 1: Start Backend (Terminal 3)

```powershell
cd "D:\a) Apps\Master Android App\Master-Android-App-RustBE - Backend"
cargo run --release
```

**Expected Output:**
```
✅ Rust Backend running on http://0.0.0.0:3000
📝 Environment: production (using yt-dlp)
🌐 CORS: Enabled for all origins
🎬 YouTube Integration: ACTIVE
```

**Wait for:** `Backend running...` message

---

## 🔗 Complete Setup (3 Terminals)

### Terminal 1: Rust Backend
```powershell
cd "D:\a) Apps\Master Android App\Master-Android-App-RustBE - Backend"
cargo run --release
```
**Listens on:** `http://localhost:3000`

### Terminal 2: Metro (Already Running?)
```powershell
cd "D:\a) Apps\Master Android App\MasterAndroidApp"
npm start
```
**Listens on:** `http://localhost:8081`

### Terminal 3: Android Deploy
```powershell
cd "D:\a) Apps\Master Android App\MasterAndroidApp"
npm run android
```
**Deploys to:** Your device

---

## ✅ TESTING REAL DOWNLOADS

Once all 3 servers running:

### On Device:
```
1. Tap "Downloads"
2. Paste real YouTube URL:
   https://www.youtube.com/watch?v=dQw4w9WgXcQ
3. Tap "Fetch Metadata"
4. See REAL metadata (not mock!)
   - Title: "Rick Astley - Never Gonna Give You Up"
   - Duration: 213 seconds
   - Uploader: "Rick Astley Official"
5. Select quality: "HD (720p)"
6. Tap "Start Download"
7. Watch REAL progress:
   - Speed: 1-5 MB/s (depends on network)
   - ETA: Accurate time remaining
   - File saves to device
```

### File Saved To:
```
Device Storage:
/Documents/youtube-downloads/videos/
  └─ dQw4w9WgXcQ_hd_1717939200000.mp4
```

---

## 🧪 TEST ENDPOINTS (Before Phone)

### Test 1: Health Check
```powershell
Invoke-WebRequest http://localhost:3000/health -Method GET | ConvertTo-Json
```
**Response:**
```json
{
  "status": "Backend is running ✅ with Real YouTube Data",
  "timestamp": "2026-06-08T10:30:00Z"
}
```

### Test 2: Fetch Metadata (Real!)
```powershell
$body = @{
    url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
} | ConvertTo-Json

Invoke-WebRequest http://localhost:3000/api/youtube/metadata `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body | ConvertTo-Json
```

**Response:**
```json
{
  "youtube_id": "dQw4w9WgXcQ",
  "title": "Rick Astley - Never Gonna Give You Up",
  "duration": 213,
  "uploader": "Rick Astley Official",
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}
```

### Test 3: Get Download URL
```powershell
$body = @{
    youtube_id = "dQw4w9WgXcQ"
    quality = "hd"
} | ConvertTo-Json

Invoke-WebRequest http://localhost:3000/api/youtube/download-url `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body | ConvertTo-Json
```

**Response:**
```json
{
  "url": "http://127.0.0.1:3000/api/download/dQw4w9WgXcQ/hd",
  "size": 52428800,
  "mime_type": "video/mp4"
}
```

### Test 4: Download File (Large!)
```powershell
# WARNING: This will download a real video file!
# Rick Astley video is ~50MB, will take time

Invoke-WebRequest http://localhost:3000/api/download/dQw4w9WgXcQ/hd `
  -OutFile "C:\temp\video.mp4"

# Check file size:
(Get-Item "C:\temp\video.mp4").Length / 1MB  # Shows size in MB
```

---

## ⚙️ HOW IT WORKS NOW

### Data Flow

```
User on Device:
  1. Pastes: https://www.youtube.com/watch?v=dQw4w9WgXcQ

Frontend calls Backend:
  POST /api/youtube/metadata
  ↓
Backend runs: yt-dlp -j "https://..."
  ↓
Returns REAL metadata:
  - Title, duration, uploader from actual YouTube
  ↓

User selects quality: HD (720p)

Frontend calls Backend:
  POST /api/youtube/download-url
  ↓
Backend runs: yt-dlp -f "bestvideo[height=720]+bestaudio"
  ↓
Returns download URL:
  "http://localhost:3000/api/download/dQw4w9WgXcQ/hd"
  ↓

Frontend fetches URL:
  fetch("http://localhost:3000/api/download/...")
  ↓
Backend streams real video file
  ↓
Frontend saves to device storage:
  /Documents/youtube-downloads/videos/video.mp4
  ↓
Shows progress (1 update per second)
  ↓
User can watch downloaded video
```

---

## 🔧 TROUBLESHOOTING

### "yt-dlp not found"
**Solution:**
```powershell
# Install via pip:
pip install yt-dlp

# OR via winget:
winget install yt-dlp

# Verify:
yt-dlp --version
```

### "Failed to execute yt-dlp"
**Solution:**
- Check yt-dlp is in PATH
- Check YouTube video URL is valid
- YouTube might be blocking (rare)

### "Download is slow"
**Expected:** 
- Depends on your internet speed
- Large videos (100MB+) take time
- Normal: 1-10 MB/s

### "Backend crashed"
**Solution:**
```powershell
# Restart backend:
cd "D:\a) Apps\Master Android App\Master-Android-App-RustBE - Backend"
cargo run --release
```

### "Device not downloading"
**Check:**
1. Backend running on localhost:3000? ✅
2. Device can reach PC (WiFi connection)? ✅
3. yt-dlp installed? ✅
4. Valid YouTube URL? ✅

---

## 📊 WHAT'S HAPPENING

### Before (Mock Mode)
```
Frontend:  Downloads take 3 seconds (animation)
Backend:   Returns fake URLs
Files:     No actual files downloaded
```

### Now (Real Mode)
```
Frontend:  Downloads take real time (5-30 minutes)
Backend:   Uses yt-dlp to get real YouTube videos
Files:     Actual MP4/MP3 files on device
Metadata:  Real title, duration, uploader
```

---

## ✅ CHECKLIST

- [ ] yt-dlp installed (`yt-dlp --version`)
- [ ] Backend compiled (`cargo build --release` done)
- [ ] Backend starts without errors
- [ ] Health check works
- [ ] Metadata endpoint returns real data
- [ ] Download URL endpoint works
- [ ] Device deploys successfully
- [ ] Downloads work on device

---

## 🚀 YOU'RE READY!

1. **Terminal 1:** Start backend
   ```
   cargo run --release
   ```

2. **Terminal 2:** Metro already running

3. **Terminal 3:** Redeploy (or just test on existing app)
   ```
   npm run android
   ```

4. **Device:** Test YouTube downloads
   ```
   1. Tap Downloads
   2. Paste YouTube URL
   3. Download real video!
   ```

---

## 📱 Expected Performance

| Action | Time |
|--------|------|
| Metadata fetch | 2-5 seconds |
| Download URL fetch | 2-5 seconds |
| Download 50MB video | 5-30 minutes* |
| Save to device | Automatic |

*Depends on:
- Video size
- Your internet speed
- YouTube rate limiting
- Quality selected

---

## 🎉 SUCCESS!

When you see:
```
✅ Rust Backend running on http://0.0.0.0:3000
📝 Environment: production (using yt-dlp)
🌐 CORS: Enabled for all origins
🎬 YouTube Integration: ACTIVE
```

AND on device you can:
```
✅ Download real YouTube videos
✅ See real metadata
✅ Real progress tracking
✅ Files save to device
```

**You've successfully implemented FE+BE working on mobile!** 🚀

---

**Next:** Check `TESTING_GUIDE.md` for detailed testing steps
