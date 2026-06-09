# Golden Coding Rules

## Purpose

This file establishes the five core coding rules that every developer and AI contributor must follow.

These rules ensure:
- features remain independent
- code stays readable and maintainable
- the 5-10 file isolation rule is respected
- future changes don't break unrelated systems

---

## Rule 1: Never Write Tightly Coupled Code

### The Problem

Bad:
```
Todo feature directly imports and uses Notes internals
```

Result:
- changing Notes breaks Todo
- features become interdependent
- hard to remove or disable features

### The Solution

Good:
```
Todo uses Notes Contract / Public API
```

Communication between features must happen through:
- **Interfaces** (type contracts)
- **Contracts** (abstract service definitions)
- **Events** (event-driven communication)
- **Hooks** (shared custom hooks)
- **Services** (shared service layer)

**Never** direct internal access.

### Example

Bad:
```typescript
// notes/ui/NotesList.tsx
import { notesStore } from '../store/notesStore'

// todo/services/TodoService.ts
import { notesStore } from '../../notes/store/notesStore'
// directly accessing notes internals
const notesList = notesStore.getAllNotes()
```

Good:
```typescript
// core/contracts/INotesProvider.ts
export interface INotesProvider {
  getNotes(): Promise<Note[]>
}

// notes/services/NotesService.ts
export class NotesService implements INotesProvider {
  getNotes() { /* ... */ }
}

// todo/services/TodoService.ts
constructor(private notesProvider: INotesProvider) {}
getNotes() { return this.notesProvider.getNotes() }
```

---

## Rule 2: Every Feature Must Be Independent

### The Principle

Each feature behaves like:
```
Mini Application Inside Master App
```

### What This Means

A feature should be:
- **Addable** - can be installed/enabled
- **Removable** - can be uninstalled/disabled
- **Extendable** - can be enhanced without affecting others
- **Replaceable** - can be swapped with alternative implementation

### Example

Removing `screen-share` module must NOT break:
```
notes
todo
settings
gallery
voice assistant
home
calendar
```

If removing one feature breaks others, the architecture is wrong.

### Feature Isolation Checklist

✓ Feature has its own folder under `src/features/<name>/`
✓ Feature imports from only itself + shared + core
✓ Feature does NOT import from other features directly
✓ Feature exposes a public contract/service
✓ Feature can be disabled without app crash
✓ Feature has its own documentation in `src/docs/features/<name>/`

---

## Rule 3: High Cohesion - One Thing Only

### The Principle

Each module should do **one main job**.

### Bad Pattern

```
SyncService handles:
  - database operations
  - network communication
  - notifications
  - screen share setup
  - voice processing
```

Result: 2000+ line file, changes break unrelated features.

### Good Pattern

```
SyncService → sync operations only
NotificationService → notifications only
StorageService → storage operations only
VoiceService → voice processing only
ScreenShareService → screen share only
```

Result: Each file ~200-300 lines, changes are isolated.

### File Size Rule

Prefer files to be:
- Under 300-400 lines
- Single responsibility
- Easy to understand at a glance

If a file grows beyond 400 lines, split by responsibility.

### How to Achieve High Cohesion

1. **One service per domain**
2. **One component per UI concept**
3. **One utility file per utility type**
4. **One hook per feature-specific logic**

---

## Rule 4: Minimal File Changes

### The Principle

Adding a feature should modify:
```
Minimal files only
```

### Example: Adding Voice Notes

Should ideally touch only:
```
voice-notes/
  ├── ui/
  ├── services/
  ├── hooks/
  ├── store/
  ├── contracts/
  └── docs/

voice-service/
  ├── VoiceService.ts

voice-docs/
  ├── README.md
  └── architecture.md
```

**Should NOT require:**
- System-wide refactoring
- Modifying unrelated feature code
- Changing core infrastructure
- Altering other features' API contracts

### Checklist When Adding a Feature

✓ Changes are contained in new feature folder
✓ Changes in shared/core are minimal and backwards compatible
✓ No refactoring of unrelated systems
✓ Docs updated in feature folder
✓ Affected feature docs updated if integration exists
✓ No ripple effects to other modules

---

## Rule 5: AI Readability First

### The Principle

Code should be optimized for:
```
Human readability + AI readability
```

### What This Means

Code should be:
- **Clear** - easy to understand
- **Explicit** - intentions are obvious
- **Structured** - follows patterns
- **Documented** - has helpful comments where needed

### Avoid

```typescript
// Magic code - unclear intent
const x = arr.filter(a => a.p).map(a => a.v).reduce((a, c) => a + c, 0)

// Huge nested functions
async function processEverything() {
  const data = await fetch()
  const validated = validate(data)
  const transformed = transform(validated)
  const saved = await save(transformed)
  const notified = await notify(saved)
  // ... 200 more lines
}

// Hidden coupling
// File 1: modifies global state
// File 2: depends on that state
// No contract between them
```

### Prefer

```typescript
// Clear intent
const validNotes = notes
  .filter(note => note.isValid)
  .map(note => note.content)
  .reduce((sum, content) => sum + content.length, 0)

// Small, focused functions
async function saveNote(note: Note): Promise<SaveResult> {
  return await noteStorage.save(note)
}

// Explicit contracts
class TodoService {
  constructor(private reminderService: IReminderService) {}
  
  addTodo(todo: Todo) {
    this.storage.save(todo)
    // Explicit: asks reminder service for notification
    this.reminderService.scheduleIfNeeded(todo)
  }
}
```

### Naming Rules

- Use full words, not abbreviations (unless universal)
- Use domain language (don't invent new terms)
- Functions describe what they do
- Variables describe what they hold

Good:
```
getNotesByCategory()
isValidEmail()
noteCountInCategory
```

Bad:
```
gNC()
isVal()
noteCnt
```

### Comment Rules

Add comments when:
- explaining "why", not "what"
- the code is complex or non-obvious
- documenting a business rule

Avoid comments when:
- the code is self-explanatory
- the comment just repeats the code

Good:
```typescript
// Reminders are checked every 60s because syncing more often
// drains battery on low-end devices
const REMINDER_CHECK_INTERVAL = 60000
```

Bad:
```typescript
// Check reminders
checkReminders()
```

---

## Summary

| Rule | Core Idea |
|------|-----------|
| Rule 1 | No tight coupling between features |
| Rule 2 | Features are independent mini-apps |
| Rule 3 | High cohesion - one job per module |
| Rule 4 | Minimal file changes per feature |
| Rule 5 | Clear, readable, AI-friendly code |

These five rules together enable:
- Low-context development (5-10 files per change)
- Independent features
- Minimal refactoring
- Readable, maintainable code
- Easy to extend
- Easy to debug
