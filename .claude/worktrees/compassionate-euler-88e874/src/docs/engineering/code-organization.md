# Code Organization

## Folder Strategy

Use feature-first organization.

Main code areas:
- `src/app`
- `src/core`
- `src/features`
- `src/navigation`
- `src/shared`
- `src/storage`
- `src/assets`
- `src/docs`

## Feature Folder Standard

Every feature should aim to contain:
- `ui/`
- `hooks/`
- `services/`
- `store/`
- `contracts/`
- `tests/`
- `index.ts`

The code location stays under `src/features/<feature-name>/`.
The documentation location should be under `src/docs/features/<feature-name>/`.

## File Size Rule

Prefer small, focused files.

Target:
- most files should remain readable without scrolling through large unrelated logic
- if a file grows too broad, split by responsibility

Avoid:
- god files
- giant mixed components
- one file handling UI, storage, navigation, and network together

## Ownership Rules

### UI

Feature UI lives in the feature folder.
Reusable UI primitives live in `src/shared/components`.

### Business Logic

Feature services should hold feature business logic.
Shared utilities should stay generic.

### State

Feature-owned state stays inside the feature unless it becomes truly shared.

### Storage

Storage adapters live under `src/storage`.
Feature services should use storage contracts instead of embedding storage details everywhere.

## Documentation Rules

Do not keep the same explanation in:
- a root README
- a context file
- a feature README
- and a master engineering file

Instead:
- define shared rules once
- reference them from feature docs

## Legacy Docs Rule

Old docs inside `src/features/*/docs` are legacy paths.
New work should target `src/docs/features/*`.

---

# Code Writing Rules

## File Size Rule

### Target Size

Most files should be:
- **Under 300–400 lines**
- **Single responsibility**
- **Readable without scrolling**

### Why This Matters

If a file exceeds 400 lines:
- It likely has multiple responsibilities
- It's harder to understand
- Changes in one area break another
- Testing becomes difficult

**Action:** Split by responsibility.

### Examples

#### Bad: God Component
```typescript
// HomeScreen.tsx (800 lines)
export function HomeScreen() {
  // UI rendering
  // Date/time logic
  // Data fetching
  // Animation setup
  // State management
  // Navigation handling
  // Theme switching
  // ... everything
}
```

#### Good: Split Components
```typescript
// HomeScreen.tsx (150 lines)
export function HomeScreen() {
  return (
    <Container>
      <HeaderClock />
      <ComingSoonApps />
      <SettingsButton />
    </Container>
  )
}

// HeaderClock.tsx (80 lines)
export function HeaderClock() { /* just clock */ }

// ComingSoonApps.tsx (100 lines)
export function ComingSoonApps() { /* just apps list */ }
```

---

## Component Rules

### One Component = One Responsibility

**Rule:**
A component should handle exactly one UI concern.

**Bad:**
```typescript
// NotesScreen handles: list, search, filter, create, delete, sort
function NotesScreen() {
  // 500+ lines of mixed logic
}
```

**Good:**
```typescript
// NotesScreen.tsx (100 lines) - layout only
function NotesScreen() {
  return (
    <Container>
      <NotesHeader />
      <NotesList />
    </Container>
  )
}

// NotesHeader.tsx (80 lines) - search & filter only
function NotesHeader() { /* ... */ }

// NotesList.tsx (120 lines) - list display only
function NotesList() { /* ... */ }

// NoteCard.tsx (60 lines) - single note display
function NoteCard() { /* ... */ }
```

### Component Patterns

**Container Components (Smart):**
- Handle data fetching
- Manage state
- Pass props to presentational components
- Limited to 200 lines

**Presentational Components (Dumb):**
- Receive data via props
- Pure UI rendering
- No business logic
- Reusable
- Under 150 lines ideally

**Example:**
```typescript
// Container: NoteListContainer.tsx
function NoteListContainer() {
  const notes = useNotes() // fetch data
  return <NotesList notes={notes} />
}

// Presenter: NotesList.tsx
function NotesList({ notes }) {
  return notes.map(note => <NoteCard note={note} />)
}
```

---

## Service Rules

### Services Handle Business Logic Only

**What services do:**
- Business logic
- Data transformation
- API communication
- Storage operations
- No UI code whatsoever

**Structure:**
```typescript
// NoteService.ts (under 300 lines)
export class NoteService {
  constructor(
    private storage: IStorageProvider,
    private sync: ISyncProvider
  ) {}

  async createNote(content: string): Promise<Note> {
    // business logic only
  }

  async deleteNote(id: string): Promise<void> {
    // business logic only
  }
}
```

**Bad: Mixing UI and Business Logic**
```typescript
// WRONG - don't do this
export class NoteService {
  async createNote(content: string) {
    const note = await this.save(content)
    // UI code in service!
    Alert.alert('Note created')
    navigation.navigate('NoteDetail')
  }
}
```

### Service Boundaries

Services should NOT:
- Import React components
- Use navigation
- Show alerts or toasts
- Manipulate DOM/UI
- Import feature UI modules

Services should:
- Be testable without UI
- Be reusable across features
- Have clear inputs/outputs
- Expose contracts

---

## Hooks Rules

### Hooks = Feature-Specific Logic Only

**Purpose:**
- Encapsulate feature-specific React logic
- Reuse stateful logic within a feature
- Bridge components and services

