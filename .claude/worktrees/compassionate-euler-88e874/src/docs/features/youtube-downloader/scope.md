# YouTube Downloader - Scope

**Phase:** 3 (Post Phase 2 Productivity)  
**Status:** Frontend Complete, Backend Pending

---

## In Scope (Phase 1 - Current)

### Core Features
- ✅ YouTube URL input validation
- ✅ Video metadata fetching (title, duration, uploader, thumbnail)
- ✅ Quality selection (7 options)
- ✅ Download management (start, pause, resume, cancel)
- ✅ Real-time progress tracking
- ✅ Persistent storage (SQLite + file system)
- ✅ Error handling and retry
- ✅ Three download tabs (active, completed, failed)

### Backend Requirements
- Metadata API: `POST /api/youtube/metadata`
- Download URL API: `POST /api/youtube/download-url`

### UI Components
- Downloads screen with URL input
- Quality selector
- Download progress display
- Download action buttons

---

## Out of Scope (Phase 1)

### Phase 2+ Features
- [ ] Video playback in app
- [ ] Background playback
- [ ] Screen-off audio playback
- [ ] Playlist creation
- [ ] Download history/search
- [ ] Subtitle support
- [ ] Multiple account support
- [ ] Cloud sync

### Not in Scope
- [ ] Live stream downloading
- [ ] Private video access
- [ ] Direct YouTube streaming (without downloading)

---

## Quality Options

Available to user:
- `hdr` - 4K HDR
- `dolby` - 1440p Dolby Vision
- `fhd` - 1080p Full HD
- `hd` - 720p HD
- `standard` - 480p Standard
- `low` - 360p Low
- `audio` - MP3 Audio Only

---

## Dependencies

### Frontend
- React Native
- RNFS (react-native-fs) - File system operations
- SQLite (nitro-sqlite) - Persistent storage
- Zustand - State management (if needed for panels)

### Backend (Needed)
- YouTube metadata extraction (yt-dlp or similar)
- Video download capability
- Quality/format selection

---

## Performance Targets

- URL validation: <100ms
- Metadata fetch: <1 second (cached)
- Download URL fetch: <1 second
- Download progress update: Every 1 second
- App memory impact: <50MB
- Feature size: <5MB code

---

## Error Scenarios Handled

1. Invalid YouTube URL → Show error message
2. Backend connection error → Use mock data
3. Download failure → Mark as failed, show error message
4. Storage full → Show error to user
5. Invalid quality option → Show error

---

## Testing Strategy

### Unit Tests
- URL validation (valid/invalid patterns)
- Service layer calls
- Download state transitions

### Integration Tests
- With real backend (when available)
- File system operations
- Database persistence

### Manual Tests
- On low-end devices (3GB RAM, Android 8+)
- Large file downloads (100MB+)
- Pause/resume functionality
- Error recovery
