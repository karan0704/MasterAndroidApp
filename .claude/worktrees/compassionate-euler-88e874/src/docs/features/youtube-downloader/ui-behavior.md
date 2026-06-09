# YouTube Downloader - UI Behavior

---

## Screens & Flows

### Downloads Screen

**Layout:**
```
┌─────────────────────────────────┐
│        Downloads                │
├─────────────────────────────────┤
│                                 │
│  [URL Input Field]              │
│  Enter YouTube URL...           │
│                                 │
│  [Fetch Metadata Button]        │
│                                 │
│  Video Info (if loaded)         │
│  ├─ Title                       │
│  ├─ Duration                    │
│  └─ Thumbnail                   │
│                                 │
│  [Quality Selector]             │
│  ○ HDR (4K)                     │
│  ○ Dolby (1440p)                │
│  ● HD (720p) [selected]         │
│  ○ Standard (480p)              │
│                                 │
│  [Start Download Button]        │
│                                 │
├─────────────────────────────────┤
│  ─────────────────────────────  │
│  ACTIVE | COMPLETED | FAILED    │
│  ─────────────────────────────  │
│                                 │
│  ┌─────────────────────────────┐│
│  │ Download Title         DOWNLOADING
│  │ HD (720p)               │
│  │ ▰▰▰▰▰▰▱▱▱▱ 65%          │
│  │ 100MB / 150MB           │
│  │ Speed: 5MB/s ETA: 10s   │
│  │ [Pause] [Cancel]        │
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ Another Download      PAUSED │
│  │ FHD (1080p)                 │
│  │ ▰▰▰▰▱▱▱▱▱▱ 40%               │
│  │ [Resume] [Cancel]           │
│  └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
```

---

## User Interactions

### 1. Enter YouTube URL

**Input:**
```
User taps "URL Input Field"
User pastes or types: https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

**Validation:**
- ✓ Valid patterns: youtube.com/watch?v=ID or youtu.be/ID
- ✗ Invalid: Random text, incomplete URLs

**Error Display:**
```
┌──────────────────────┐
│ Invalid YouTube URL  │
└──────────────────────┘
```

### 2. Fetch Metadata

**User Action:** Tap "Fetch Metadata" button

**Loading State:**
```
[Loading...] (button disabled, spinner shown)
```

**Success:**
```
Title: Rick Astley - Never Gonna Give You Up
Duration: 3:53
Uploader: Rick Astley Official
[Thumbnail Image]
```

**Error:**
```
Error: Failed to load metadata
✓ Fallback to mock data available
```

### 3. Select Quality

**UI:**
```
Which quality?

○ HDR (4K)          [500MB - 2GB]
○ Dolby (1440p)     [400MB - 1.5GB]
● HD (720p)         [100MB - 400MB]  ← Selected
○ Standard (480p)   [50MB - 200MB]
○ Low (360p)        [30MB - 100MB]
○ Audio Only (MP3)  [5MB - 20MB]
```

**Behavior:**
- Tap to select
- Shows estimated size for each quality
- Persists selection until changed

### 4. Start Download

**User Action:** Tap "Start Download"

**Transitions:**
```
[Start Download] (enabled)
     ↓
[Loading...] (disabled, spinner)
     ↓
Download added to "Active" tab
     ↓
