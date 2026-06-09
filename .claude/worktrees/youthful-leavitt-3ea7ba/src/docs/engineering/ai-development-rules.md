# AI Development Rules

## Purpose

This file defines how AI and human contributors should read, plan, and modify this project.

## Critical Rule: Low-Context Development (5–10 Files Maximum)

This repository is **intentionally designed** for low-context development.

**The Core Rule:**
- Any focused feature change should be understandable by reading **5 to 10 files maximum**
- A developer or AI should never need to scan 50+ files to understand one change
- Each feature is independent and self-contained

**Why this matters:**
```
Bad Architecture:
Feature change → requires 50 files → refactoring everywhere

Good Architecture:
Feature change → requires 5-10 files → minimal impact
```

**This is a strict architectural requirement**, not optional guidance.

## Required Reading Order Before Coding

Before implementing anything:

1. Read [`../README.md`](../README.md)
2. Read the relevant master docs
3. Read the relevant feature docs
4. Read only the code needed for the current task

Do not jump straight into code without reading the relevant docs first.

## Low-Context Development Pattern

The target is:
- a change should usually be understandable from a small set of related files
- a feature should be extendable without scanning the whole repo
- feature changes touch only: `feature-name/`, related services, and docs

Preferred pattern:
- **5 to 10 relevant files** for a focused feature change
- All 5-10 files are closely related by function

Avoid:
- changes that require reading dozens of unrelated files
- hidden coupling across unrelated features
- global behavior spread randomly across folders
- feature-to-feature imports (use contracts instead)

## AI Behavior Rules

AI should:
- inspect the existing structure first
- avoid silent assumptions
- prefer minimal necessary changes
- keep docs and code aligned
- update the feature docs when behavior changes
- keep cross-cutting rules in master docs only
- enforce the 5-10 file rule strictly

AI should not:
- duplicate the same rule in many markdown files
- invent missing product requirements silently
- create broad abstractions without clear value
- refactor unrelated modules during a focused task
- break the 5-10 file isolation rule

## Documentation Update Rule

When behavior or direction changes:
- update the relevant feature docs first
- update the relevant master docs only if the change affects shared rules
- keep links accurate
- do not copy-paste rule text into multiple files
- verify no duplication exists

## Decision Logging Rule

If a decision affects:
- architecture
- storage
- navigation
- universal UI behavior
- shared components
- module boundaries

then the reasoning should live in the relevant master or feature doc.

Document the "why", not just the "what".

## Feature Addition Workflow

When adding a new feature:

1. Create `src/docs/features/<feature-name>/`
2. Fill the docs template from [`feature-doc-template.md`](feature-doc-template.md)
3. Define scope before implementation
4. Define dependencies and boundaries
5. Ensure feature code touches only 5-10 related files
6. Implement only after docs are clear enough for focused coding

## Module Isolation Rule

Each feature must remain independent.

A feature should work standalone:
- without forcing other features to load
- without tight imports between unrelated features
- communicating only through contracts/events/services

Example bad: `notes/ui/NotesList.tsx` imports `todo/services/TodoService`
Example good: `notes/contracts/IRemindable` that todo implements

## Minimal Refactoring Rule

When implementing a feature:
- focus on that feature only
- do not refactor unrelated systems
- do not "improve" architecture in areas you're not working on
- if you find architectural improvements, document them for later

Focus = quality.

## Universal Mobile Safety Rule

When writing or reviewing UI changes, always think about:
- Android phones
- iPhones
- safe-area insets
- status bar overlap
- bottom gesture areas
- small and large device widths
- theme compatibility

Do not rely on hardcoded alignment values when inset-based layout is safer.

See [`../ui/universal-ui-foundation.md`](../ui/universal-ui-foundation.md) for details.
