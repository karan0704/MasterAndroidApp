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
