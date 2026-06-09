# Project Overview

## Project Identity

Project name: `Master Android App`

Primary implementation stack:
- React Native

Primary mobile targets:
- Android
- iOS

Planned future targets:
- Windows
- Linux

## Product Direction

This project is not intended to become a collection of disconnected mini apps.
It should grow into a connected, modular platform where features can work together while still remaining independent.

The long-term direction is:
- productivity ecosystem
- reusable platform features
- offline-first local data
- universal UI behavior across devices
- AI-friendly engineering workflow

## Product Philosophy

The app should be:
- scalable
- loosely coupled
- replaceable by module
- feature-first
- easy to debug
- easy to extend with low context

The app should avoid:
- tightly coupled feature internals
- large unreadable files
- scattered project rules
- duplicate documentation
- per-screen one-off layout decisions

## Core Product Families

Current and planned families include:
- home
- notes
- reminders
- todo
- tasks
- calendar
- alarm and clock
- gallery
- screen sharing
- sync
- media
- settings
- voice assistant

## Engineering Intent

The project is intentionally designed so a developer or AI assistant can understand one change by reading only a limited set of files.

**The 5-10 Files Rule:**
- Any focused feature change should require reading only 5–10 related files
- A developer should never need to scan 50+ files to understand one change
- This is a strict architectural requirement

The desired workflow is:
- open the master docs
- open the relevant feature docs
- inspect only the related code (5–10 files maximum)
- make a focused change without refactoring unrelated modules

See [`engineering-priorities.md`](engineering-priorities.md) for performance targets and design philosophy.

## Universal Mobile Requirement

Every mobile-facing decision should consider:
- Android and iPhone differences
- small and large phone layouts
- safe-area insets
- status bar behavior
- orientation edge cases when relevant
- future theme switching

Universal fixes are preferred over device-specific fixes.

## Documentation Source of Truth

This file is part of the canonical docs system under `src/docs`.

For engineering rules, continue with:
- [`../engineering/ai-development-rules.md`](../engineering/ai-development-rules.md)
- [`../engineering/architecture-principles.md`](../engineering/architecture-principles.md)
