# Storage And Data Strategy

## Purpose

This file defines storage expectations for the project at a master level.

## Storage Layers

### MMKV

Use MMKV for:
- settings
- lightweight persistent preferences
- local UI state that benefits from fast access
- small flags and session-like values

Do not use MMKV for large structured feature content.

### SQLite

Use SQLite for:
- structured feature metadata
- relationships
- sync history
- indexes
- filters
- future cross-feature references where appropriate

Do not store large note bodies or large media payloads in SQLite unless the product explicitly requires it.

### Markdown Files

Markdown is the preferred source of truth for notes content.

Use markdown when the data is:
- human-readable
- AI-readable
- easy to back up
- easy to inspect locally
- likely to benefit from future export or sync

Example:
- notes content in `.md`
- note metadata in SQLite

## Offline-First Direction

Prefer local-first behavior where possible.

The app should remain useful when:
- there is no network
- sync is not enabled yet
- a feature is still local-only

## Future Media Note

For future download-heavy media modules:
- document the file strategy before implementation
- keep metadata separate from large content payloads
- define cleanup, retention, and offline behavior clearly in feature docs

## Documentation Contract

Each feature data model doc should answer:
- what is the source of truth
- what lives in files
- what lives in SQLite
- what lives in MMKV
- what is derived state
