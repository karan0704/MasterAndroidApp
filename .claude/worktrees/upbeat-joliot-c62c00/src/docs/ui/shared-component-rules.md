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

## Component Specifications

### Button Components

**Primary Button**
- Brand color background
- White/light text
- 48px height (minimum touch target)
- Medium font weight

**Secondary Button**
- Outline style or subtle background
- Brand color text
- Same 48px height

**Ghost Button**
- Transparent background
- Brand color text
- For less prominent actions

**Floating Action Button (FAB)**
- Circular, positioned absolutely
- Bottom-right corner
- Respects insets
- 56px diameter (Material Design standard)

**Example Implementation:**
```typescript
interface ButtonProps {
  label: string
  onPress: () => void
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
}

export function Button({
  label,
  variant = 'primary',
  size = 'medium',
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity style={getButtonStyle(variant, size)}>
      <Text>{label}</Text>
    </TouchableOpacity>
  )
}
```

### Card Component

**Purpose:** Elevation and grouping for content

**Properties:**
- Fixed corner radius (8px or 12px globally)
- Consistent padding (16px or 24px)
- Shadow on iOS, elevation on Android
- Optional divider between sections

**Example:**
```typescript
export function Card({
  children,
  onPress,
  style,
}: CardProps) {
  return (
    <TouchableOpacity style={[styles.card, style]}>
      {children}
    </TouchableOpacity>
  )
}
```

### Modal & Sheet Containers

**Modal:**
- Center on screen
- Semi-transparent overlay
- Close on overlay tap
- Handles insets for content

**Bottom Sheet:**
- Slides from bottom
- Respects gesture area (bottom inset)
- Half-screen to full-screen
- Drag to dismiss

**Example:**
```typescript
export function BottomSheet({
  isOpen,
  onClose,
  children,
}: BottomSheetProps) {
  const insets = useSafeAreaInsets()
  return (
    <Modal transparent visible={isOpen}>
      <View style={styles.overlay}>
        <Animated.View
          style={{
            paddingBottom: insets.bottom,
            // sheet content
          }}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  )
}
```

### Loader / Spinner Component

**Purpose:** Visual feedback for async operations

**Variants:**
- Default spinner
- Skeleton loader (for content)
- Progress indicator (percentage-based)

**Example:**
```typescript
export function Loader({
  size = 'medium',
  color = 'primary',
}: LoaderProps) {
  return <ActivityIndicator size={size} color={color} />
}
```

### Safe Area Container

**Purpose:** Automatically handles system insets

```typescript
export function SafeAreaContainer({
  children,
  edges = ['top', 'bottom'],
}: SafeAreaContainerProps) {
  return (
    <SafeAreaView edges={edges}>
      {children}
    </SafeAreaView>
  )
}
```

### Screen Container

**Purpose:** Standard padding for screen content

```typescript
export function ScreenContainer({
  children,
  padding = 'md',
}: ScreenContainerProps) {
  const theme = useTheme()
  const paddingValue = theme.spacing[padding]
  
  return (
    <View style={{ padding: paddingValue }}>
      {children}
    </View>
  )
}
```

### Row & Stack Helpers

**HStack:** Horizontal layout
```typescript
<HStack spacing="md">
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</HStack>
```

**VStack:** Vertical layout
```typescript
<VStack spacing="md">
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</VStack>
```

### Divider Component

**Purpose:** Visual separator between sections

```typescript
export function Divider({
  horizontal = true,
  color = 'default',
}: DividerProps) {
  return (
    <View style={getDividerStyle(horizontal, color)} />
  )
}
```

---

## Theme Access Pattern

### useTheme Hook

All shared components should use:
```typescript
const theme = useTheme()

// Access via:
theme.colors.primary
theme.spacing.md
theme.radii.default
theme.typography.body
```

**Never hardcode values like:**
```typescript
// BAD - hardcoded
style={{ color: '#0066FF', marginRight: 16 }}

// GOOD - theme-based
style={{
  color: theme.colors.primary,
  marginRight: theme.spacing.md,
}}
```

---

## Documentation Rule

When a shared UI primitive is introduced:
- document its purpose
- document when to use it
- document what it should not own
- provide usage examples
- specify theme tokens it uses

Feature docs may reference shared components, but the ownership rules stay here.

---

## Shared Components Checklist

Before moving a component to shared:

✓ **Is it used by 2+ features?**
✓ **Does it contain NO feature-specific logic?**
✓ **Is it reusable without modification?**
✓ **Can it be theme-aware?**
✓ **Is it documented?**
✓ **Does it follow component naming conventions?**
✓ **Can it be tested independently?**

If any answer is "no", keep it in the feature folder.
