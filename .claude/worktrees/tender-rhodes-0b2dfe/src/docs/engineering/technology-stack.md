# Technology Stack

## Purpose

This file documents the recommended technology choices for the Master Android App.

All decisions prioritize:
- low-end device compatibility
- minimal RAM and storage usage
- offline-first functionality
- AI-friendly development
- modular architecture

---

## Frontend Layer

### Recommended: React Native

**Why React Native?**
- Android-first development
- Future desktop support possible (Windows, Linux)
- Good ecosystem
- Fast iteration
- Familiar patterns

**Alternative considered: Flutter**
- Also viable for cross-platform
- Slightly better performance
- Larger compiled size
- Choose based on team preference

**Not Recommended: Electron**
- 500MB+ RAM at idle
- Too heavy for low-end devices
- Not suitable for this project

---

## State Management

### Recommended: Zustand

**Why Zustand?**
```
Lightweight
Low boilerplate
Easy to understand
Scalable for modular architecture
AI-friendly code patterns
```

**Avoid: Redux**
- Too much complexity for initial phases
- Overkill for modular features
- Can migrate later if needed

**Usage Pattern:**
- Feature-owned state in feature store
- Shared state in core store only when truly cross-cutting
- Keep stores small and focused

---

## Local Persistent Storage

### Recommended: react-native-mmkv

**Purpose:** Fast, lightweight key-value storage

**Use for:**
```
Settings
Cache
App state
Session state
Lightweight preferences
Flags
```

**Why MMKV?**
```
Very fast
Low RAM overhead
Persistent across sessions
Lightweight (~50KB)
Easy to access
```

**Do NOT use for:**
- Large structured feature content
- Complex relationships
- Data requiring queries/filtering
- Note content (use Markdown files instead)

---

## Structured Data Storage

### Recommended: SQLite

**Purpose:** Relational data with queries and indexing

**Use for:**
```
Todo metadata
Note metadata and references
Gallery relationships
Sync history
Task dependencies
Indexes and filters
Cross-feature references (later)
```

**Why SQLite?**
```
Tiny size
Very fast
No installation required
Offline native support
Widely stable
Good performance even on low-end devices
Supports transactions
```

**Do NOT store in SQLite:**
- Large note content (store in files instead)
- Large media payloads
- Streaming data

---

## Notes Content Storage

### Recommended: Markdown (.md files)

**Format:** Plain text Markdown

**Why Markdown?**
```
Human readable
AI readable
Tiny file size
Easy to back up
Easy to version control
Portable
Easy to sync later
Simple parsing
```

**Storage Pattern:**
```
/documents/notes/
  note_uuid_1.md
  note_uuid_2.md
  note_uuid_3.md
```

**Metadata:** Store separately in SQLite
```
id
title
filePath
createdAt
updatedAt
category
isFavorite
syncStatus
```

**Example Structure:**
```
SQLite: notes metadata (indexed, queryable)
Markdown files: actual note content (human-readable)
```

---

## Date and Time

### Recommended: dayjs

**Why dayjs?**
```
Tiny (~2KB)
Fast
Easy API
Timezone support
Plugin system
```

**Usage:**
- Date parsing
- Formatting
- Timezone handling
- Scheduling calculations
- Comparison operations

---

## Navigation

### Recommended: React Navigation

**Why React Navigation?**
- Standard in React Native ecosystem
- Good performance
- Familiar patterns

**Must Follow: Tree-Based Navigation**
- Not deep nested menus
- Step-by-step guidance for users
- Clear navigation hierarchy

**Example Good Pattern:**
```
Home
├── Share Screen
│   ├── Same Network
│   │   ├── Enable WiFi
│   │   ├── Nearby Devices
│   │   └── Start Sharing
│   └── Scanner
└── Notes
    ├── List
    ├── Create
    └── Edit
```

---

## Native Android Layer

### Recommended: Kotlin

**When to use native Kotlin:**
```
Permissions handling
Floating overlays
Nearby devices APIs
Voice processing APIs
Background services
Screen capture
Hardware access
Deep system integration
```

**When NOT to use:**
- Don't use for business logic (keep in React Native)
- Don't use for UI (use React Native)
- Only use when JS bridge is insufficient