**Pattern:**
```typescript
// useNotes.ts (feature hook)
export function useNotes() {
  const [notes, setNotes] = useState([])
  const noteService = useService(NoteService)

  useEffect(() => {
    noteService.getNotes().then(setNotes)
  }, [])

  return { notes }
}

// NotesList.tsx
function NotesList() {
  const { notes } = useNotes()
  return <View>{/* render notes */}</View>
}
```

**Do NOT use hooks for:**
- Shared business logic (use services instead)
- Generic utilities (put in shared hooks)
- Multiple features (extract to shared layer)

### Shared vs Feature Hooks

**Shared Hooks (src/shared/hooks/):**
```
useTheme
useNavigation
useFormatDate
useDebounce
useAsync
```
Generic, no feature knowledge.

**Feature Hooks (src/features/notes/hooks/):**
```
useNotes
useNoteEditor
useNoteSearch
useNoteTags
```
Feature-specific logic.

---

## Shared Components Rule

### What Goes in Shared Components

Reusable UI primitives with NO business logic:

```
Button
Card
Modal
Input
TextInput
Checkbox
Loader
EmptyState
Divider
Container
```

**Example:**
```typescript
// shared/components/Button.tsx
export function Button({ label, onPress, variant = 'primary' }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={getButtonStyle(variant)}>{label}</Text>
    </TouchableOpacity>
  )
}
```

### What Does NOT Go in Shared

Any component that:
- Imports feature-specific data
- Has feature-specific business logic
- Is used by only one feature
- Couples to a specific service

**Bad Example:**
```typescript
// shared/components/NoteCard.tsx - WRONG
// This is feature-specific, not shared!
export function NoteCard({ note }) {
  // business logic
  // feature data
}
```

**Correct Location:**
```typescript
// features/notes/ui/NoteCard.tsx - RIGHT
export function NoteCard({ note }) { /* ... */ }
```

### Shared Component Patterns

**Wrapper Components:**
```typescript
// SafeAreaContainer.tsx - wraps with safe area insets
export function SafeAreaContainer({ children }) {
  return <View style={styles.container}>{children}</View>
}
```

**Layout Components:**
```typescript
// ScreenContainer.tsx
export function ScreenContainer({ children, padding = 'default' }) {
  return <View style={getContainerStyle(padding)}>{children}</View>
}
```

**Utility Components:**
```typescript
// Loader.tsx
export function Loader({ size = 'medium' }) {
  return <ActivityIndicator size={size} />
}
```

---

## Utility Rules

### Small, Focused Utility Files

**Pattern:**
```typescript
// utils/dateUtils.ts
export function formatDate(date: Date): string { /* ... */ }
export function isToday(date: Date): boolean { /* ... */ }
export function getDayName(date: Date): string { /* ... */ }
```

**Not:**
```typescript
// WRONG - god utility file
export function formatDate() { /* ... */ }
export function calculateDistance() { /* ... */ }
export function parseJSON() { /* ... */ }
export function shuffleArray() { /* ... */ }
export function validateEmail() { /* ... */ }
// 50 unrelated functions in one file
```

### Utility Organization

```
shared/utils/
  ├── dateUtils.ts
  ├── stringUtils.ts
  ├── arrayUtils.ts
  ├── numberUtils.ts
  └── validation.ts
```

Each file has 1-2 related utility categories.

---

## Documentation in Code

### When to Add Comments

**Add comments when:**
- Explaining "why" not "what"
- Business logic is non-obvious
- Documenting constraints
- Explaining algorithms

**Bad Comments:**
```typescript
// Get all notes
const allNotes = getNotes()

// Check if array is empty
if (array.length === 0) { }
```

**Good Comments:**
```typescript
// Notes older than 30 days are archived automatically
// because they clutter the active list
const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000)
const activeNotes = allNotes.filter(n => n.createdAt > thirtyDaysAgo)

// Use exponential backoff for sync retries:
// 1s → 2s → 4s → 8s → 16s (max)
// Because immediate retries waste battery on low-end devices
const backoffMs = Math.min(1000 * Math.pow(2, retryCount), 16000)
```

### Function Documentation

```typescript
/**
 * Save a note to local storage and trigger sync if enabled.
 * 
 * @param note - The note object to save
 * @param opts - Options { sync: boolean, backup: boolean }
 * @returns Promise resolving to saved note with timestamp
 * 
 * Note: This does NOT upload to cloud by itself.
 * Cloud sync is handled separately by the sync engine.
 */
async function saveNote(note: Note, opts?: SaveOptions): Promise<Note> {
  // ...
}
```

---

## Test Organization

### Co-locate Tests

```
features/notes/
  ├── ui/
  │   ├── NotesList.tsx
  │   └── NotesList.test.tsx
  ├── services/
  │   ├── NoteService.ts
  │   └── NoteService.test.ts
  └── hooks/
      ├── useNotes.ts
      └── useNotes.test.ts
```

Tests live next to the code they test.

### Test Patterns

Each test file covers one module:
- Don't mix testing UI + services + hooks
- Keep test files under 300 lines
- One test suite = one responsibility

---

## Summary: File Organization Checklist

For every file:

✓ **Under 300-400 lines?**
✓ **Single responsibility?**
✓ **Clear name describes content?**
✓ **Imports are minimal and clear?**
✓ **No mixing of concerns?**
✓ **Tests co-located?**
✓ **Comments explain "why" not "what"?**
✓ **Ready to be understood by fresh eyes?**
