# Master Android App – Codex / VS Code Development Context

# Project Identity

Project Name:

```text
Master Android App
```

Current Development Phase:

```text
Android Phase 1
```

Development Environment:

```text
VS Code
+
Codex / AI Assisted Development
```

Current Goal:

Build a scalable, modular, Android-first productivity ecosystem application using:

```text
React Native
```

with long-term support for:

```text
Windows
Linux
```

The system should be built from day one with:

```text
Scalable Architecture
Loose Coupling
SOLID Principles
Offline First Design
Plugin-like Modules
AI Friendly Development
Minimal Refactoring
Low-end Device Optimization
```

---

# Critical Development Philosophy

This project is intentionally designed for:

```text
Low Context AI Development
```

Meaning:

AI should be able to understand, debug, or add any feature using only:

```text
5–10 files maximum
```

without loading the full project.

This is a strict architectural requirement.

Bad architecture:

```text
Feature change
→ Requires 50 files
```

Good architecture:

```text
Feature change
→ Only 5–10 related files
```

Every design decision must support:

```text
Minimal Context
Minimal Refactoring
Maximum Isolation
```

---

# Golden Rules for Writing Code

## Rule 1 — Never Write Tightly Coupled Code

Bad:

```text
Todo feature directly importing Notes internals
```

Good:

```text
Todo uses Notes Contract/API
```

Communication between features must happen through:

```text
Interfaces
Contracts
Events
Hooks
Services
```

Never direct internal access.

---

## Rule 2 — Every Feature Must Be Independent

Each feature behaves like:

```text
Mini Application
Inside Master App
```

Meaning:

Feature can be:

```text
Added
Removed
Disabled
Extended
```

without breaking unrelated features.

Example:

Removing:

```text
screen-share
```

must NOT break:

```text
notes
todo
settings
gallery
voice assistant
```

---

## Rule 3 — High Cohesion

Each module should do:

```text
One thing only
```

Bad:

```text
SyncService

handles:
database
network
notifications
screen share
voice
```

Good:

```text
SyncService → sync only

NotificationService → notifications only

StorageService → storage only

VoiceService → voice only
```

---

## Rule 4 — Minimal File Changes

Adding a feature should modify:

```text
Minimal files only
```

Example:

Adding:

```text
Voice Notes
```

should ideally touch only:

```text
voice-notes/
voice-service/
voice-ui/
voice-docs/
```

Avoid system-wide refactoring.

---

## Rule 5 — AI Readability First

Code should be optimized for:

```text
Human readability
+
AI readability
```

Avoid:

```text
Huge files
Complex abstractions
Deep nesting
Magic code
```

Prefer:

```text
Small files
Clear naming
Feature isolation
Predictable patterns
```

---

# Current Tech Stack

## Frontend

Recommended:

React Native

Reason:

```text
Android-first
Future desktop support possible
Good ecosystem
Fast iteration
```

---

## Native Android Layer

Recommended:

Kotlin

Used only when required.

Examples:

```text
Nearby devices
Permissions
Floating overlay
Background services
Screen capture
Voice APIs
Hardware access
```

React Native should call native modules only when necessary.

---

## State Management

Recommended:

```text
Zustand
```

Reason:

```text
Lightweight
Low boilerplate
Easy to understand
Scalable
AI friendly
```

Avoid:

```text
Redux initially
```

Too much complexity.

---

## Local Storage

Recommended:

```text
react-native-mmkv
```

Reason:

```text
Very fast
Low RAM
Persistent
Lightweight
```

For:

```text
Settings
Cache
App state
Session state
```

---

## Structured Data Storage

Recommended:

SQLite

For:

```text
Todo
Metadata
Gallery relations
Sync history
Task storage
```

---

## Notes Storage

Recommended:

```text
Markdown (.md)
```

Reason:

```text
Human readable
AI readable
Tiny size
Easy backup
Future sync friendly
```

---

## Date Handling

Recommended:

```text
dayjs
```

---

## Navigation

Recommended:

```text
React Navigation
```

Must follow:

```text
Tree Based Navigation
```

not deep menus.

---

# Required Folder Structure

Project must follow:

```text
src/
│
├── app/
│
├── core/
│   ├── contracts/
│   ├── events/
│   ├── services/
│   ├── types/
│   └── constants/
│
├── features/
│
│   ├── home/
│   │   ├── ui/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   ├── contracts/
│   │   └── docs/
│
│   ├── notes/
│   ├── todo/
│   ├── gallery/
│   ├── voice/
│   ├── screen-share/
│   ├── sync/
│   └── settings/
│
├── navigation/
│
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── theme/
│
├── storage/
│
├── assets/
│
└── docs/
```

---

# Feature Folder Standard

Every feature MUST contain:

```text
feature-name/
│
├── ui/
├── hooks/
├── services/
├── store/
├── contracts/
├── docs/
├── tests/
└── index.ts
```

Mandatory documentation:

```text
README.md
architecture.md
api_contract.md
todo.md
```

Purpose:

AI should understand feature independently.

---

# Phase 1 Scope (STRICT)

DO NOT BUILD EVERYTHING.

Phase 1 goal:

```text
Strong Foundation Only
```

Build only:

## First Screen

### Top Left

Show:

```text
Current Date & Time
```

Realtime.

Updates automatically.

---

### Center

Show:

```text
Coming Soon Apps
```

No advanced logic.

No backend.

No authentication.

No sync.

No networking.

No database logic yet.

Purpose:

```text
Validate architecture
Validate modular design
Setup coding standards
```

---

# Home Screen Module Rules

Create feature:

```text
features/home/
```

Must contain:

```text
screen
components
hooks
service
docs
```

Even if logic is simple.

Reason:

Future scalability.

---

# Voice Assistant Architecture (Future)

Master app should support:

### Android

* Gemini
* Google Assistant

### Windows

* Cortana-like workflows
* Windows voice APIs

