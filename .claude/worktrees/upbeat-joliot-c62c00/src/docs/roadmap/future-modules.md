# Future Modules Roadmap

## Purpose

This file documents modules planned for future phases beyond Phase 2.

These modules are **planned but not started**. Implementation order may change based on:
- User needs
- Development progress
- Dependencies on earlier modules
- Resource availability

---

## Module Overview

### Currently Completed
- ✅ Phase 1: Home screen foundation

### Currently In Progress
- 🔄 Phase 2: Productivity foundation (Notes, Reminders, Todo, Calendar, Alarm)

### Planned Future Modules
- ⏳ Media & YouTube module
- ⏳ Gallery (smart relationships)
- ⏳ Screen Sharing
- ⏳ File Transfer
- ⏳ Voice Assistant
- ⏳ Sync Engine
- ⏳ Settings (advanced)

---

## Phase 3: Media & YouTube Module

### Purpose

Extend the app to support media consumption and management.

Users can:
- Search YouTube videos
- Watch videos in-app
- Play media in background
- Play with screen off
- Download videos for offline viewing
- Create playlists of links

### Module Scope

**Part A: YouTube Integration**
- YouTube API integration
- Search functionality
- Video playback in-app
- Background playback support
- Screen-off audio playback

**Part B: Media Player**
- Local video playback
- Audio playback
- Playlist management
- Play queue
- Shuffle and repeat

**Part C: Offline Downloads**
- Download videos
- Download quality selection
- Download management (storage, cleanup)
- Offline video access

**Part D: Media Library**
- Organize downloaded content
- Create collections
- Tag videos
- Search history

### Key Features

#### 1. YouTube Search & Discovery
```
Search YouTube
├── Display results
├── Preview metadata
│   ├── Title
│   ├── Duration
│   ├── Channel
│   ├── Thumbnail
│   └── View count
├── Watch video
└── Save to library
```

#### 2. In-App Video Playback
```
Video Player
├── Full-screen mode
├── Inline mode
├── Controls
│   ├── Play/Pause
│   ├── Seek
│   ├── Volume
│   └── Quality selection
└── Subtitles (if available)
```

#### 3. Background Playback
```
Feature: Play audio while app is backgrounded
├── Works with:
│   ├── YouTube audio
│   ├── Music videos
│   └── Podcasts
├── Controls:
│   ├── Floating player
│   ├── Notification controls
│   └── Lock screen controls
└── Respects:
    ├── Device mute
    ├── Do Not Disturb
    └── Notifications
```

#### 4. Screen-Off Playback
```
Feature: Continue playing audio with screen off
├── Audio continues
├── Minimal RAM usage
├── Minimal battery drain
├── Lock screen controls work
└── Can return to app
```

#### 5. Video Download
```
Download System
├── Download selected video
├── Quality options
│   ├── HD (720p)
│   ├── SD (480p)
│   └── Low (360p)
├── Storage management
│   ├── Download location
│   ├── Storage cleanup
│   └── Retention policy
└── Download history
```

#### 6. Offline Access
```
Offline Features
├── Watch downloaded videos
├── No network required
├── Saved playlists
├── Offline search in metadata
└── Download queue management
```

### Architecture

#### Service Layer
```
YouTubeSearchService
├── Search API calls
├── Result caching
└── Metadata fetching

MediaPlayerService
├── Video playback control
├── Audio playback control
├── Queue management
└── State persistence

DownloadService
├── Download management
├── Quality selection
├── Storage handling
└── Cleanup policies

MediaLibraryService
├── Downloaded content management
├── Metadata storage
├── Search in local content
└── Collection organization
```

#### Storage
```
SQLite metadata:
- Downloaded videos
- Playlists
- Watch history
- Search history
- Download queue

Markdown files:
- Playlist descriptions
- Notes about videos
- Tags and collections

File storage:
- Downloaded video files
- Thumbnails cache
- Temporary downloads
```

#### State Management
```
mediaStore (Zustand)
├── Current player state
├── Queue state
├── Search results
└── Download progress

Persistent (MMKV):
├── Download preferences
├── Quality preferences
├── Search history
└── Recently watched
```

#### UI Components
```
shared/components/
├── VideoPlayer.tsx (shared media player)
├── PlayButton.tsx
├── ProgressBar.tsx
└── VolumeControl.tsx

features/youtube/ui/
├── YouTubeSearch.tsx
├── SearchResults.tsx
├── VideoCard.tsx
├── VideoDetail.tsx
├── DownloadPrompt.tsx
├── DownloadProgress.tsx
└── MediaLibrary.tsx
```

### Dependencies
- YouTube API key (obtained from Google Cloud)
- Media player libraries
- Download management
- Background task capability

### Offline-First Strategy
```
Online:
- Stream from YouTube
- Search live
- Instant access

Offline:
- Play downloaded videos
- Search in local metadata
- Browse library
- No sync until online
```

### Performance Targets
```
Search response: < 1 second (cached)
Video start time: < 2 seconds
Download speed: Full resolution in < 5 minutes
Memory per video: < 100MB streaming
Storage for downloads: User configurable
```

### Phase 3 Suggested Order
1. YouTube API integration
2. Video playback UI
3. In-app video player (basic)
4. Search functionality
5. Download capability
6. Offline access
7. Playlist management
8. Background playback refinement

---

## Phase 4: Smart Gallery Module

### Purpose

Intelligent photo and video gallery with relationship-based organization.

### Key Features

**Relationship-Based Organization:**
- Group by event (Goa Trip, Birthday Party, etc.)
- Group by person (face recognition)
- Group by location (GPS, tagged locations)
- Group by date/time ranges
- Custom tags and collections

