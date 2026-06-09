# Universal UI Foundation

## Purpose

This file defines universal UI rules for mobile screens and overlays.

These rules exist to prevent:
- hardcoded spacing drift
- status bar overlap
- unsafe top and bottom padding
- inconsistent corner usage
- theme fragmentation
- device-specific layout bugs

## Theme Direction

The UI system should be prepared for at least these theme families:
- universal default theme
- AMOLED black theme
- black and white theme

The design system should eventually centralize:
- colors
- typography
- spacing tokens
- border radius tokens
- elevation rules
- component variants

## Safe-Area Rule

Use insets instead of hardcoded top and bottom alignment when layout touches:
- status bar
- notch
- top overlays
- floating panels
- bottom gesture area
- full-screen modals

Insets should be treated as layout inputs, not edge-case patches.

## Status Bar Rule

The status bar must not visually collapse into feature content.

When building screens or overlays:
- respect top inset
- define background continuity behind the status bar intentionally
- avoid hardcoded padding as a substitute for safe-area behavior

This is especially important for:
- notes panels
- floating overlays
- sheets
- edge-to-edge experiences

## Spacing System

Prefer shared spacing tokens over random per-screen values.

Spacing should be defined as a system for:
- outer screen padding
- section gaps
- card padding
- button height and horizontal padding
- modal and sheet padding

Avoid arbitrary values unless there is a documented reason.

## Corner And Alignment System

Create a shared corner language instead of each component using unrelated radii.

Alignment should be:
- predictable
- reusable
- inset-aware
- grid-friendly

Universal alignment helpers should eventually support:
- screen containers
- section containers
- modal/sheet containers
- floating action areas

## Multi-Device Safety

Every layout change should consider:
- Android phones with varying status bar heights
- iPhones with notches and dynamic safe areas
- small-width phones
- larger phones and tablets when relevant
- gesture navigation areas
- landscape edge cases when relevant

Universal fixes are preferred.
Device-specific fixes should be a last resort.

## Shared UI Requirement

The UI system should evolve toward shared definitions for:
- colors
- spacing
- radii
- buttons
- layout wrappers
- sheets and overlays
- safe-area-aware containers

See also:
- [`shared-component-rules.md`](shared-component-rules.md)