### Linux

* Open-source voice assistants

Unified architecture:

```text
Voice
↓
Intent Recognition
↓
Command Router
↓
Feature Module
```

Example:

```text
"Open Notes"
↓
Voice Service
↓
Command Router
↓
Notes Feature
```

Voice should never directly manipulate UI internals.

---

# Floating Master App Architecture

The app acts as:

```text
Master Control Layer
```

Example:

User starts:

```text
Screen Sharing
```

Floating controls remain available.

Example:

```text
Floating Icon
↓
Quick Actions
↓
Pause Sharing
Stop Sharing
Voice Toggle
Nearby Devices
Reconnect
```

This should work without breaking current flow.

---

# Tree Navigation Architecture

Never use confusing nested settings.

Instead:

Example:

```text
Share Screen
│
├── Same Network
│   ├── Turn On WiFi
│   ├── Nearby Devices
│   ├── Device List
│   ├── Resolution
│   ├── Bitrate
│   └── Start Sharing
│
├── Scanner
│   └── Auto Connect
│
└── Open Nearby Devices
```

User should navigate naturally.

---

# Smart Gallery Architecture (Future)

Gallery should support relationships.

Example:

```text
Goa Trip
│
├── Friends
├── Beach
├── Hotel
└── Food
```

Connected by:

```text
Location
Face
Time
Tags
Relations
Events
```

---

# Code Writing Rules

Every file should be:

```text
Under 300–400 lines
```

Avoid:

```text
God files
Huge components
Huge services
```

Split aggressively.

---

## Component Rules

One component:

```text
One responsibility
```

Bad:

```text
HomeScreen
contains:
UI
network
storage
logic
navigation
```

Good:

```text
HomeScreen
ClockWidget
ComingSoonText
HomeHook
```

---

## Service Rules

Services:

```text
No UI logic
```

Only:

```text
Business logic
```

---

## Hooks Rules

Hooks:

```text
Feature-specific logic only
```

---

## Shared Components

Only reusable UI:

```text
Button
Card
Modal
Loader
```

No business logic.

---

# Documentation Rule

Every major change must update:

```text
docs/
```

Always maintain:

```text
Architecture
Feature flow
API contract
Reason for decisions
```

---

# Immediate Task for Codex

Build:

```text
Android Phase 1 Home Screen
```

Requirements:

### Top Left

Realtime:

```text
Current Date + Time
```

### Center

Display:

```text
Coming Soon Apps
```

Must use:

```text
Modular structure
Feature-first architecture
Scalable folder setup
Reusable components
AI-friendly structure
```

No shortcuts.

Code must be:

```text
Production scalable
But beginner friendly
```
# Master Android App – Phase 2 Planning

## Smart Productivity Ecosystem

# Phase 2 Goal

Build the first **functional productivity system** around:

```text id="zsl9n0"
Notes
Reminders
Todo
Tasks
Calendar
Alarm/Clock
```

while preserving:

```text id="x7x9jq"
Modularity
Loose coupling
Offline-first
AI-friendly architecture
Low-context debugging
```

Every feature should work independently.

But also connect intelligently.

---

# Core Philosophy

Instead of:

```text id="l6dx7o"
Separate Apps
```

build:

```text id="u56l7p"
Connected Productivity Ecosystem
```

Example:

A note can contain:

```text id="z1l8b7"
Tasks
Reminders
Files
Location
Calendar events
Voice note
Images
Alarms
```

without tightly coupling systems.

---

# Module Map

## Notes Module

Primary role:

```text id="e5m74w"
Knowledge Storage
```

Stores:

* Notes
* Ideas
* Meeting logs
* Files
* Voice notes
* Images
* Links
* Attachments
* Checkpoints

---

## Reminder Module

Primary role:

```text id="l52mk7"
Action Reminder Engine
```

Purpose:

```text id="rywb26"
Remind user at correct time
```

Supports:

* One-time reminder
* Repeating reminder
* Smart recurring reminder
* Location-based reminder
* Time-based reminder

---

## Todo Module

Primary role:

```text id="5nd7jb"
Action Tracking
```

Purpose:

```text id="k1zht2"
Track completion
```

Example:

```text id="o0h8vo"
Buy vegetables
Complete project
Pay bill
```

Status:

```text id="9mjlwm"
Pending
In Progress
Done
Cancelled
Skipped
```

---

## Task Module

Primary role:

```text id="rv3v2k"
Complex Workflows
```

Example:

```text id="j0t9j2"
Create Ticket App
│
├── UI
├── Backend
├── Testing
└── Deployment
```

Tasks can contain:

```text id="5d6k6k"
Subtasks
Deadline
Reminder
Notes
Dependencies
```

---

## Calendar Module

Primary role:

```text id="bxz5yk"
Timeline Visualization
```

Purpose:

Show:

```text id="f4p4yv"
Events
Reminders
Tasks
Meetings
Deadlines
```

in:

```text id="6f2ew4"
Day
Week
Month
Timeline
Agenda
```

---

## Alarm / Clock Module

Primary role:

```text id="24w0vi"
Time Trigger Engine
```

Purpose:

```text id="sv56n8"
Execute reminders
Wake alarms
Background notifications
```

Should support:

```text id="yqj4jk"
One time
Daily
Weekly
Monthly
Yearly
Custom repeat
```

---

# Floating Notes System

Instead of opening notes full-screen always:

Use:

```text id="y9vpff"
Floating Notes Icon
```

Example flow:

```text id="3g7m4j"
Master App
↓
Floating Notes Icon
↓
Tap
↓
Mini Notes View
↓
Expand if required
```

Should support:

```text id="5w4if5"
Quick note
Quick checklist
Quick reminder
Quick voice note
```

without leaving workflow.

---

# Notes UI System

## Notes List Screen

Should show:

```text id="2i2v6m"
Color matched notes
Recent notes
Pinned notes
Tags
Reminder indicator
Attachment indicator
```

