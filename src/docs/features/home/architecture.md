# Home Architecture

## Ownership

The home feature owns:
- home screen composition
- home-specific display logic
- home-specific presentational components

## Internal Areas

Expected code areas:
- `ui`
- `hooks`
- `services`
- `store`
- `contracts`

## Dependencies

The home feature may depend on:
- shared UI primitives
- shared theme tokens
- time formatting helpers

The home feature should not directly own unrelated feature logic.

## Future Extension Points

Home may later expose:
- launchers
- quick actions
- summaries from other modules

Those extensions should still consume contracts or services rather than private internals from other features.
