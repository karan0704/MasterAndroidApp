# Backend Requirements for Real Downloads

**Frontend Status:** ✅ Complete and Ready  
**Backend Status:** 🔄 Needs 1 Small Change

---

## What Frontend Expects

The frontend is calling your backend at `http://localhost:3000` with these 2 endpoints:

### 1. ✅ Metadata Endpoint (Already Works)
```
POST /api/youtube/metadata
{
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}

Returns:
{
  "title": "Video Title",
  "duration": 213,
  "uploader": "Channel Name",
  "thumbnail": "https://..."
}
```

**Status:** ✅ Currently returns mock data - This is FINE for now

---

### 2. 🔲 Download URL Endpoint (Needs Fix)
```
POST /api/youtube/download-url
{
  "youtubeId": "dQw4w9WgXcQ",
  "quality": "hd"
}

Returns:
{
  "url": "http://localhost:3000/api/download/dQw4w9WgXcQ/hd",
  "size": 52428800,
  "mimeType": "video/mp4"
}
```

**Current Problem:**
- Returns mock URL: `https://mock-download.example.com/...`
- This URL doesn't serve real content

**What Frontend Does:**
```typescript
// Frontend fetches the URL:
const response = await fetch(url);
// Expects: Real MP4/MP3 file content
// Gets: 404 or error because URL doesn't work
```

---

## The Fix Needed (3 Steps)

### Step 1: Add New Endpoint in Rust Backend

```rust
// Add this endpoint to src/main.rs

#[get("/api/download/:video_id/:quality")]
async fn download_file(
    Path((video_id, quality)): Path<(String, String)>,
) -> Result<impl IntoResponse, ApiError> {
    // Get actual video file from yt-dlp
    let file_bytes = get_video_file(&video_id, &quality)?;
    
    // Return as file with proper headers
    Ok((
        StatusCode::OK,
        [
            (header::CONTENT_TYPE, "video/mp4"), // or "audio/mpeg" for audio
            (header::CONTENT_LENGTH, file_bytes.len().to_string()),
            (
                header::CONTENT_DISPOSITION,
                format!("attachment; filename=\"{}.mp4\"", video_id),
            ),
        ],
        file_bytes,
    ))
}
```

### Step 2: Update Download URL Endpoint

In the existing `/api/youtube/download-url` endpoint, change:

**Before:**
```rust
{
    "url": format!("https://mock-download.example.com/{}/{}", youtube_id, quality),
    "size": FILE_SIZE,
    "mime_type": "video/mp4"
}
```

**After:**
```rust
{
    "url": format!("http://localhost:3000/api/download/{}/{}", youtube_id, quality),
    "size": FILE_SIZE,
    "mimeType": "video/mp4"
}
```

### Step 3: Implement `get_video_file()` Function

```rust
// Call yt-dlp to get actual video file
fn get_video_file(video_id: &str, quality: &str) -> Result<Vec<u8>, ApiError> {
    // Call yt-dlp with video ID and quality
    // Download video to temp location
    // Read file bytes
    // Return bytes
    
    // Example (simplified):
    let url = format!("https://www.youtube.com/watch?v={}", video_id);
    let output = Command::new("yt-dlp")
        .arg("-f").arg(quality)  // Quality format
        .arg("-o").arg("-")      // Output to stdout
        .arg(&url)
        .output()?;
    
    Ok(output.stdout)
}
```

---

## Testing the Fix

### Test Before Fix (Current)
```powershell
# This should fail (mock URL doesn't work):
Invoke-WebRequest http://localhost:3000/api/download/dQw4w9WgXcQ/hd
# Result: 404 or error
```

### Test After Fix (When Done)
```powershell
# This should work (real file served):
Invoke-WebRequest http://localhost:3000/api/download/dQw4w9WgXcQ/hd
# Result: MP4/MP3 file bytes (could be 50MB+)
```

---

## How Frontend Will Use It

### Current Flow (Doesn't Work)
```
Frontend: POST /api/youtube/download-url
Backend: Returns "https://mock-download.example.com/..."
Frontend: fetch(url) → 404 ❌
```