Example:

```text id="6qk6jv"
Blue → Work
Green → Health
Yellow → Personal
Red → Important
```

AI suggestion:

Use:

```text id="3p4w0x"
Auto Color Grouping
```

based on category.

---

# Notes Editor

Should support:

## Rich Content

```text id="1qrvx9"
Text
Markdown
Checklist
Image
Video
Voice note
Files
Links
Drawing
```

---

## Metadata

Show:

```text id="t1a6ul"
Created time
Edited time
Last opened
Reminder linked
Location linked
```

Example:

```text id="2xkz2q"
Created:
Monday 9:15 AM

Updated:
Friday 2:30 PM
```

---

# Git-like Checkpoints

Very important.

Every note should support:

```text id="m8xphn"
History Timeline
```

Example:

```text id="m2n5v7"
Checkpoint 1
Created

Checkpoint 2
Edited task list

Checkpoint 3
Added reminder

Checkpoint 4
Added file
```

Like mini Git.

Purpose:

```text id="d5j7vk"
Undo
Restore
History
Track changes
```

Future:

```text id="lg4pl2"
Compare versions
```

---

# Reminder System

Reminders should support:

## Time-Based

Example:

```text id="k3gk2k"
Tomorrow 8 AM
```

---

## Date-Time Based

Example:

```text id="w3i9wi"
June 12
4:30 PM
```

---

## Recurring Pattern

Example:

```text id="2q1nlv"
Every Monday morning
Every Friday afternoon
Every 2 weeks
Every month
```

---

## Smart Custom Reminder

Example:

```text id="jlwm1f"
Text Tiffin Man
```

Schedule:

```text id="bnjlwm"
Monday Morning
Friday Afternoon
```

Message:

```text id="3vplk2"
Pause tiffin service until update
```

System:

```text id="98v9y9"
Reminder fires
↓
Quick Action
↓
Open WhatsApp/SMS
```

Future:

```text id="2h8z8r"
Auto-send (optional)
```

---

## Location Reminder

Example:

```text id="v9jmjlwm"
Remind me to buy milk
When near D-Mart
```

Supports:

```text id="jlwm8m"
GPS location
Radius trigger
Place name
```

---

# Todo System

Todo should support:

```text id="jlwm8n"
Priority
Deadline
Reminder
Repeat
Tags
Category
Linked note
Linked task
```

Example:

```text id="jlwm8o"
Finish Ticket App

Priority:
High

Reminder:
Tomorrow 10 AM

Linked:
Spring Boot Note
```

---

# Calendar Connections

Calendar should show:

```text id="jlwm8p"
Task deadlines
Reminders
Meetings
Alarms
Birthdays
Events
```

Example:

```text id="jlwm8q"
Friday
2 PM
Text Tiffin Man
```

---

# Feature Relationship Map

```text id="jlwm8r"
Notes
│
├── Reminder
│   ├── Time
│   ├── Repeat
│   └── Location
│
├── Todo
│   ├── Deadline
│   ├── Priority
│   └── Status
│
├── Attachments
│   ├── Image
│   ├── Voice
│   ├── File
│   └── Video
│
├── Calendar
│
└── Alarm
```

---

# System Map

```text id="jlwm8s"
Master App
│
├── Floating Notes
│
├── Notes
│   ├── Editor
│   ├── History
│   ├── Reminder
│   ├── Files
│   └── Location
│
├── Todo
│
├── Reminder Engine
│
├── Calendar
│
├── Alarm Engine
│
└── Notification Engine
```

---

# Suggested Phase 2 Scope

Do NOT build everything at once.

Build in this order:

```text id="jlwm8t"
1. Floating Notes Icon
2. Notes List
3. Create/Edit Note
4. Markdown Save
5. Created/Edited timestamps
6. Note history checkpoints
7. Reminder engine
8. Repeat patterns
9. Todo linking
10. Calendar linking
11. Location reminders
```

Goal:

```text id="jlwm8u"
Strong scalable foundation
Without overengineering
```
# Context 2 – Smart Productivity Ecosystem (Phase 2)

> Follow all global engineering rules, coding standards, architecture principles, modularity requirements, low-context AI rules, folder structure, and development philosophy from:

```text
context1.md
```

Do not rewrite or duplicate those instructions.

This document only defines:

```text
Phase 2 Modules
Feature Relationships
Implementation Order
Scope Boundaries
Dependencies
```

---

# Phase 2 Objective

Build the first **functional productivity ecosystem** around:

```text
Notes
Reminder
Todo
Task
Calendar
Alarm / Clock
```

The objective is:

```text
Connected Productivity System
```

instead of separate disconnected tools.

Every feature must still remain:

```text
Independent
Loosely coupled
Replaceable
Disable-able
Scalable
```

---

# High-Level Architecture

Instead of:

```text
Notes App
Reminder App
Todo App
```

as isolated systems,

build:

```text
Connected Productivity Graph
```

Example:

```text
Note
↔ Reminder
↔ Todo
↔ Calendar
↔ Alarm
↔ Location
↔ Attachments
```

while preserving module independence.

Modules communicate only through:

```text
Contracts
Events
Interfaces
Services
```

Never direct feature internals.

---

# Development Strategy

Build in:

```text
Vertical Slice Architecture
```

Meaning:

Complete one module foundation at a time.

Bad:

```text
Build everything partially
```

Good:

```text
Finish one scalable module
↓
Stabilize
↓
Build next module
```

---

# Phase 2 Roadmap

Implementation order:

```text
Phase 2.1 → Floating Notes Entry
Phase 2.2 → Notes List
Phase 2.3 → Note Editor
Phase 2.4 → Markdown Storage
Phase 2.5 → Metadata System
Phase 2.6 → Note History (Git-like checkpoints)
Phase 2.7 → Reminder Engine
Phase 2.8 → Repeat Rules
Phase 2.9 → Todo Module
Phase 2.10 → Calendar Integration
Phase 2.11 → Alarm Engine
Phase 2.12 → Location Reminders
Phase 2.13 → Attachments
```

