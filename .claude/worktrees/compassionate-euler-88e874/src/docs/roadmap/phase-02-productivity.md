# Phase 2 Productivity Roadmap

## Objective

Build the first **functional productivity ecosystem** connecting:
- **Notes** - knowledge storage
- **Reminders** - action triggers
- **Todo** - task tracking
- **Tasks** - complex workflows
- **Calendar** - timeline visualization
- **Alarm & Clock** - time management

The target is a **connected productivity system**, not isolated mini apps.

Example: A note can contain tasks, reminders, files, and links to calendar events—all without tightly coupling the systems.

---

## Phase 2 Philosophy

### Not Building Separate Apps

Instead of:
```
Notes App (standalone)
Reminders App (standalone)
Todo App (standalone)
```

Build:
```
Connected Productivity Ecosystem
where features enhance each other
while remaining independent
```

### Core Principles

Each module must remain:
- **Independent** - can be used alone
- **Loosely coupled** - no direct feature imports
- **Replaceable** - alternative implementation possible
- **Disable-able** - can be turned off
- **Scalable** - easy to extend

### Cross-Module Communication

Communication happens through:
- **Contracts** - defined interfaces
- **Events** - event-driven signals
- **Services** - shared service layer
- **Hooks** - React hooks for data

**Never:** Direct imports between feature internals

---

## Implementation Order (Strict)

Build in this order. Do not skip ahead.

### Stage 1: Notes Foundation (Phase 2.1 - 2.6)
1. **2.1:** Floating notes launcher
2. **2.2:** Notes list with search
3. **2.3:** Note editor
4. **2.4:** Markdown file storage
5. **2.5:** Metadata system
6. **2.6:** Git-like checkpoints

### Stage 2: Reminder System (Phase 2.7 - 2.8)
7. **2.7:** Reminder engine
8. **2.8:** Repeat rules (daily, weekly, custom)

### Stage 3: Task Management (Phase 2.9)
9. **2.9:** Todo module

### Stage 4: Integration (Phase 2.10 - 2.13)
10. **2.10:** Calendar integration
11. **2.11:** Alarm engine
12. **2.12:** Location reminders
13. **2.13:** Attachments (images, files, voice)

---

## Phase 2.1: Floating Notes Launcher

### Purpose
Quick access to notes without leaving current workflow.

### Features
- Floating icon on screen
- Tap to open notes panel
- Minimal notes view
- Expand to full screen
- Does NOT require notes module fully built

### Architecture
```
FloatingNotesButton
├── Floating overlay
├── Tap handler
├── Navigation to Notes
└── Close handler
```

### Dependencies
- Navigation system
- Window manager (for overlay)

### Out of Scope
- Actual note creation
- Note editing
- Search

---

## Phase 2.2: Notes List Module

### Purpose
Display all notes with search and filtering.

### Features

#### Display
- List all notes
- Show most recent first
- Pinned notes at top
- Color-coded by category

#### Search & Filter
- Search by title
- Search by content (partial)
- Filter by category
- Filter by pinned status

#### Note Cards
Each card shows:
```
Title
Short preview (2 lines)
Created/updated timestamp
Reminder indicator (if linked)
Attachment indicator
Category color
```

#### Category Colors
```
Blue → Work
Green → Health
Yellow → Personal
Red → Important
Purple → Creative
Gray → Other
```

#### States
- Loaded with notes
- Empty state
- Searching
- Loading

### Storage
```
SQLite (metadata):
- id, title, preview
- createdAt, updatedAt
- category, isPinned
- reminderLinked, hasAttachment

Markdown files:
- Full content (not loaded into list)
```

### Dependencies
- Markdown storage (Phase 2.4)
- Metadata system (Phase 2.5)

### Out of Scope
- Creating notes yet
- Editing notes yet
- Note content display

---

## Phase 2.3: Note Editor

### Purpose
Create and edit note content.

### Features

#### Editing
- Plain text editing
- Markdown syntax support
- Checklist support (`- [ ]` syntax)
- Basic formatting toolbar

#### Metadata Display
```
Created: Monday 9:15 AM
Updated: Friday 2:30 PM
Last Opened: Today
```

