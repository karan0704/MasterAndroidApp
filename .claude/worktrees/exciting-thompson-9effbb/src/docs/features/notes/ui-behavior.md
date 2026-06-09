# Notes UI Behavior

## User Experience Direction

Notes should support:
- quick entry
- focused editing
- readable lists
- safe overlays and panels
- expansion from compact to fuller workspace

## Current UI Areas

Expected notes UI areas include:
- floating entry
- notes list
- editor
- preview or markdown-aware presentation where appropriate

## Universal UI Requirements

Notes is one of the most sensitive features for universal mobile layout.

The notes UI should:
- respect top and bottom insets
- avoid status bar overlap
- avoid gesture-area collisions
- support theme switching later
- use shared spacing and shared corner language

## Device Safety Notes

When notes layout changes, review:
- Android top inset behavior
- iPhone notch handling
- modal height on short screens
- keyboard overlap
- floating action overlap