---

# Phase 2.1 — Floating Notes Entry

Goal:

Create a floating notes launcher.

Purpose:

Allow user to quickly access notes without leaving workflow.

Example:

```text
Floating Notes Icon
↓
Tap
↓
Mini Notes Window
↓
Expand Full Screen
```

Scope:

Build only:

```text
Floating icon
Open notes screen
Close notes screen
Expand action
```

Do NOT build:

```text
Reminder
Todo
Files
Voice Notes
```

yet.

Dependencies:

```text
None
```

Independent module.

---

# Phase 2.2 — Notes List Module

Goal:

Display list of notes.

Features:

```text
List Notes
Search Notes
Pinned Notes
Recent Notes
Category Colors
Empty State
```

Each note card should show:

```text
Title
Short preview
Created time
Updated time
Reminder icon
Attachment icon
Category color
```

Example colors:

```text
Blue → Work
Green → Health
Yellow → Personal
Red → Important
```

Do NOT build:

```text
Editor
Reminder linking
Attachments
```

yet.

Dependencies:

```text
Markdown storage
Metadata storage
```

---

# Phase 2.3 — Note Editor

Goal:

Build note editor.

Supports:

```text
Text
Markdown
Checklist
Basic formatting
```

Display:

```text
Created timestamp
Updated timestamp
Last opened timestamp
```

Editor should auto-save.

Do NOT build:

```text
Reminder linking
Location
Voice note
Images
```

yet.

Dependencies:

```text
Notes list
Storage layer
```

---

# Phase 2.4 — Markdown Storage

Goal:

Store notes locally.

Architecture:

```text
Markdown = Source of Truth
```

Storage:

```text
notes/
note_id.md
```

Purpose:

```text
AI readable
Human readable
Easy sync later
Easy backup
```

SQLite should store only:

```text
Metadata
```

Example:

```text
id
title
filePath
createdAt
updatedAt
category
syncStatus
```

No large content inside DB.

Dependencies:

```text
None
```

---

# Phase 2.5 — Metadata System

Goal:

Track note state.

Add:

```text
Created time
Updated time
Last opened
Pinned
Category
Reminder linked
Has attachment
```

Shown in UI.

Purpose:

Improve search/filtering later.

Dependencies:

```text
Markdown storage
SQLite metadata
```

---

# Phase 2.6 — Git-like Note Checkpoints

Goal:

Create note history.

Every meaningful change creates:

```text
Checkpoint
```

Example:

```text
Created note

Added checklist

Updated reminder

Added file
```

Supports:

```text
Restore
Undo
History timeline
Version tracking
```

Future:

```text
Version compare
```

Dependencies:

```text
Notes Editor
Markdown Storage
```

---

# Phase 2.7 — Reminder Engine

Goal:

Create reminder system.

Supports:

```text
One time reminder
Scheduled reminder
Linked reminder
```

Reminder may connect to:

```text
Notes
Todo
Task
Calendar
```

Example:

```text
Meeting Notes
↓
Reminder attached
↓
Tomorrow 8 AM
```

Dependencies:

```text
Alarm engine
Notification system
```

---

# Phase 2.8 — Repeat Rules Engine

Goal:

Support intelligent recurring reminders.

Examples:

```text
Every Monday morning

Every Friday afternoon

Every 2 weeks

Every month

Custom pattern
```

Example use case:

```text
Text Tiffin Man

Repeat:
Monday Morning
Friday Afternoon
```

Reminder action:

```text
Open WhatsApp
Show message template
```

Future:

```text
Auto-send
```

Dependencies:

```text
Reminder engine
Clock system
```

---

# Phase 2.9 — Todo Module

Goal:

Track action completion.

Supports:

```text
Priority
Status
Deadline
Reminder
Category
Tags
```

Status:

```text
Pending
In Progress
Done
Cancelled
Skipped
```

Todo can link to:

```text
Note
Reminder
Task
Calendar
```

Dependencies:

```text
Reminder system
```

---

# Phase 2.10 — Calendar Integration

Goal:

Timeline visualization.

Show:

```text
Reminder
Task
Todo
Meetings
Events
Alarm
```

Views:

```text
Day
Week
Month
Agenda
Timeline
```

Dependencies:

```text
Reminder
Todo
Alarm
```

---

# Phase 2.11 — Alarm Engine

Goal:

Background trigger engine.

Supports:

```text
One time
Daily
Weekly
Monthly
Custom repeat
```

Responsible for:

```text
Wake reminder
Trigger notification
Execute schedules
```

Dependencies:

```text
Reminder system
```

---

# Phase 2.12 — Location Reminder

Goal:

Reminder based on place.

Example:

```text
Buy milk
When near D-Mart
```

Supports:

```text
GPS
Radius
Named location
Map selection
```

Dependencies:

```text
Reminder engine
Location service
```

---

# Phase 2.13 — Attachments

Goal:

Allow notes to contain:

```text
Images
Voice notes
Videos
Files
Links
Drawings
```

Dependencies:

```text
Notes editor
Markdown storage
```

---

# Relationship Map

```text
Notes
│
├── Reminder
│   ├── Repeat
│   ├── Alarm
│   └── Location
│
├── Todo
│
├── Calendar
│
├── Checkpoints
│
└── Attachments
```

---

# Current Coding Scope

Only work on:

```text
Phase 2.1
```

until complete.

Do not skip ahead.

Do not partially build future modules.

Build:

```text
Stable foundation first
```
# Master Android App – Codex / VS Code Development Context

# Project Identity

Project Name:

```text
Master Android App
```

Current Development Phase:

```text
Android Phase 1
```

Development Environment:

```text
VS Code
+
Codex / AI Assisted Development
```

Current Goal:

Build a scalable, modular, Android-first productivity ecosystem application using:

```text
React Native
```

with long-term support for:

```text
Windows
Linux
```

The system should be built from day one with:

```text
Scalable Architecture
Loose Coupling
SOLID Principles
Offline First Design
Plugin-like Modules
AI Friendly Development
Minimal Refactoring
Low-end Device Optimization
```

---

# Critical Development Philosophy

This project is intentionally designed for:

```text
Low Context AI Development
```

Meaning:

AI should be able to understand, debug, or add any feature using only:

```text
5–10 files maximum
```

without loading the full project.

This is a strict architectural requirement.

Bad architecture:

```text
Feature change
→ Requires 50 files
```

Good architecture:

```text
Feature change
→ Only 5–10 related files
```

Every design decision must support:

```text
Minimal Context
Minimal Refactoring
Maximum Isolation
```

---

# Golden Rules for Writing Code

## Rule 1 — Never Write Tightly Coupled Code

Bad:

```text
Todo feature directly importing Notes internals
```

Good:

```text
Todo uses Notes Contract/API
```

Communication between features must happen through:

```text
Interfaces
Contracts
Events
Hooks
Services
```

Never direct internal access.

---

## Rule 2 — Every Feature Must Be Independent

Each feature behaves like:

```text
Mini Application
Inside Master App
```

Meaning:

Feature can be:

```text
Added
Removed
Disabled
Extended
```

without breaking unrelated features.

Example:

Removing:

```text
screen-share
```

must NOT break:

```text
notes
todo
settings
gallery
voice assistant
```

---

## Rule 3 — High Cohesion

Each module should do:

```text
One thing only
```

Bad:

```text
SyncService

handles:
database
network
notifications
screen share
voice
```

Good:

```text
SyncService → sync only

NotificationService → notifications only

StorageService → storage only

VoiceService → voice only
```

---

## Rule 4 — Minimal File Changes

Adding a feature should modify:

```text
Minimal files only
```

Example:

Adding:

```text
Voice Notes
```

should ideally touch only:

```text
voice-notes/
voice-service/
voice-ui/
voice-docs/
```

Avoid system-wide refactoring.

---

## Rule 5 — AI Readability First

Code should be optimized for:

```text
Human readability
+
AI readability
```

Avoid:

```text
Huge files
Complex abstractions
Deep nesting
Magic code
```

Prefer:

```text
Small files
Clear naming
Feature isolation
Predictable patterns
```

---

# Current Tech Stack

## Frontend

Recommended:

React Native

Reason:

```text
Android-first
Future desktop support possible
Good ecosystem
Fast iteration
```

---

## Native Android Layer

Recommended:

Kotlin

Used only when required.

Examples:

```text
Nearby devices
Permissions
Floating overlay
Background services
Screen capture
Voice APIs
Hardware access
```

React Native should call native modules only when necessary.

---

## State Management

Recommended:

```text
Zustand
```

Reason:

```text
Lightweight
Low boilerplate
Easy to understand
Scalable
AI friendly
```

Avoid:

```text
Redux initially
```

Too much complexity.

---

## Local Storage

Recommended:

```text
react-native-mmkv
```

Reason:

```text
Very fast
Low RAM
Persistent
Lightweight
```

For:

```text
Settings
Cache
App state
Session state
```

---

## Structured Data Storage

Recommended:

SQLite

For:

```text
Todo
Metadata
Gallery relations
Sync history
Task storage
```

---

## Notes Storage

Recommended:

```text
Markdown (.md)
```

Reason:

```text
Human readable
AI readable
Tiny size
Easy backup
Future sync friendly
```

---

## Date Handling

Recommended:

```text
dayjs
```

---

## Navigation

Recommended:

```text
React Navigation
```

Must follow:

```text
Tree Based Navigation
```

not deep menus.

---

# Required Folder Structure

Project must follow:

```text
src/
│
├── app/
│
├── core/
│   ├── contracts/
│   ├── events/
│   ├── services/
│   ├── types/
│   └── constants/
│
├── features/
│
│   ├── home/
│   │   ├── ui/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   ├── contracts/
│   │   └── docs/
│
│   ├── notes/
│   ├── todo/
│   ├── gallery/
│   ├── voice/
│   ├── screen-share/
│   ├── sync/
│   └── settings/
│
├── navigation/
│
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── theme/
│
├── storage/
│
├── assets/
│
└── docs/
```

---

# Feature Folder Standard

Every feature MUST contain:

```text
feature-name/
│
├── ui/
├── hooks/
├── services/
├── store/
├── contracts/
├── docs/
├── tests/
└── index.ts
```

Mandatory documentation:

```text
README.md
architecture.md
api_contract.md
todo.md
```

Purpose:

AI should understand feature independently.

---

# Phase 1 Scope (STRICT)

DO NOT BUILD EVERYTHING.

Phase 1 goal:

```text
Strong Foundation Only
```

Build only:

## First Screen

### Top Left

Show:

```text
Current Date & Time
```

Realtime.

Updates automatically.

---

### Center

Show:

```text
Coming Soon Apps
```

No advanced logic.

No backend.

No authentication.

No sync.

No networking.

No database logic yet.

Purpose:

```text
Validate architecture
Validate modular design
Setup coding standards
```

---

# Home Screen Module Rules

Create feature:

```text
features/home/
```

Must contain:

```text
screen
components
hooks
service
docs
```

Even if logic is simple.

Reason:

Future scalability.

---

# Voice Assistant Architecture (Future)

Master app should support:

### Android

* Gemini
* Google Assistant

### Windows

* Cortana-like workflows
* Windows voice APIs

### Linux

* Open-source voice assistants

Unified architecture:

```text
Voice
↓
Intent Recognition
↓
Command Router
↓
Feature Module
```

Example:

```text
"Open Notes"
↓
Voice Service
↓
Command Router
↓
Notes Feature
```