#### Auto-Save
- Save after 1 second of inactivity
- No manual save needed
- Save indicator

#### Formatting Support
```
Text: normal
Bold: **text**
Italic: *text*
Headers: # Title
Lists: - item
Code: `code`
```

### Architecture
```
NoteEditor
├── TextInput with Markdown
├── Formatting Toolbar
├── Auto-save logic
├── Metadata display
└── Keyboard handling
```

### Storage (Phase 2.4)
- Saves to markdown file
- Backup to temp during edit

### Dependencies
- File storage (Phase 2.4)
- Auto-save mechanism

### Out of Scope
- Rich text editing yet
- Image embedding yet
- Voice notes yet

---

## Phase 2.4: Markdown Storage

### Purpose
Persist note content as human-readable files.

### Strategy

**Markdown = Source of Truth**

```
Storage Hierarchy:
├── Markdown files (.md)
│   └── Actual note content
│
└── SQLite metadata
    └── References and indexes
```

### File Organization
```
App Data Directory:
└── documents/
    └── notes/
        ├── note_uuid_1.md
        ├── note_uuid_2.md
        └── note_uuid_3.md
```

### Content Example
```markdown
# Meeting Notes

Created: 2024-06-01 09:15
Updated: 2024-06-01 14:30

## Discussion Points

- [ ] Review architecture
- [x] Approve design
- [ ] Schedule follow-up

## Action Items

1. Send meeting summary
2. Update roadmap
3. Schedule next meeting
```

### Metadata Storage (SQLite)
```
notes table:
- id (UUID)
- title (indexed)
- filePath
- createdAt
- updatedAt
- category
- isPinned
- reminderLinked (boolean)
- hasAttachment (boolean)
```

### Why Markdown?
```
✓ Human readable
✓ AI readable
✓ Version control friendly
✓ Portable
✓ Easy to back up
✓ Tiny file size
✓ Easy to sync later
```

### Dependencies
- File system access
- File I/O service

---

## Phase 2.5: Metadata System

### Purpose
Track note state for search and filtering.

### Metadata Tracked

**Time**
```
createdAt: timestamp
updatedAt: timestamp
lastOpenedAt: timestamp
```

**State**
```
isPinned: boolean
category: string
isFavorite: boolean
```

**Relationships**
```
reminderLinked: boolean
hasAttachment: boolean
attachmentCount: number
```

### Usage

**In Notes List:**
- Sort by createdAt, updatedAt, or lastOpenedAt
- Filter by category
- Show pinned notes first
- Display icons for reminders/attachments

**In Search:**
- Index title for fast search
- Index category
- Store preview text

### Storage
```
SQLite optimized queries:
- SELECT * FROM notes WHERE category = ?
- SELECT * FROM notes WHERE isPinned = true
- SELECT * FROM notes ORDER BY updatedAt DESC
```

### Dependencies
- Markdown storage
- SQLite setup

---

## Phase 2.6: Git-Like Checkpoints

### Purpose
Track note history like git commits.

### Features

#### History Timeline
Each major change creates a checkpoint:
```
Checkpoint 1: Created
Checkpoint 2: Edited task list
Checkpoint 3: Added reminder
Checkpoint 4: Added file
```

#### Operations
- **Undo** - restore to previous checkpoint
- **Restore** - revert to old version
- **View History** - timeline view
- **Compare** - see what changed (future)

### Storage

**Checkpoint file:**
```
notes/checkpoints/
└── note_uuid/
    ├── checkpoint_1.md (oldest)
    ├── checkpoint_2.md
    ├── checkpoint_3.md
    └── checkpoint_latest.md
```

**Metadata (SQLite):**
```
note_id
checkpoint_id
content_hash
timestamp
change_description
```

### When to Create Checkpoints
- After user saves explicitly
- After 5 minute of editing completion
- Before major operations
- User can manually checkpoint

### Dependencies
- File storage
- Metadata system

---

## Phase 2.7: Reminder Engine

### Purpose
Create and manage reminders that can be attached to notes.

### Features