[Pause] [Cancel] buttons appear
```

### 5. Monitor Progress

**Active Download Item:**
```
┌─────────────────────────────┐
│ Rick Astley - Never...  DOWNLOADING
│ HD (720p)              │
│                        │
│ ▰▰▰▰▰▰▱▱▱▱ 65%         │
│ 100MB / 150MB          │
│ Speed: 5.2MB/s         │
│ ETA: 9s                │
│                        │
│ [Pause] [Cancel]       │
└─────────────────────────────┘
```

**Updates:** Every 1 second

**Colors:**
- Progress bar: Blue (#3B82F6)
- Status badge: Blue
- Completed: Green (#22C55E)
- Failed: Red (#EF4444)
- Paused: Yellow (#FACC15)

### 6. Pause Download

**User Action:** Tap [Pause] button

**Transitions:**
```
[Pause] button removed
[Resume] [Cancel] buttons appear
Status changes to: PAUSED (yellow badge)
Progress bar turns yellow
```

### 7. Resume Download

**User Action:** Tap [Resume] button

**Transitions:**
```
[Resume] button removed
[Pause] [Cancel] buttons reappear
Status changes back to: DOWNLOADING
Progress bar turns blue
```

### 8. Cancel Download

**User Action:** Tap [Cancel] button

**Confirmation:**
```
Are you sure?
[Delete] [Cancel]
```

**Result:**
- Download removed from "Active" tab
- File deleted from device
- Download record deleted from database

### 9. View Completed Downloads

**User Action:** Tap "COMPLETED" tab

**Display:**
```
┌─────────────────────────────┐
│ Rick Astley - Never...  COMPLETED ✓
│ HD (720p)              │
│ Size: 150MB            │
│ Downloaded: 6/8 2026   │
│                        │
│ [Play] [Delete]        │ (future)
└─────────────────────────────┘

┌─────────────────────────────┐
│ Another Video...       COMPLETED ✓
│ FHD (1080p)                 │
│ Size: 400MB                 │
│ Downloaded: 5/8 2026        │
│ [Play] [Delete]             │
└─────────────────────────────┘
```

### 10. View Failed Downloads

**User Action:** Tap "FAILED" tab

**Display:**
```
┌─────────────────────────────┐
│ Bad URL...             FAILED ✗
│ Error: Invalid YouTube URL │
│ [Retry]                │
└─────────────────────────────┘

┌─────────────────────────────┐
│ Deleted Video...       FAILED ✗
│ Error: Video not found │
│ [Retry]                │
└─────────────────────────────┘
```

---

## Error States

### Invalid URL
```
User enters: "not a youtube url"
Result: "Invalid YouTube URL" (red error)
Button remains disabled until fixed
```

### Backend Connection Failed
```
User taps "Fetch Metadata"
Backend at localhost:3000 not responding
Result: App shows mock data automatically
"⚠ Using demo data (backend unavailable)"
```

### Download Failure
```
During download:
- Network drops
- Corrupted file
- Invalid format

Result: Status = "FAILED"
Show: Error message
Allow: Retry button
```

### Storage Full
```
While downloading:
Device storage becomes full

Result: Download paused
Message: "Not enough storage"
Action: User must delete files manually
```

---

## State Transitions Diagram

```
INPUT URL
    ↓
VALIDATE ─→ [Invalid] ─→ ERROR
    ↓
    ↓ [Valid]
FETCH METADATA ─→ [Failed] ─→ MOCK DATA
    ↓
    ↓ [Success]
SHOW VIDEO INFO
    ↓
SELECT QUALITY
    ↓
READY TO DOWNLOAD
    ↓
[Start Download]
    ↓
DOWNLOADING ←──────┐
    ↓              │
[Pause] ──→ PAUSED │
                   │
[Resume] ──────────┘
    ↓
[Cancel] ──→ DELETED
    ↓
COMPLETED ───────→ MOVE TO COMPLETED TAB
    ↓
[Play] (future)
[Delete]

[Error] ──→ FAILED ───→ MOVE TO FAILED TAB
            ↓
            [Retry] ──→ Re-download
```

---

## Responsiveness

### Small Phone (320px - 480px width)
- Single column layout
- Full width buttons
- Stacked quality options
- Reduced thumbnail size

### Large Phone (600px+ width)
- Slightly wider containers
- Better padding
- Thumbnail displayed larger

### Tablet (720px+ width)
- Split layout (future)
- Side-by-side panels
- Multi-column download list

---

## Accessibility

### Text
- Color contrast: WCAG AA
- Readable font sizes
- Clear button labels

### Touch Targets
- Minimum 44px touch area
- Clear visual feedback
- Haptic feedback (future)

### Screen Readers
- All buttons labeled
- Status clearly announced
- Progress described

---

## Performance Considerations

### Smooth 60fps
- Progress bar updates: 1/second
- No janky animations
- Efficient re-renders

### Low End Devices
- Minimal animations
- Simple UI
- Optimized list rendering (future: virtualization)

### Battery
- No polling loops
- Wake device only when needed
- Efficient database queries