Voice should never directly manipulate UI internals.

---

# Floating Master App Architecture

The app acts as:

```text
Master Control Layer
```

Example:

User starts:

```text
Screen Sharing
```

Floating controls remain available.

Example:

```text
Floating Icon
↓
Quick Actions
↓
Pause Sharing
Stop Sharing
Voice Toggle
Nearby Devices
Reconnect
```

This should work without breaking current flow.

---

# Tree Navigation Architecture

Never use confusing nested settings.

Instead:

Example:

```text
Share Screen
│
├── Same Network
│   ├── Turn On WiFi
│   ├── Nearby Devices
│   ├── Device List
│   ├── Resolution
│   ├── Bitrate
│   └── Start Sharing
│
├── Scanner
│   └── Auto Connect
│
└── Open Nearby Devices
```

User should navigate naturally.

---

# Smart Gallery Architecture (Future)

Gallery should support relationships.

Example:

```text
Goa Trip
│
├── Friends
├── Beach
├── Hotel
└── Food
```

Connected by:

```text
Location
Face
Time
Tags
Relations
Events
```

---

# Code Writing Rules

Every file should be:

```text
Under 300–400 lines
```

Avoid:

```text
God files
Huge components
Huge services
```

Split aggressively.

---

## Component Rules

One component:

```text
One responsibility
```

Bad:

```text
HomeScreen
contains:
UI
network
storage
logic
navigation
```

Good:

```text
HomeScreen
ClockWidget
ComingSoonText
HomeHook
```

---

## Service Rules

Services:

```text
No UI logic
```

Only:

```text
Business logic
```

---

## Hooks Rules

Hooks:

```text
Feature-specific logic only
```

---

## Shared Components

Only reusable UI:

```text
Button
Card
Modal
Loader
```

No business logic.

---

# Documentation Rule

Every major change must update:

```text
docs/
```

Always maintain:

```text
Architecture
Feature flow
API contract
Reason for decisions
```

---

# Immediate Task for Codex

Build:

```text
Android Phase 1 Home Screen
```

Requirements:

### Top Left

Realtime:

```text
Current Date + Time
```

### Center

Display:

```text
Coming Soon Apps
```

Must use:

```text
Modular structure
Feature-first architecture
Scalable folder setup
Reusable components
AI-friendly structure
```

No shortcuts.

Code must be:

```text
Production scalable
But beginner friendly
```
# Recommended Technology Stack – Master Productivity Ecosystem

# Engineering Priorities

The system should prioritize:

1. Low RAM usage
2. Low storage size
3. Fast startup speed
4. Low CPU usage
5. Offline-first functionality
6. Modular architecture
7. Low-end device compatibility
8. Cross-platform support
9. AI-friendly development
10. Minimal maintenance cost

Target devices:

```text
Low-end Android phones
4GB RAM laptops
Older Windows machines
Low-end Linux systems
```

---

# Recommended Architecture

Recommended architecture:

```text
Modular Monolith First
→ Microservices Later
```

Do NOT start with full microservices.

Reason:

Microservices early = complexity + debugging problems.

Instead:

```text
Independent Modules
Inside One App
```

Later split services if required.

Example:

```text
notes/
todo/
screen_share/
gallery/
voice_assistant/
sync_engine/
file_transfer/
```

Each module independent.

---

# Frontend Technology

## Recommended:

Flutter

Why Flutter?

### Advantages

```text
Single codebase
Android support
Windows support
Linux support
Fast UI
Good performance
Native compilation
```

Unlike Electron:

```text
Electron:
500MB+ RAM

Flutter:
Much lower memory
```

Flutter compiles to native binaries.

Good for:

```text
Low-end devices
Offline apps
Animations
Floating windows
Cross-platform UI
```

Recommended architecture:

```text
Flutter Frontend
+
Native Platform Services
```

---

# Why Not React Native?

Bad for your case:

```text
Desktop support weaker
Higher maintenance
Bridge overhead
```

---

# Why Not Electron?

Bad for low-end systems:

```text
High RAM
Heavy CPU
Large storage usage
```

Not suitable.

---

# Backend / Logic Layer

## Recommended:

Rust

for:

```text
Screen sharing
Sync engine
Compression
Streaming
Performance-critical systems
```

Why?

```text
Very fast
Very low RAM
Safe memory management
Small binaries
High performance
```

Rust is ideal for:

```text
LAN communication
P2P networking
Streaming
Screen mirroring
Compression
Encryption
```

---

## Secondary Language

### Recommended:

Kotlin

For Android native features:

```text
Nearby devices
Permissions
Background services
Accessibility
Voice APIs
Floating overlays
```

---

## Linux Native Utilities

Use:

```text
Rust
+
Shell integration
```

Avoid Java-heavy desktop apps.

---

# Communication Layer

## Same Network Communication

Recommended:

### mDNS / Zeroconf

For auto device discovery.

Example:

```text
Open App
↓
Nearby devices auto found
```

No IP entering.

No manual setup.

---

## Real-Time Communication

Recommended:

WebRTC

For:

```text
Screen share
Voice streaming
Remote control
Low latency transfer
```

Why?

```text
Free
P2P
Encrypted
Fast
Low latency
```

Same WiFi:

Very efficient.

Internet:

Possible later.

---

## Internal Communication

Recommended:

```text
Event-driven architecture
```

Example:

```text
ScreenShareStarted
FileTransferStarted
WifiEnabled
DeviceConnected
```

Instead of tightly coupled code.

---

# Database Strategy

## Local Database

### Recommended:

SQLite

Why?

```text
Tiny size
Very fast
No installation
Offline
Stable
```

Best for:

```text
Todo
Notes
Metadata
Gallery relations
History
```

---

## Cache Storage

Use:

```text
JSON
Markdown
Flat files
```

for lightweight storage.

Example:

```text
notes/
meeting.md
ideas.md
```

Reason:

AI-friendly.