#### Reminder Types
1. **One-Time** - single notification at specific time
2. **Scheduled** - specific date and time
3. **Recurring** - repeating pattern (handled in 2.8)
4. **Location** - when near location (Phase 2.12)

### Example Reminders
```
"Call mom" - Tomorrow 6 PM
"Team standup" - Every Monday 9 AM
"Buy milk" - When near store
"Project deadline" - June 15
```

### Architecture

**Reminder Engine Service**
```
ReminderService
├── Create reminder
├── Schedule reminder
├── Cancel reminder
├── Trigger reminder
├── Persist reminder
└── Query reminders
```

**Storage (SQLite)**
```
reminders table:
- id
- linkedNoteId (nullable)
- linkedTodoId (nullable)
- title
- description
- scheduledTime
- type (one-time, recurring, location)
- isActive
- createdAt
```

### Notification Delivery
```
Scheduled Time Reached
↓
ReminderEngine checks
↓
Create notification
↓
Show to user
↓
User interacts with notification
```

### Dependencies
- Alarm engine (Phase 2.11) for timing
- Notification system
- Metadata (for linking)

### Out of Scope
- Repeat patterns (Phase 2.8)
- Location triggers (Phase 2.12)

---

## Phase 2.8: Repeat Rules Engine

### Purpose
Intelligent recurring reminders.

### Features

#### Repeat Patterns
```
Every Monday morning
Every Friday afternoon
Every 2 weeks
Every month
Every day
Custom pattern
```

### Example Use Cases

**Tiffin Service Reminder**
```
Text Tiffin Man
Repeat: Monday morning, Friday afternoon
Message: "Pause tiffin service"
Action: Open WhatsApp with template
```

**Team Standup**
```
Team Standup
Repeat: Every weekday 9 AM
Description: "Join meeting"
```

### Implementation

**Rules Engine**
```
RepeatRule
├── Pattern (cron-like)
├── Recurrence (daily, weekly, monthly)
├── Exceptions (skip certain dates)
└── End date (optional)
```

**Storage (SQLite)**
```
repeat_rules table:
- id
- reminder_id
- pattern (human-readable)
- cronExpression (for calculations)
- nextOccurrence
- endDate (nullable)
```

### Dependencies
- Reminder engine
- Calendar system (for dates)
- Time calculation library (dayjs)

---

## Phase 2.9: Todo Module

### Purpose
Track tasks and completion status.

### Features

#### Todo Items
```
Task: "Finish presentation"

Metadata:
├── Priority: High
├── Status: In Progress
├── Deadline: June 15
├── Category: Work
├── Tags: [project, deadline]
├── Linked Note: "Presentation Planning"
└── Linked Reminder: "June 14, 6 PM"
```

#### Status Tracking
```
Pending → In Progress → Done
                    ↘ Cancelled
                    ↘ Skipped
```

#### Features
- Create/edit/delete todos
- Mark complete
- Set priority (High, Medium, Low)
- Set deadline
- Link to notes
- Link to reminders
- Link to tasks
- Category organization

### Architecture
```
TodoService
├── Create todo
├── Update status
├── Link reminder
├── Link note
└── Delete todo

TodoStore (Zustand)
├── All todos
├── Filtered todos
├── Current selection
└── Edit state
```

### Storage (SQLite)
```
todos table:
- id
- title
- description
- status (pending, in_progress, done, cancelled)
- priority (high, medium, low)
- deadline
- category
- linkedNoteId (nullable)
- linkedReminderId (nullable)
- tags (JSON array)
- createdAt
- completedAt
```

### Dependencies
- Reminders (Phase 2.7)
- Notes (Phase 2.4)

---

## Phase 2.10: Calendar Integration

### Purpose
Timeline view of all scheduled items.

### Display
```
Calendar Views:
├── Day view
├── Week view
├── Month view
├── Agenda list
└── Timeline view
```

### What Shows on Calendar
```
Reminders
├── Time-based reminders
├── Recurring reminders
└── Location reminders (Phase 2.12)

Todos
├── Items with deadlines
└── Completed items

Tasks
├── Project deadlines
├── Milestones
└── Dependencies

Calendar Events
└── System calendar integration
```

