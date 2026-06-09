# Shared Component Rules

## Purpose

This file defines when a UI element should become shared and what kind of shared primitives the project should support.

## What Belongs In Shared UI

Shared UI should contain reusable primitives such as:
- buttons
- cards
- loaders
- modal shells
- safe-area-aware screen containers
- row and stack layout helpers
- theme token access helpers

## What Should Not Be Shared Prematurely

Do not move something into shared just because it exists twice.

Do not share:
- feature-specific business rules
- feature-specific storage assumptions
- feature-specific API logic
- very temporary one-screen experiments

## Shared Theme Contract

Shared UI components should eventually read from centralized theme inputs for:
- colors
- spacing
- radii
- text roles
- pressed and disabled states

Theme-aware shared UI is required for future support of:
- universal theme
- AMOLED black theme
- black and white theme

## Shared Layout Contract

Shared layout helpers should eventually cover:
- top-level screens
- scroll containers
- padded content sections
- bottom action areas
- floating launcher positioning
- modal and sheet framing

These helpers should prefer insets over hardcoded edge padding.

## Button Rules

Buttons should eventually have reusable variants such as:
- primary
- secondary
- ghost
- destructive
- floating action

Button dimensions and padding should come from shared rules, not per-screen guesses.

## Documentation Rule

When a shared UI primitive is introduced:
- document its purpose
- document when to use it
- document what it should not own

Feature docs may reference shared components, but the ownership rules stay here.
