# AI Development Rules

## Purpose

This file defines how AI and human contributors should read, plan, and modify this project.

## Required Reading Order Before Coding

Before implementing anything:

1. Read [`../README.md`](../README.md)
2. Read the relevant master docs
3. Read the relevant feature docs
4. Read only the code needed for the current task

Do not jump straight into code without reading the relevant docs first.

## Low-Context Development Rule

This repository is intentionally designed for low-context development.

The target is:
- a change should usually be understandable from a small set of related files
- a feature should be extendable without scanning the whole repo

Preferred pattern:
- 5 to 10 relevant files for a focused feature change

Avoid:
- changes that require reading dozens of unrelated files
- hidden coupling
- global behavior spread across random folders

## AI Behavior Rules

AI should:
- inspect the existing structure first
- avoid silent assumptions
- prefer minimal necessary changes
- keep docs and code aligned
- update the feature docs when behavior changes
- keep cross-cutting rules in master docs only

AI should not:
- duplicate the same rule in many markdown files
- invent missing product requirements silently
- create broad abstractions without clear value
- refactor unrelated modules during a focused task

## Documentation Update Rule

When behavior or direction changes:
- update the relevant feature docs
- update the relevant master docs only if the change affects shared rules
- keep links accurate
- do not copy-paste rule text into multiple files

## Decision Logging Rule

If a decision affects:
- architecture
- storage
- navigation
- universal UI behavior
- shared components

then the reasoning should live in the relevant master or feature doc.

## Feature Addition Workflow

When adding a new feature:

1. Create `src/docs/features/<feature-name>/`
2. Fill the docs template from [`feature-doc-template.md`](feature-doc-template.md)
3. Define scope before implementation
4. Define dependencies and boundaries
5. Implement only after docs are clear enough for focused coding

## Universal Mobile Safety Rule

When writing or reviewing UI changes, always think about:
- Android phones
- iPhones
- safe-area insets
- status bar overlap
- bottom gesture areas
- small and large device widths
- theme compatibility

Do not rely on hardcoded alignment values when inset-based layout is safer.