**Multiple Views:**
- Timeline view
- Grid view
- Map view (location-based)
- Face view (person-based)
- Album view (collection-based)

**Smart Search:**
- Find by person
- Find by location
- Find by time
- Find by event
- Full-text search in metadata

### Architecture
```
GalleryService
├── Image scanning
├── Metadata extraction
├── Relationship detection
└── Index management

FaceDetectionService (OpenCV)
├── Face detection
├── Face clustering
└── Person identification

LocationService
├── GPS metadata reading
├── Location clustering
└── Place identification

SearchService
├── Index querying
├── Full-text search
└── Filter application
```

### Storage
```
SQLite:
- Image metadata
- Face data
- Location coordinates
- Relationships
- Collections

File-based:
- Image files (cached)
- Thumbnail cache
- Analysis results
```

---

## Phase 5: Screen Sharing Module

### Purpose

Mirror Android screen to nearby devices over WiFi.

### Key Features
- Detect nearby devices (mDNS)
- Establish secure connection
- Stream screen at adjustable quality
- Audio streaming
- Remote control capability (future)

### Architecture
```
ScreenCaptureService (Kotlin native)
├── MediaProjection API
├── Frame capture
└── Encoding

StreamingService
├── Frame compression
├── Network transmission
└── Quality adaptation

DeviceDiscoveryService (mDNS)
├── Device announcement
├── Device detection
└── Connection management
```

---

## Phase 6: File Transfer Module

### Purpose

Efficiently transfer files between devices on same network.

### Key Features
- File drag-and-drop
- Folder sharing
- Batch transfer
- Resume capability
- Compression option

### Architecture
```
FileTransferService
├── Directory scanning
├── Chunk management
├── Transfer control
└── Resume logic

NetworkService
├── HTTP streaming
├── Chunk delivery
└── Checksum verification
```

---

## Phase 7: Voice Assistant Integration

### Purpose

Voice command support across all features.

### Features
- Voice command parsing
- Intent recognition
- Feature routing
- Offline voice support (Vosk)
- Online voice support (Gemini)

### Architecture
```
VoiceService
├── Audio capture
├── Speech recognition
├── Intent detection
└── Command execution

CommandRouter
├── Route to features
├── Parameter extraction
└── Result handling

IntentRecognizer
├── Command parsing
├── Feature matching
└── Context handling
```

---

## Phase 8: Sync & Cloud Integration

### Purpose

Optional cloud backup and cross-device synchronization.

### Features
- Offline-first local data
- Optional cloud backup
- Cross-device sync
- Conflict resolution
- Privacy-first encryption

### Architecture
```
SyncService
├── Local state tracking
├── Change detection
├── Conflict resolution
└── Network queuing

CloudAdapter
├── API communication
├── Authentication
├── Data encryption
└── Retry logic

ConflictResolver
├── Detect conflicts
├── Merge strategies
└── User prompts
```

---

## Phase 9: Advanced Settings

### Purpose

Fine-grained control over app behavior.

### Features
- Theme switching (light, dark, AMOLED)
- Performance tuning
- Storage management
- Privacy controls
- Export/Import
- Backup management

---

## Module Dependencies

```
Home (Phase 1)
│
├── Notes (Phase 2)
├── Reminders (Phase 2)
├── Todo (Phase 2)
├── Calendar (Phase 2)
└── Alarm (Phase 2)
    │
    ├── YouTube (Phase 3)
    │   └── Media Player
    │
    ├── Gallery (Phase 4)
    │   └── Media Library
    │
    ├── Screen Share (Phase 5)
    │
    ├── File Transfer (Phase 6)
    │
    ├── Voice Assistant (Phase 7)
    │   └── Command Router
    │
    ├── Sync (Phase 8)
    │   └── Cloud Integration
    │
    └── Settings (Phase 9)
        └── Theme System
```

### Critical Dependencies

**Must complete before next phase:**
1. Phase 1 before Phase 2 (foundation)
2. Phase 2 before Phase 3+ (core features)
3. YouTube media player before Background playback
4. Gallery relationship engine before Smart Gallery UI

---

## Implementation Notes

### For Each Phase

1. **Document first** - define scope in docs/
2. **Build modular** - follow feature-first pattern
3. **Test thoroughly** - especially offline and low-end devices
4. **Maintain performance** - keep targets: <250MB RAM, <120MB size
5. **Add tests** - unit and integration
6. **Update roadmap** - mark as completed

### Across All Future Work

- ✅ Maintain the 5-10 files per change rule
- ✅ Keep features independent
- ✅ Use contracts for cross-feature communication
- ✅ Store data locally first, sync second
- ✅ Test on low-end devices
- ✅ Keep bundle size in check
- ✅ Document as you build
- ✅ No tightly coupled code

---

## Priority Ordering

**User Value Order:**
1. YouTube (entertainment)
2. Gallery (media organization)
3. File Transfer (device connectivity)
4. Sync (data safety)
5. Voice Assistant (convenience)
6. Screen Share (sharing)
7. Advanced Settings (control)

**Technical Dependency Order:**
1. YouTube (minimal dependencies)
2. Gallery (metadata infrastructure)
3. File Transfer (network stack)
4. Voice Assistant (command system)
5. Screen Share (complex system)
6. Sync (conflict resolution)
7. Advanced Settings (theme system)

**Recommended Order:**
Likely: YouTube → Gallery → File Transfer → Sync → Voice Assistant

Flexible based on user feedback.
