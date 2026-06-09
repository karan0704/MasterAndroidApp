# Phase 2 Productivity Roadmap

## Objective

Build the first functional productivity ecosystem around:
- notes
- reminders
- todo
- task
- calendar
- alarm and clock

The target is a connected productivity system, not isolated mini apps.

## Phase 2 Principles

Each module must remain:
- independent
- loosely coupled
- replaceable
- disable-able
- scalable

Cross-module communication should happen through:
- contracts
- events
- interfaces
- services

## Implementation Order

1. Floating notes entry
2. Notes list
3. Note editor
4. Markdown storage
5. Metadata system
6. Note checkpoints
7. Reminder engine
8. Repeat rules
9. Todo module
10. Calendar integration
11. Alarm engine
12. Location reminders
13. Attachments

## Notes Foundation Stages

### Phase 2.1

Floating notes launcher:
- floating icon
- open notes screen
- close notes screen
- expand action

### Phase 2.2

Notes list:
- list notes
- search
- pinned notes
- recent notes
- category colors
- empty state

### Phase 2.3

Note editor:
- text editing
- markdown
- checklist
- basic formatting
- auto-save

### Phase 2.4

Markdown storage:
- markdown files as source of truth
- note file per id
- SQLite metadata only

### Phase 2.5

Metadata:
- created time
- updated time
- last opened
- pinned
- category
- reminder linked
- has attachment

## Relationship Direction

Planned relationships:

- notes -> reminders
- notes -> todo
- notes -> calendar
- notes -> checkpoints
- notes -> attachments

These relationships should not bypass module boundaries.

## Scope Discipline

Do not skip ahead casually.
Build stable foundations first, then connect modules later.
