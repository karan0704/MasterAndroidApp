# Architecture Principles

## Core Principles

The system should be:
- modular
- loosely coupled
- feature-first
- replaceable
- scalable
- beginner-readable
- AI-readable

## Module Independence

Each feature should behave like a mini application inside the larger app.

A feature should be:
- addable
- removable
- disable-able
- extendable

without breaking unrelated features.

## Allowed Cross-Feature Communication

Features may communicate through:
- contracts
- events
- services
- hooks
- typed interfaces

Features should not:
- import unrelated feature internals directly
- modify another feature's private state
- couple UI components to foreign storage or business logic

## High Cohesion Rule

One module should do one main job.

Examples:
- storage service handles storage
- reminder engine handles reminders
- note file service handles note file operations
- shared UI components handle presentation only

Avoid mixed-responsibility classes or files.

## Vertical Slice Rule

Build features as vertical slices.

Meaning:
- finish a stable foundation for one module
- document it clearly
- then expand or connect to the next module

Avoid partially building many unrelated systems at once.

## Shared Layer Rule

The shared layer should contain:
- reusable UI primitives
- reusable theme tokens
- generic utilities
- generic hooks

The shared layer should not contain:
- feature business rules
- feature-specific data assumptions
- feature-specific API behavior

## Integration Direction Rule

When modules connect later, they should connect through explicit boundaries.

Example:
- notes may link to reminders later
- reminders may link to calendar later

But the integration should still preserve module ownership.

## Documentation Ownership Rule

Shared architectural rules live in master docs.

Feature-specific boundaries live in feature docs.

Never redefine a shared rule differently in multiple feature documents.