You can directly give files to AI.

---

# Notes System

Recommended format:

```text
Markdown (.md)
```

Why?

```text
Human readable
AI readable
Version friendly
Portable
Tiny storage
```

Very important for your architecture.

---

# Synchronization Engine

Recommended strategy:

```text
CRDT-inspired sync
```

(Simple version initially)

Why?

Avoid conflicts.

Example:

```text
Phone updated note
Laptop updated note

Merge safely
```

instead of overwrite.

---

# File Sharing

Recommended:

```text
Direct LAN transfer
```

Protocol:

```text
HTTP
+
Chunk streaming
```

Why?

```text
Simple
Fast
Reliable
Resume transfer
```

---

# Screen Sharing

Recommended stack:

```text
Android MediaProjection API
+
WebRTC
+
Rust Streaming Engine
```

Why?

Low latency.

Lower CPU.

Better quality.

---

# Voice Assistant System

Recommended approach:

### Hybrid Voice Model

Layer 1:

Use system assistant.

Android:

* Gemini
* Google Assistant

Windows:

Native voice APIs

Linux:

Open-source voice engines

Layer 2:

Custom command parser.

Example:

```text
"Share my screen"

→ detect intent

→ open screen module
```

Future:

Offline voice.

Recommended:

Vosk

Why?

```text
Offline
Open source
Low RAM
Works on low-end systems
```

---

# Image / Face Recognition

Recommended:

OpenCV

For:

```text
Face detection
Image relation
Grouping
Similarity
```

Lightweight enough.

---

# Encryption & Security

Recommended:

libsodium

Why?

```text
Fast
Secure
Simple API
Low CPU
```

For:

```text
Device pairing
Encrypted sync
Secure file transfer
```

---

# App Updates

Recommended:

```text
Plugin architecture
```

Each feature installable.

Example:

```text
notes_plugin
gallery_plugin
screen_share_plugin
```

Enable/disable independently.

---

# Documentation System

Recommended:

```text
Markdown (.md)
```

Folder example:

```text
docs/

vision/
architecture/
api_contracts/
features/
bugs/
research/
roadmap/
```

AI can read directly.

---

# DevOps / Deployment

### Development

Use:

* Git
* GitHub

---

### Containerization (Later)

Use:

Docker

Only later.

Not phase 1.

---

# Final Recommended Stack

## UI Layer

```text
Flutter
```

---

## High Performance Core

```text
Rust
```

---

## Android Native Features

```text
Kotlin
```

---

## Database

```text
SQLite
```

---

## Sync

```text
P2P + LAN + CRDT-like sync
```

---

## Screen Sharing

```text
WebRTC
```

---

## Voice

```text
Gemini + Vosk
```

---

## File Transfer

```text
HTTP Chunk Streaming
```

---

## Gallery Intelligence

```text
OpenCV
```

---

## Security

```text
libsodium
```

---

## Documentation

```text
Markdown
```

---

## Development Style

```text
Feature-first
Modular
Independent modules
AI-friendly boundaries
Low-context debugging
SOLID principles
```

---

# Resource Optimization Goal

Target:

### Android App Size

```text
Below 80–120 MB
```

### Idle RAM

```text
100–250 MB
```

### Startup Time

```text
Below 2 seconds
```

### CPU Usage

```text
Near idle when inactive
```

### Offline Capability

```text
100%
```

No internet dependency.
# Multi-Platform Productivity & Synchronization Application – Android Phase 1 Vision

# Phase 1 Objective

The first phase of development will focus exclusively on:

```text
Android Application
```

The objective is **not to build every feature immediately**, but to establish a **strong, scalable, modular foundation** that can later expand to:

* Windows
* Linux
* Web (optional)
* Cross-device synchronization

Phase 1 must be designed in a way where future desktop support can be added **without major rewrites**.

The Android application will serve as:

```text
Foundation Architecture
+
UI/UX System
+
Plugin Ecosystem Base
+
Synchronization Base
+
Voice Command Base
+
Development Standards
```

for the entire ecosystem.

---

# Core Goal of Phase 1

Create a lightweight Android application that:

* Works smoothly on low-end devices
* Uses minimal RAM
* Uses minimal storage
* Remains fast and responsive
* Is modular and scalable
* Supports future plugins/modules
* Can evolve without breaking existing features
* Is AI-friendly for future development

The system must be built for:

```text
Low-End Device First
```

rather than flagship phones.

Target baseline:

```text
Android 8+
3GB–4GB RAM devices
Budget phones
```

---

# Phase 1 – Initial UI

The first Android application screen should remain intentionally simple.

### Top Left Corner

Display:

```text
Current Date & Time
```

This establishes:

* Realtime updates
* System state management
* Time synchronization structure

---

### Center Screen

Display:

```text
Coming Soon Apps
```

This becomes the placeholder for future modules.

Purpose:

* Test rendering
* Setup architecture
* Validate modular design
* Establish navigation system

No complex business logic initially.

---

# Android-First Architecture

The application should follow:

```text
Feature First
+
Modular Architecture
+
Clean Architecture
+
Offline First
```

Every feature should remain independent.

Example:

```text
screen_share/
todo/
notes/
gallery/
voice_assistant/
sync_engine/
settings/
```

Each feature must contain:

```text
ui/
service/
model/
repository/
contracts/
events/
docs/
tests/
```

Reason:

Future changes should affect only:

```text
Minimal Files
```

instead of entire application refactoring.

---

# App Inside App Architecture

The system should behave like:

```text
Master Application
```

that can launch internal mini-applications.

Example:

```text
Master App
│
├── Screen Share
├── Todo
├── Notes
├── Gallery
├── Voice Assistant
├── Device Manager
├── File Sharing
└── Settings
```

Every internal application should function like:

```text
Independent App
Inside Main App
```

meaning:

### Can Be Added

```text
Install Notes Module
```

### Can Be Removed