### After Fix (Works)
```
Frontend: POST /api/youtube/download-url
Backend: Returns "http://localhost:3000/api/download/..."
Frontend: fetch(url) → Real MP4 file ✅
Frontend: Save to /Documents/youtube-downloads/videos/
Device: Can play downloaded video
```

---

## Quality Codes for yt-dlp

```
hdr      → Best 4K format with HDR
dolby    → 1440p format with Dolby
fhd      → 1080p format
hd       → 720p format
standard → 480p format
low      → 360p format
audio    → Audio only (MP3)
```

Map to yt-dlp format codes. Example:
```python
# yt-dlp command line
yt-dlp -f "299" -o "file.mp4" https://youtube.com/watch?v=...
# Format 299 = 1440p video + best audio

# Or use format selection:
yt-dlp -f "best[height<=720]" ...  # For HD (720p)
```

---

## File Size Cache (Optional)

To avoid calculating size each time:

```rust
// Create a cache/database of file sizes by video_id + quality
let file_sizes = HashMap::new();
// video_id + quality → size in bytes

// When serving download, set Content-Length header:
header::CONTENT_LENGTH = file_sizes.get((video_id, quality))
```

---

## Error Handling

```rust
// If video not found:
Err(ApiError::NotFound("Video not available"))
// Response: HTTP 404

// If quality not available:
Err(ApiError::BadRequest("Quality not available for this video"))
// Response: HTTP 400

// If yt-dlp fails:
Err(ApiError::ServerError("Failed to download video"))
// Response: HTTP 500
```

---

## Frontend Error Handling

When backend returns error:
```typescript
// Frontend will:
1. Catch the fetch error
2. Mark download as "failed"
3. Show error message to user
4. Allow retry button
```

**User sees:**
```
Download: Video Title       FAILED ❌
Error: Video not available
[Retry]
```

---

## Quick Checklist

- [ ] Backend can call yt-dlp
- [ ] yt-dlp is installed/available
- [ ] GET `/api/download/:video_id/:quality` endpoint created
- [ ] Returns actual file bytes
- [ ] Content-Type header set (video/mp4 or audio/mpeg)
- [ ] Content-Length header set
- [ ] Error handling for missing videos
- [ ] Error handling for invalid quality
- [ ] POST `/api/youtube/download-url` returns correct URL
- [ ] Tested with Postman/curl
- [ ] Frontend can fetch and save files

---

## Timeline Estimate

- Quick fix: **30 minutes** (update endpoint, test)
- Full implementation with yt-dlp: **2-4 hours**
- Testing with frontend: **1 hour**

---

## Notes

1. **Mock data is fine for now** - Frontend falls back to mock if backend unavailable
2. **No authentication needed** - Public YouTube videos
3. **Streaming works** - Frontend uses RNFS.downloadFile() which handles chunks
4. **File sizes matter** - Set Content-Length so progress bar works correctly
5. **Quality matters** - Must map quality codes to actual yt-dlp formats

---

## Example Working Flow

```
User on Device:
  1. Pastes: https://www.youtube.com/watch?v=dQw4w9WgXcQ
  2. Selects: HD (720p)
  3. Taps: Start Download

Frontend:
  POST /api/youtube/metadata → Gets title, duration
  POST /api/youtube/download-url → Gets "http://localhost:3000/api/download/dQw4w9WgXcQ/hd"
  fetch(url) → Downloads real video file
  Save to: /Documents/youtube-downloads/videos/...
  Database: Marks as "completed"

User Sees:
  ▰▰▰▰▰▰▱▱▱▱ 65%
  100MB / 150MB
  Speed: 5.2MB/s
  ETA: 9s
```

---

## Contact/Questions

If unclear:
1. Check `src/docs/features/youtube-downloader/architecture.md`
2. Check `TESTING_GUIDE.md` for how frontend uses it
3. Review frontend code: `src/features/youtube-downloader/services/downloadService.ts`

---

**Status:** Frontend ready. Waiting for backend file serving to enable real downloads.