### Example Day
```
Friday, June 15

9:00 AM - Team Standup
10:30 AM - Reminder: Submit report
2:00 PM - Todo: Finish presentation (deadline)
6:00 PM - Reminder: Call mom
```

### Dependencies
- Reminders (Phase 2.7)
- Todos (Phase 2.9)
- Repeat rules (Phase 2.8)

---

## Phase 2.11: Alarm Engine

### Purpose
Background trigger system for reminders and alarms.

### Features
```
Alarm Engine
├── One-time alarms
├── Daily alarms
├── Weekly alarms
├── Monthly alarms
└── Custom patterns
```

### Responsibility
```
Alarm Engine:
- Monitors scheduled times
- Triggers notifications at correct time
- Works in background
- Respects device sleep
- Survives app closure
- Survives device restart
```

### Architecture
```
AlarmService
├── Schedule alarm
├── Cancel alarm
├── Check upcoming
└── Trigger notification

BackgroundTask
├── Periodic checks
├── Wake-up triggers
└── Notification dispatch
```

### Dependencies
- Android AlarmManager (native)
- Notification service

---

## Phase 2.12: Location Reminders

### Purpose
Trigger reminders when user arrives at location.

### Example
```
"Buy milk"
When near: D-Mart Supermarket
```

### Features
- GPS-based location detection
- Radius trigger (100m, 500m, etc.)
- Named locations
- Map selection
- Geofence monitoring

### Implementation
```
LocationReminderService
├── Create location reminder
├── Monitor location
├── Detect entry/exit
├── Trigger when matched
└── Cancel monitoring
```

### Dependencies
- Location services
- Geofencing API
- Reminder engine
- Background tasks

---

## Phase 2.13: Attachments

### Purpose
Attach media to notes.

### Supported Types
```
Images: .jpg, .png, .webp
Voice: .m4a, .mp3
Video: .mp4 (metadata, not full file)
Files: .pdf, .txt, .doc, .docx
Links: HTTP, HTTPS URLs
```

### Storage
```
Markdown file:
- Links to attachments
- Inline for small images
- References for large files

File system:
- documents/notes/note_uuid/attachments/
- metadata.json (info about attachments)

SQLite:
- attachment records
- note_id references
```

### Dependencies
- File storage
- Image library
- Audio library
- Document viewers

---

## Module Relationship Map

```
Notes
│
├─→ Reminders
│   ├─→ Repeat Rules
│   ├─→ Alarm Engine
│   └─→ Location Service
│
├─→ Todos
│   └─→ Reminders
│
├─→ Calendar
│   ├─→ Reminders
│   ├─→ Todos
│   └─→ Alarm Engine
│
├─→ Tasks
│   └─→ Reminders
│
└─→ Attachments
    ├─→ Images
    ├─→ Voice notes
    ├─→ Files
    └─→ Links
```

**Key:** Features link to others, but do NOT import internals.

---

## Scope Discipline

### Do NOT Skip Ahead

Each phase has dependencies. Example:

```
❌ WRONG: Build reminder UI before notes
❌ WRONG: Build calendar before todos exist
❌ WRONG: Build location reminders before reminders work
```

### Build in Order

```
✅ Build Notes first (foundation)
✅ Then build Reminders (attach to notes)
✅ Then build Todos (can link reminders)
✅ Then build Calendar (shows reminders + todos)
```

### Each Phase Must be Stable

Before moving to next:
- ✅ Features work
- ✅ Documented in feature docs
- ✅ Tested on low-end device
- ✅ No memory leaks
- ✅ No tight coupling

---

## Success Criteria for Phase 2

By end of Phase 2:
- ✅ User can create, edit, delete notes
- ✅ Notes persist across app sessions
- ✅ User can set reminders on notes
- ✅ Reminders trigger at correct time
- ✅ User can create todos and track completion
- ✅ Calendar shows all scheduled items
- ✅ All modules remain loosely coupled
- ✅ App still meets performance targets (<250MB RAM, <120MB size)
- ✅ Works on low-end devices
- ✅ Offline functionality works perfectly
- ✅ Comprehensive documentation exists
