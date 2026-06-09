# Master Android App Documentation

This folder is the canonical source of truth for:
- project vision
- engineering rules
- AI workflow
- universal UI standards
- roadmap planning
- feature and module documentation

Do not treat root `README.md`, `Context1.md`, `Context2.md`, or `src/features/*/docs` as the primary documentation source.

## Reading Order

Use this order before coding:

**Project & Vision:**
1. [`project/project-overview.md`](project/project-overview.md)
2. [`project/engineering-priorities.md`](project/engineering-priorities.md)

**Engineering Rules & Patterns:**
3. [`engineering/ai-development-rules.md`](engineering/ai-development-rules.md)
4. [`engineering/golden-coding-rules.md`](engineering/golden-coding-rules.md)
5. [`engineering/architecture-principles.md`](engineering/architecture-principles.md)
6. [`engineering/code-organization.md`](engineering/code-organization.md)
7. [`engineering/technology-stack.md`](engineering/technology-stack.md)
8. [`engineering/storage-and-data-strategy.md`](engineering/storage-and-data-strategy.md)

**UI & Design:**
9. [`ui/universal-ui-foundation.md`](ui/universal-ui-foundation.md)
10. [`ui/shared-component-rules.md`](ui/shared-component-rules.md)

**Roadmap & Implementation:**
11. [`roadmap/phase-overview.md`](roadmap/phase-overview.md)
12. [`roadmap/current-scope.md`](roadmap/current-scope.md)
13. [`roadmap/phase-02-productivity.md`](roadmap/phase-02-productivity.md)
14. [`roadmap/future-modules.md`](roadmap/future-modules.md)

**Feature-Specific:**
15. relevant docs inside [`features/`](features)

## Folder Map

- [`project/`](project)  
  Product vision, goals, platform direction, engineering priorities, performance targets
  - `project-overview.md` - Product identity and direction
  - `engineering-priorities.md` - Performance targets, low-end device strategy

- [`engineering/`](engineering)  
  AI workflow, architecture rules, coding standards, folder organization, storage strategy
  - `ai-development-rules.md` - How AI/humans should work with codebase (5-10 file rule)
  - `golden-coding-rules.md` - Five core coding principles
  - `architecture-principles.md` - Module independence, coupling rules
  - `code-organization.md` - Folder structure, file size limits, component/service/hook patterns
  - `technology-stack.md` - Tech choices and rationale
  - `storage-and-data-strategy.md` - MMKV, SQLite, Markdown, offline-first strategy

- [`ui/`](ui)  
  Universal themes, safe-area layout rules, spacing system, alignment rules, shared UI primitives
  - `universal-ui-foundation.md` - Theme system, insets, safe-area rules, notes panel fixes
  - `shared-component-rules.md` - Button, Card, Modal, Container components

- [`roadmap/`](roadmap)  
  Phase planning, current execution scope, feature ordering, dependency direction
  - `phase-overview.md` - High-level roadmap across phases
  - `current-scope.md` - What's being worked on now
  - `phase-02-productivity.md` - Detailed Phase 2 breakdown (Notes, Reminders, Todo, Calendar)
  - `future-modules.md` - Phase 3+: YouTube, Gallery, Screen Share, Voice, Sync, etc.

- [`features/`](features)  
  Centralized feature and module documentation
  - `home/` - Phase 1 home screen docs
  - `notes/` - Phase 2 notes module docs

## Documentation Rules

- A cross-cutting rule should be fully defined only once.
- Feature docs may reference master docs, but should not restate them.
- Every new feature should get a folder in `src/docs/features/<feature-name>/`.
- If code behavior changes in a meaningful way, update the relevant feature docs and any affected master docs.
- Write docs so they are easy to edit later when new features are added.

## Migration Status

Stage 1 is active:
- `src/docs` is the source of truth
- legacy files remain temporarily for compatibility

Stage 2 will happen later:
- old duplicate docs can be deleted or reduced further during code cleanup

