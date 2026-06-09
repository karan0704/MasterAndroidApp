# Feature Doc Template

Use this template when adding a new feature folder under `src/docs/features/<feature-name>/`.

## Required Files

- `README.md`
- `scope.md`
- `architecture.md`
- `ui-behavior.md`
- `data-model.md`
- `roadmap.md`

## File Purposes

### README.md

Use for:
- feature summary
- current status
- quick links to master docs
- quick links to the rest of the feature docs

### scope.md

Use for:
- what is included now
- what is excluded now
- current user-facing goal
- phase boundaries

### architecture.md

Use for:
- ownership boundaries
- dependencies
- contracts and integration points
- extension points

### ui-behavior.md

Use for:
- screens
- transitions
- layout behavior
- safe-area expectations
- device-specific safety notes
- theme compatibility notes

### data-model.md

Use for:
- source of truth
- storage split
- metadata fields
- file naming strategy
- future sync notes if relevant

### roadmap.md

Use for:
- ordered phases
- future milestones
- deferred items
- dependencies between phases

## Writing Rule

Feature docs should describe:
- what is unique to the feature

Feature docs should not restate:
- global architecture rules
- universal UI rules
- AI workflow rules

Instead, link back to the relevant master docs.
