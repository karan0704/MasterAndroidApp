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

---

## Safe-Area Implementation Pattern

### How to Use Insets in React Native

**React Native provides:**
```typescript
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function MyScreen() {
  const insets = useSafeAreaInsets()
  
  return (
    <View style={{
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    }}>
      {/* Content */}
    </View>
  )
}
```

**Or use SafeAreaView wrapper:**
```typescript
import { SafeAreaView } from 'react-native-safe-area-context'

export function MyScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Content automatically respects insets */}
    </SafeAreaView>
  )
}
```

### Notes Panel Safe-Area Issue

**Current Issue (Phase 2):**

Notes panels must account for:
1. **Top inset** - status bar and notch
2. **Bottom inset** - gesture navigation area (Android 9+)
3. **Status bar color** - should match panel background

**Fix Pattern:**

```typescript
// features/notes/ui/NotesPanel.tsx
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'react-native'

export function NotesPanel() {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: '#fff', // match status bar background
      }}
    >
      <StatusBar 
        barStyle="dark-content"
        backgroundColor="#fff"
      />
      {/* Panel content */}
    </View>
  )
}
```

**DO NOT:**
```typescript
// Bad: Hardcoded values
style={{
  paddingTop: 40,
  paddingBottom: 20,
}}

// Bad: Ignoring safe areas
style={{
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  // Content overlaps status bar!
}}
```

### Safe-Area Rules for Common Patterns

#### Full-Screen Modal
```typescript
<SafeAreaView style={{ flex: 1 }}>
  <View style={{ flex: 1 }}>
    {/* Content fills insets-adjusted area */}
  </View>
</SafeAreaView>
```

#### Floating Action Button
```typescript
const insets = useSafeAreaInsets()
<View style={{
  position: 'absolute',
  bottom: insets.bottom + 16, // offset from gesture area
  right: 16,
}}>
  <FAB />
</View>
```

#### Sheet / Bottom Panel
```typescript
<View style={{
  paddingBottom: insets.bottom,
  paddingLeft: insets.left,
  paddingRight: insets.right,
}}>
  {/* No top padding - sheet comes from bottom */}
</View>
```

#### Header with Status Bar
```typescript
<View style={{
  paddingTop: insets.top,
  backgroundColor: headerColor, // extends behind status bar
}}>
  <HeaderContent />
</View>
```

---

## Theme System Requirements

### Color Tokens (To Be Implemented)

**Primary Colors:**
```
primary: main brand color
secondary: accent color
tertiary: additional accent
```

**Semantic Colors:**
```
success: positive actions
warning: cautions
error: destructive actions
info: informational
```

**Neutral Colors:**
```
background: default background
surface: cards, sheets
surfaceVariant: subtle backgrounds
onBackground: text on background
onSurface: text on surface
```

### Dark Mode Variants

Every color should have:
- Light theme variant
- Dark theme variant
- AMOLED black variant

**Example:**
```typescript
const colors = {
  light: {
    primary: '#0066FF',
    background: '#FFFFFF',
    surface: '#F5F5F5',
  },
  dark: {
    primary: '#66B3FF',
    background: '#121212',
    surface: '#1E1E1E',
  },
  amoled: {
    primary: '#66B3FF',
    background: '#000000',
    surface: '#0A0A0A',
  },
}
```

### Typography Tokens (To Be Implemented)

**Font Scale:**
```
h1: 32px - page titles
h2: 24px - section titles
h3: 18px - subsection titles
body: 16px - main content
caption: 12px - labels, hints
```

All should include:
- Line height
- Letter spacing
- Font weight

### Spacing Tokens (To Be Implemented)

**Establish:**
```
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
xxl: 48px
```

Use consistently for:
- Outer screen padding
- Section gaps
- Card padding
- Component spacing

---

## Component Specifications

### SafeAreaContainer (Shared Component)

Purpose: Automatically handles insets for full-screen content

```typescript
interface SafeAreaContainerProps {
  children: ReactNode
  edges?: ('top' | 'bottom' | 'left' | 'right')[]
  style?: StyleProp<ViewStyle>
}

// Default: all edges
<SafeAreaContainer>
  {/* Content with all insets */}
</SafeAreaContainer>

// Custom: specific edges
<SafeAreaContainer edges={['top', 'bottom']}>
  {/* Skip left/right insets */}
</SafeAreaContainer>
```

### ScreenContainer (Shared Component)

Purpose: Standard padding for full-screen content

```typescript
<ScreenContainer padding="md">
  {/* Automatically applies spacing tokens */}
</ScreenContainer>
```

### SheetContainer (Shared Component)

Purpose: Safe container for bottom sheets and modals

```typescript
<SheetContainer>
  {/* Handles bottom inset + gesture area */}
</SheetContainer>
```
