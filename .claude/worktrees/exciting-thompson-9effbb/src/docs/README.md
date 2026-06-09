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

1. [`project/project-overview.md`](project/project-overview.md)
2. [`engineering/ai-development-rules.md`](engineering/ai-development-rules.md)
3. [`engineering/architecture-principles.md`](engineering/architecture-principles.md)
4. [`engineering/code-organization.md`](engineering/code-organization.md)
5. [`engineering/storage-and-data-strategy.md`](engineering/storage-and-data-strategy.md)
6. [`ui/universal-ui-foundation.md`](ui/universal-ui-foundation.md)
7. [`ui/shared-component-rules.md`](ui/shared-component-rules.md)
8. [`roadmap/phase-overview.md`](roadmap/phase-overview.md)
9. relevant docs inside [`features/`](features)

## Folder Map

- [`project/`](project)  
  Product vision, goals, platform direction, future product families

- [`engineering/`](engineering)  
  AI workflow, architecture rules, folder standards, storage strategy, feature doc templates

- [`ui/`](ui)  
  Universal themes, safe-area layout rules, spacing system, alignment rules, shared UI primitives

- [`roadmap/`](roadmap)  
  Phase planning, current scope, future module order, dependency direction

- [`features/`](features)  
  Centralized feature and module docs

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

