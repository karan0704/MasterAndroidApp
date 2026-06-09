# Home UI Behavior

## Screen Purpose

Home acts as:
- the first visible foundation screen
- a future module launcher surface
- a stable composition point

## UI Expectations

- top-left area should show date and time
- center area should remain readable and calm
- layout should remain safe-area aware
- future floating actions should not collide with system UI

## Universal UI Notes

When updating this screen:
- use inset-aware layout rules
- avoid hardcoded edge alignment where shared layout helpers are safer
- maintain theme compatibility for future universal, AMOLED, and black-and-white themes

## Multi-Device Safety

Review behavior on:
- Android with gesture navigation
- Android with taller status bars
- iPhones with notches
- small-width phones
