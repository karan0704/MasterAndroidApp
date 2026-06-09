# Notes Data Model

## Source Of Truth

Notes content should use:
- markdown files as the primary source of truth

Structured note metadata should use:
- SQLite

Light UI preferences may use:
- MMKV

## Expected Metadata Areas

Document note metadata such as:
- id
- title
- file path
- created time
- updated time
- last opened time
- category
- pin state
- reminder linkage flag
- attachment flag
- sync status if introduced

## Why This Split Exists

Markdown gives:
- human readability
- AI readability
- local inspectability
- future export friendliness

SQLite gives:
- structured querying
- sorting
- filtering
- relationships later

## Future Notes Data Extensions

Potential later additions:
- checkpoints
- sync markers
- relationship tables
- attachment references