**Bridge Pattern:**
```
React Native ← (bridge) → Kotlin Native Module
```

---

## Communication & Synchronization

### For Local Network (Same WiFi)

**Recommended: mDNS / Zeroconf**
- Auto device discovery
- No manual IP configuration
- Zero-configuration networking
- Example: Apple's Bonjour

### For Real-Time Streaming (Future)

**Recommended: WebRTC**
- Free and open
- Peer-to-peer capable
- Encrypted by default
- Low latency
- Good for screen sharing
- Works on same WiFi efficiently

### Internal Module Communication

**Recommended: Event-Driven Architecture**
- Features communicate through events
- Examples:
  ```
  ScreenShareStarted
  FileTransferComplete
  WiFiEnabled
  DeviceConnected
  ReminderTriggered
  ```
- No tight coupling
- Easy to extend

---

## File Transfer

**Recommended: HTTP Chunk Streaming**

**Why?**
```
Simple to implement
Fast and reliable
Resume capability
Works on LAN
Standard protocol
```

**Features:**
- Break large files into chunks
- Stream progressively
- Resume on disconnect
- Compression optional

---

## Encryption & Security

### Recommended: libsodium (via Sodium.js)

**Why libsodium?**
```
Fast
Secure (modern algorithms)
Simple API
Low CPU overhead
Proven crypto library
```

**Use for:**
- Device pairing
- Encrypted sync
- Secure file transfer
- Session encryption

---

## Voice Processing

### Current Phase
- Use system voice assistants:
  - **Android:** Gemini, Google Assistant
  - **Windows (future):** Windows Voice APIs
  - **Linux (future):** Open-source alternatives

### Future Phase
- **Offline Voice:** Vosk
  - Lightweight
  - Open source
  - Works on low-end devices
  - ~50MB size

---

## Gallery Intelligence (Future)

### Recommended: OpenCV

**Use for:**
- Face detection
- Image similarity
- Photo grouping
- Relationship detection

**Why OpenCV?**
- Lightweight enough
- Industry standard
- Good performance

---

## Architecture Pattern: Modular Monolith

### Current Strategy
```
One application
Multiple independent modules
Each module is a "mini app"
```

### Not: Full Microservices Yet
- Too complex for Phase 1-2
- Overcomplicates local-first development
- Can evolve to microservices later if needed

### Benefits
```
Easier debugging
Simpler deployment
Offline works naturally
Shared resources efficiently
Can split later
```

---

## Deployment & DevOps

### Version Control
- Git
- GitHub

### Containerization (Future, not Phase 1)
- Docker (when needed for desktop/server)

---

## Resource Optimization Targets

### Android App Size
```
Target: 80–120 MB
Includes: All phase 2 features
Not: Large media libraries
```

### Idle RAM Usage
```
Target: 100–250 MB
On low-end 3GB devices
Leaves room for other apps
```

### Startup Time
```
Target: Below 2 seconds
Cold start
Low-end devices
```

### CPU Usage
```
Target: Near idle when inactive
No background drains
Efficient event handling
```

### Offline Capability
```
Target: 100% offline first
No internet dependency for core features
Sync is optional enhancement
```

---

## Summary Table

| Layer | Technology | Why |
|-------|-----------|-----|
| UI | React Native | Cross-platform, mobile-first |
| State | Zustand | Lightweight, modular |
| Storage (KV) | MMKV | Fast, low-overhead |
| Storage (SQL) | SQLite | Relational, offline |
| Content | Markdown | Human & AI readable |
| Dates | dayjs | Tiny, capable |
| Navigation | React Navigation | Standard, performant |
| Native | Kotlin | System integration |
| Network | mDNS + WebRTC | Efficient, local-first |
| Voice | Gemini + Vosk | System + offline |
| Encryption | libsodium | Secure, fast |

---

## Decision Principles

All tech choices follow:
1. **Low-end device first** - works on 3GB RAM devices
2. **Offline primary** - sync is enhancement, not requirement
3. **Minimal overhead** - small bundles, fast startup
4. **Modular** - each component independent
5. **AI-friendly** - clear patterns, readable code
6. **Future-proof** - can extend without rewrite
