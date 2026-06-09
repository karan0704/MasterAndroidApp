# YouTube Downloader - Roadmap

---

## Phase Timeline

### Phase 1: Core Download (CURRENT - June 2026)
**Status:** Frontend Complete, Backend Pending

✅ YouTube URL input and validation
✅ Quality selection (7 options)
✅ Download management (start, pause, resume, cancel)
✅ Real-time progress tracking
✅ Database persistence
✅ Error handling and recovery
✅ Mock data fallback

🔄 Backend implementation (Rust)
- [ ] Metadata API endpoint
- [ ] Download URL endpoint

---

### Phase 2: Video Playback (July-Aug 2026)

**Goal:** Play downloaded videos in-app

🔲 Built-in video player
- [ ] Play/pause controls
- [ ] Seek bar
- [ ] Volume control
- [ ] Fullscreen mode
- [ ] Speed control (0.75x, 1x, 1.5x, 2x)

🔲 Audio playback
- [ ] Play MP3 files
- [ ] Audio player UI
- [ ] Playlist support
- [ ] Shuffle/repeat

🔲 Subtitles (future)
- [ ] Load subtitle files
- [ ] Display over video
- [ ] Timing adjustment

---

### Phase 3: Background & Lock Screen (Sept 2026)

**Goal:** Continue playback with screen off

🔲 Background playback
- [ ] Audio continues when app backgrounded
- [ ] Floating player widget
- [ ] Lock screen controls
- [ ] Notification player controls

🔲 Screen-off optimization
- [ ] Minimal battery drain
- [ ] Minimal RAM usage
- [ ] Wake device on play/pause

---

### Phase 4: Playlist Management (Oct 2026)

**Goal:** Organize downloads into collections

🔲 Create playlists
- [ ] Name playlist
- [ ] Add videos to playlist
- [ ] Remove from playlist
- [ ] Reorder videos

🔲 Playlist features
- [ ] Play entire playlist
- [ ] Shuffle playlist
- [ ] Repeat options
- [ ] Delete playlist

🔲 Smart playlists
- [ ] Recently downloaded
- [ ] Recently watched
- [ ] By uploader
- [ ] By download date

---

### Phase 5: Download Queue (Nov 2026)

**Goal:** Batch downloads and scheduling

🔲 Queue management
- [ ] Add multiple URLs
- [ ] Queue priority
- [ ] Reorder queue
- [ ] Smart queue (pause others)

🔲 Scheduling
- [ ] Schedule downloads for later
- [ ] Download on WiFi only
- [ ] Download at specific time
- [ ] Bandwidth limiting

---

### Phase 6: Cloud Sync (Dec 2026)

**Goal:** Sync downloads across devices

🔲 Optional cloud backup
- [ ] Encrypt before upload
- [ ] Sync metadata
- [ ] Sync watch history
- [ ] Sync playlists

🔲 Cross-device sync
- [ ] Sync to other Android devices
- [ ] Sync to Windows (future)
- [ ] Sync to Linux (future)
- [ ] Conflict resolution

---

### Phase 7: Advanced Features (2027+)

#### Search & Discovery
🔲 Local search
- [ ] Search in downloaded videos
- [ ] Filter by quality
- [ ] Filter by date
- [ ] Search in metadata

🔲 Trending/recommendations (future)
- [ ] Show trending videos
- [ ] Similar videos
- [ ] Channel subscriptions

#### Download Management
🔲 Advanced controls
- [ ] Compression options
- [ ] Quality conversion
- [ ] Format conversion
- [ ] Bitrate limiting

🔲 Storage management
- [ ] Auto-cleanup old files
- [ ] Storage quota warnings
- [ ] Duplicate detection
- [ ] Archive old videos

#### Privacy & Security
🔲 Privacy features
- [ ] Delete watch history
- [ ] Incognito mode
- [ ] Encrypted storage (future)
- [ ] VPN support (future)

---

## Technical Debt & Improvements

### Code Quality
- [ ] Add unit tests (services)
- [ ] Add integration tests (full flow)
- [ ] Add E2E tests (UI)
- [ ] Improve error messages

### Performance
- [ ] Virtual scroll for large lists
- [ ] Image lazy loading
- [ ] Database query optimization
- [ ] Memory leak prevention

### UX
- [ ] Dark mode support
- [ ] Gesture controls (swipe to delete)
- [ ] Haptic feedback
- [ ] Accessibility improvements

---

## Known Limitations

### Current
- ❌ No concurrent downloads (only sequential)
- ❌ No pause/resume for real downloads
- ❌ No video playback
- ❌ No background playback
- ❌ No cloud sync
- ❌ No playlist support
- ❌ No search
- ❌ No recommendations

### By Design (Intentional)
- ❌ No live streaming (too complex)
- ❌ No private video access (requires auth)
- ❌ No premium video access (licensing)

---

## Dependencies

### Phase 1 (Current)
- ✅ React Native (already integrated)
- ✅ RNFS (already integrated)
- ✅ SQLite (already integrated)
- 🔄 Rust backend (in progress)

### Phase 2 (Video Playback)
- Needed: `react-native-video` or similar
- Needed: Video codec support
- Needed: Media player UI library

### Phase 3 (Background Playback)
- Needed: Foreground service capability
- Needed: Media controls API
- Needed: Lock screen integration

### Phase 4+ (Advanced)
- Needed: Cloud storage SDK
- Needed: Encryption library
- Needed: UI animation library

---

## Success Metrics

### Phase 1
- [x] 0% crash rate
- [x] <2 second metadata fetch
- [x] <5MB code size
- [x] <50MB RAM usage
- [x] 95%+ completion rate

### Phase 2
- [ ] 0% crash rate
- [ ] Smooth 60fps playback
- [ ] <100MB player bundle
- [ ] <100MB RAM when playing

### Phase 3
- [ ] <1% battery drain per hour
- [ ] <50MB RAM in background
- [ ] <10 second wake time

---

## Estimated Effort

| Phase | Complexity | Est. Time | Priority |
|-------|-----------|-----------|----------|
| 1 | Low | 2 weeks | ⭐⭐⭐ |
| 2 | Medium | 3 weeks | ⭐⭐⭐ |
| 3 | Medium | 2 weeks | ⭐⭐ |
| 4 | Low | 1 week | ⭐⭐ |
| 5 | Medium | 2 weeks | ⭐ |
| 6 | High | 4 weeks | ⭐ |
| 7 | Various | TBD | ⭐ |

---

## Current Blockers

### Phase 1
🔴 Blocked by: Rust backend implementation
- Waiting for `/api/youtube/metadata` endpoint
- Waiting for `/api/youtube/download-url` endpoint

### Phase 2
🟡 Blocked by: Phase 1 completion + video library selection

### Phase 3+
🟡 Blocked by: Previous phases + design decisions

---

## Integration Points

### With Other Features
- Home Screen: Downloads button
- Settings: Storage preferences (future)
- Gallery: Import downloaded videos (future)
- Sync: Backup downloaded metadata (future)

### With Backend Services
- Authentication: (future)
- Cloud Storage: (future)
- Analytics: (future)

---

## Next 30 Days

**Week 1-2:**
- [ ] Finalize Rust backend APIs
- [ ] Test with real YouTube URLs
- [ ] Optimize download performance

**Week 3-4:**
- [ ] Add video playback (if backend ready)
- [ ] Fix any discovered issues
- [ ] Performance profiling

**After:**
- [ ] Plan Phase 2 design
- [ ] Research video player libraries
- [ ] Start Phase 2 implementation
