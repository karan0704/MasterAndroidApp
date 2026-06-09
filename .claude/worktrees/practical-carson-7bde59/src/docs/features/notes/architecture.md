# Notes Architecture

## Ownership

The notes feature owns:
- notes UI
- notes-specific state
- notes-specific services
- note editing behavior
- note list behavior

The storage layer may be shared physically, but notes still owns the note-specific usage pattern and documentation.

## Internal Areas

Expected code areas:
- `ui`
- `hooks`
- `services`
- `store`
- `contracts`

## Dependencies

Notes may depend on:
- markdown file services
- SQLite metadata access
- shared UI primitives
- inset-aware layout helpers

## Future Integrations

Notes may later link with:
- reminders
- todo
- calendar
- checkpoints
- attachments

Those integrations must happen through explicit boundaries, not by exposing notes internals freely.
