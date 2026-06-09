# Future Modules

## Purpose

This file lists future module families and explains how they should fit into the architecture.
It is a planning guide, not a build spec.

## Rules For Future Modules

Every future module must:
- have a dedicated folder under `src/docs/features/<feature-name>/`
- obey loose coupling rules
- use shared UI tokens and shared component rules
- respect safe-area and inset-driven layout rules
- keep feature internals private
- expose contracts, services, or events instead of direct internal access

## Planned Module Families

### Productivity

- notes
- reminders
- todo
- tasks
- calendar
- alarms

### Utility / Platform

- screen-share
- nearby devices
- sync
- settings
- notifications

### Rich Content / Media

- gallery
- attachments
- voice
- media

## YouTube-like Media Module Placeholder

The project may later add a YouTube-like module or media family.

This future module may include:
- YouTube API integration
- background playback
- playback with screen off
- media downloads
- offline metadata handling
- locally persisted playback state

This file does not define implementation details yet.
It only defines the architectural expectation.

### Boundaries For The Future Media Module

The future media module must still:
- remain isolated from unrelated feature internals
- use shared UI patterns instead of custom one-off layouts
- respect theme tokens and universal spacing rules
- keep API integration inside feature-owned services
- keep playback state and download state documented clearly
- use centralized docs inside `src/docs/features/media/`

### Likely Documentation Set

When that module starts, create:
- `src/docs/features/media/README.md`
- `src/docs/features/media/scope.md`
- `src/docs/features/media/architecture.md`
- `src/docs/features/media/ui-behavior.md`
- `src/docs/features/media/data-model.md`
- `src/docs/features/media/roadmap.md`

## Planning Rule

Do not create detailed technical implementation assumptions too early.
First define:
- product goal
- scope boundaries
- feature ownership
- shared dependencies
- storage expectations
- UI behavior expectations