```text
Remove Screen Share Module
```

### Can Be Disabled

```text
Turn Off Gallery Module
```

without affecting:

```text
Todo
Notes
Settings
Voice Commands
```

This creates:

```text
Plugin Architecture
```

for future scalability.

---

# Master Floating Interface System

The master app should support:

```text
Floating Interaction Layer
```

This means:

Even while using another feature:

Example:

```text
Screen Sharing Active
```

the user can still access:

```text
Master Controls
```

through floating actions.

Example workflow:

```text
Open Master App
↓
Open Screen Sharing
↓
Screen starts mirroring
↓
Floating Master Controls visible
↓
Open quick controls
↓
Return to screen sharing
```

Floating components should support:

```text
Quick Notes
Voice Commands
Clipboard
Nearby Devices
Transfer Status
Screen Sharing Controls
```

without interrupting user flow.

---

# Voice Command Ecosystem

The master application should support:

```text
Cross-Platform Voice Commands
```

The app must integrate with native assistants.

---

## Android Voice Layer

Support:

* Google Assistant
* Gemini voice commands

Example:

```text
"Open notes"

"Share my screen"

"Start file transfer"

"Create reminder at 6 PM"

"Open nearby devices"
```

---

## Windows Voice Layer (Future)

Support:

Windows voice assistant APIs.

Example:

```text
"Mirror screen to desktop"

"Sync notes"

"Open device manager"
```

---

## Linux Voice Layer (Future)

Support:

Open-source Linux voice engines.

---

## Unified Voice Command System

The architecture should work as:

```text
Voice
↓
Intent Detection
↓
Command Router
↓
Module Execution
```

Example:

```text
"Share Screen"
↓
Screen Module Opens
↓
Tree Navigation Starts
```

The same command system should work:

```text
Android
Windows
Linux
```

using a common abstraction layer.

---

# Tree-Based UI / UX Navigation System

The entire application should use:

```text
Tree Navigation Architecture
```

instead of traditional deep menus.

Reason:

Users become less confused.

The app becomes:

```text
Guided
Visual
Easy To Learn
```

The system should guide users step-by-step.

---

# Example – Screen Sharing Flow

Instead of many settings pages:

Use:

```text
Share Screen
│
├── Same Network
│   ├── Turn On WiFi
│   ├── Enable Nearby Devices
│   ├── Scan Devices
│   ├── Show Available Devices
│   ├── Select Device
│   ├── Resolution
│   ├── Bitrate
│   ├── Voice Quality
│   └── Start Sharing
│
├── Scan Device
│   ├── QR Scanner
│   ├── Auto Connect
│   ├── Resolution
│   ├── Bitrate
│   └── Voice Quality
│
└── Open Nearby Devices
    ├── Available Devices
    └── Connect
```

User flow:

```text
Share Screen
→ Same Network
→ Turn On WiFi
→ Nearby Devices
→ Device Found
→ Select Resolution
→ Start Sharing
```

---

# Smart Requirement Detection

The app should automatically detect missing requirements.

Example:

### WiFi OFF

System:

```text
WiFi Required
↓
Show Enable Option
```

### Nearby Permission Missing

System:

```text
Nearby Permission Missing
↓
Request Permission
```

### Device Not Found

System:

```text
Retry Scan
```

The user should never feel lost.

---

# Screen Sharing Status System

Once screen sharing starts:

The application should show:

```text
Sharing Active Indicator
```

Example:

Floating icon:

```text
Screen Sharing Active
```

Tapping it opens:

```text
Pause Sharing
Stop Sharing
Change Resolution
Voice Toggle
Reconnect
Nearby Devices
```

This is important because:

```text
Mirroring is active
```

and users must still access controls easily.

---

# Smart Relationship-Based Gallery

The gallery should not be folder-based only.

Instead:

Use:

```text
Relationship Tree Gallery
```

Images/videos connected by:

* Tags
* Location
* Date/time
* Faces
* People
* Events
* Similarity
* Device source
* Shared history

Example:

```text
Goa Trip
│
├── Friends
├── Beach Photos
├── Hotel
├── Videos
└── Food
```

or:

```text
John
│
├── Photos
├── Shared Files
└── Events
```

Gallery should support:

```text
Timeline View
Map View
Face View
Relationship View
Tree View
Smart Search
```

---

# Phase 1 Technology Stack (Android Only)

## UI Layer

Recommended:

Flutter

Reason:

```text
Fast UI
Future Windows support
Future Linux support
Single codebase
Good performance
```

---

## Android Native Features

Recommended:

Kotlin

for:

```text
Permissions
Floating windows
Nearby devices
Voice APIs
Background services
Screen sharing APIs
```

Flutter should call native Android services when required.

---

## Local Storage

Recommended:

SQLite

for:

```text
Todo
Settings
Metadata
Cache
Sync states
```

---

## Notes Storage

Recommended:

```text
Markdown (.md)
```

Reason:

```text
Human readable
AI readable
Tiny storage
Easy backup
Future sync friendly
```

---

## Internal Communication

Recommended:

```text
Event Driven Architecture
```

Example:

```text
ShareStarted
WifiEnabled
DeviceConnected
VoiceCommandReceived
```

instead of tightly coupled modules.

---

## Voice Processing

Phase 1:

Use:

* Gemini
* Google Assistant

Future:

Vosk

for offline voice.

---

## Screen Sharing

Future stack:

```text
Android MediaProjection API
+
WebRTC
```

---

# Development Rule

Every feature must include:

```text
README.md
architecture.md
api_contract.md
todo.md
```

Goal:

AI should be able to understand any feature using:

```text
5–10 files only
```

without loading entire project.

---

# Long-Term Goal

Build a system where:

```text
Add feature
≠
Break system

Fix bug
≠
Modify 50 files
```

while remaining:

```text
Fast
Low RAM
Low Storage
Modular
Offline
AI-friendly
Scalable
```

from day one.
