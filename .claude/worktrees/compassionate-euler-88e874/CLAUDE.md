# Master Android App - AI Development Guidelines

This document provides guidelines for Claude (and future AI assistants) to maintain consistency and quality when working on this codebase.

---

## Core Principles

1. **Use the unified design system** — No hardcoded colors, spacing, or typography
2. **Reuse before creating** — Check for existing components/utilities before writing new ones
3. **Type safety first** — Use TypeScript types for all inputs/outputs
4. **Safe areas on all platforms** — Always respect device notches and home indicators
5. **Test across devices** — Changes must work on small Android phones, large Android phones, and iPhones

---

## UI Development Rules

### 1. Colors

**Rule:** Never hardcode colors in components. Always use the theme system.

✅ **Correct:**
```tsx
import { useTheme } from '@/shared/theme';

const { colors } = useTheme();
<Text style={{ color: colors.textPrimary }}>Text</Text>
```

❌ **Wrong:**
```tsx
<Text style={{ color: '#201A14' }}>Text</Text>
```

### 2. Spacing & Sizing

**Rule:** Use spacing tokens (SPACING) instead of hardcoded pixel values. Reserved exceptions: safe-area insets.

✅ **Correct:**
```tsx
import { SPACING } from '@/shared/theme';

<View style={{ padding: SPACING.md, gap: SPACING.sm }}>
```

❌ **Wrong:**
```tsx
<View style={{ padding: 12, gap: 8 }}>
```

**Spacing values:**
- `xs` = 4px (tight)
- `sm` = 8px (small)
- `md` = 12px (standard)
- `lg` = 16px (large)
- `xl` = 20px (extra large)
- `xxl` = 24px
- `xxxl` = 28px
- `xxxxl` = 32px

### 3. Text & Typography

**Rule:** Use the `<Text>` component from `@/shared/components` with typed variants. Do not use React Native `Text` with inline styles for user-facing content.

✅ **Correct:**
```tsx
import { Text } from '@/shared/components';

<Text variant="header">Heading</Text>
<Text variant="body" color={colors.textSecondary}>Body text</Text>
<Text variant="kicker" color={colors.textSecondary}>Label</Text>
```

❌ **Wrong:**
```tsx
<Text style={{ fontSize: 24, fontWeight: '800' }}>Heading</Text>
```

**Typography variants:**
- `header`, `subheader` — Section titles
- `body`, `bodySemibold` — Regular content
- `kicker` — Uppercase labels
- `metadata`, `caption` — Small text
- `button` — Button labels
- `code` — Monospace code

### 4. Buttons

**Rule:** Use the `<Button>` component for all user actions. Variants: `primary`, `secondary`, `tertiary`.

✅ **Correct:**
```tsx
import { Button } from '@/shared/components';

<Button onPress={onSave} title="Save" variant="primary" />
<Button onPress={onCancel} title="Cancel" variant="secondary" />
```

❌ **Wrong:**
```tsx
<Pressable style={{ backgroundColor: '#1F1A16', paddingHorizontal: 14 }}>
  <Text style={{ color: '#FFF7E8' }}>Save</Text>
</Pressable>
```

### 5. Containers & Cards

**Rule:** Use the `<Container>` component for cards and panels, not raw `View` with StyleSheet styles.

✅ **Correct:**
```tsx
import { Container } from '@/shared/components';

<Container padding="md" shadow="small" borderRadius="lg">
  {/* content */}
</Container>
```

❌ **Wrong:**
```tsx
<View style={styles.card}>
  {/* content */}
</View>
// where styles.card = { borderRadius: 16, backgroundColor: '#FFF9EF', shadowColor: ... }
```

### 6. Safe Areas & Insets

**Rule:** Modal screens and full-screen content must respect safe-area insets for notches and home indicators. Use safe-area utilities from `@/shared/theme`.

✅ **Correct:**
```tsx
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getSafeTopInset, SPACING } from '@/shared/theme';

const insets = useSafeAreaInsets();
const topPadding = getSafeTopInset(insets, SPACING.md);

<View style={{ paddingTop: topPadding }}>
```

or use the built-in container:

```tsx
import { SafeContainer } from '@/shared/components';

<SafeContainer edges={{ top: true, bottom: true }}>
  {/* automatically handles safe areas */}
</SafeContainer>
```

❌ **Wrong:**
```tsx
<View style={{ paddingTop: 20 }}>
  {/* fixed padding ignores device notch */}
</View>
```

### 7. Responsive Design

**Rule:** Use `useWindowDimensions()` to detect layout mode. Breakpoint: **720px** for tablet/split layout.

✅ **Correct:**
```tsx
import { BREAKPOINTS } from '@/core/constants';
import { useWindowDimensions } from 'react-native';

const { width } = useWindowDimensions();
const showSplitLayout = width >= BREAKPOINTS.TABLET;  // 720px
```

---

## File Organization

### Naming & Paths

- **Components:** `/src/shared/components/{ComponentName}.tsx`
- **Theme:** `/src/shared/theme/{tokenType}.ts` (colors, spacing, typography, etc.)
- **Features:** `/src/features/{featureName}/ui/`, `/services/`, `/hooks/`, `/store/`, `/contracts/`
- **Tests:** Colocated with source (`__tests__/` folder or `.test.tsx` suffix)

### Component Template

```tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, SPACING } from '@/shared/theme';

interface MyComponentProps {
  title: string;
  onPress: () => void;
}

export function MyComponent({ title, onPress }: MyComponentProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.panelBg }]}>
      {/* content */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
  },
});
```

---

## Dos & Don'ts

### DO:

✅ Import and use theme tokens  
✅ Use shared components  
✅ Test on multiple device sizes  
✅ Add TypeScript types for all props  
✅ Handle safe areas in modals/full-screen content  
✅ Group related styling into containers  
✅ Document non-obvious UI decisions  

### DON'T:

❌ Hardcode colors (use `colors.*`)  
❌ Hardcode spacing (use `SPACING.*`)  
❌ Create new button/text/input variants inline (use shared components)  
❌ Use `StyleSheet.absoluteFill` without safe-area awareness  
❌ Ignore notches/home indicators on iOS  
❌ Create deeply nested components without extraction  
❌ Add debug styles without removing them  

---

## Theme System Quick Start

### Access Theme

```tsx
import { useTheme } from '@/shared/theme';

const { theme, colors, setTheme } = useTheme();
```

### Common Colors

```tsx
colors.textPrimary        // Dark text on light backgrounds
colors.textSecondary      // Secondary text
colors.buttonPrimary      // Primary button background
colors.buttonSecondary    // Secondary button background
colors.panelBg            // Modal/card background
colors.lightBg            // Light page background
colors.border             // Border color
colors.work               // Work category (blue)
colors.health             // Health category (green)
colors.error              // Error state
```

### Safe-Area Pattern for Modals

```tsx
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SPACING } from '@/shared/theme';
import { buildInsetPadding } from '@/shared/theme/insets';

const insets = useSafeAreaInsets();
const padding = buildInsetPadding(insets, {
  top: true,
  bottom: true,
  minPadding: SPACING.md,
});

<View style={padding}>
```

---

## Common Tasks

### Add a New Screen

1. Create folder: `/src/features/{name}/ui/`
2. Create screen file with theme + safe-area imports
3. Use shared components (Button, Text, Container)
4. Test on mobile and tablet sizes

### Add a New Color

1. Add to `ColorTokens` interface in `/src/shared/theme/colors.ts`
2. Add to all three theme definitions (UNIVERSAL, AMOLED, BW)
3. Update DESIGN_SYSTEM.md

### Fix a Layout Issue

1. Check safe-area insets first (use `getSafeTopInset`, etc.)
2. Use SPACING tokens instead of hardcoded pixels
3. Test on small/large phone and tablet widths

### Support a New Device Size

1. Check responsive breakpoints (BREAKPOINTS.PHONE, BREAKPOINTS.TABLET)
2. Adjust layout logic using `useWindowDimensions()` → `width`
3. Test that all text, buttons, and spacing scale appropriately

---

## Code Review Checklist

When reviewing code, ensure:

- [ ] No hardcoded color hex codes
- [ ] No hardcoded pixel values (except safe-area calculations)
- [ ] Uses shared components (Button, Text, Container)
- [ ] Safe areas handled correctly (insets respected)
- [ ] TypeScript types present
- [ ] Works on small phone, large phone, and tablet
- [ ] Theme colors applied consistently
- [ ] Spacing uses SPACING tokens
- [ ] Component props well-documented

---

## Documentation Rules

### Creating New Feature Documentation

**Rule:** When creating new documentation files for a feature, place them in the correct location based on the feature type.

**Structure:**
```
src/docs/features/{feature-name}/
├── README.md           ← Feature overview & status
├── scope.md            ← What's in/out of scope
├── architecture.md     ← Technical design
├── data-model.md       ← Database & data structures
├── ui-behavior.md      ← User interactions & flows
└── roadmap.md          ← Future phases & enhancements
```

**Examples:**
- YouTube Downloader: `src/docs/features/youtube-downloader/`
- Notes: `src/docs/features/notes/`
- Home: `src/docs/features/home/`

**File Placement Rules:**
- ✅ Feature docs → `src/docs/features/{feature-name}/`
- ✅ Backend docs → `Backend/README.md` and `Backend/PROGRESS.md`
- ✅ Quick guides → Root level (TESTING_GUIDE.md, CURRENT_STAGE.md, etc.)
- ❌ Don't create docs in root unless it's a cross-project guide
- ❌ Don't mix feature docs with general docs

**When Adding New Content:**
1. Check if feature folder exists in `src/docs/features/`
2. If not, create it following the structure above
3. Add README.md first with overview
4. Add other .md files as needed
5. Update main `src/docs/README.md` with reference to new feature

---

## Troubleshooting

### "useTheme is undefined"
→ Ensure component is wrapped in `<ThemeProvider>` (in App.tsx)

### Text color doesn't match theme
→ Use `useTheme()` to get `colors`, then pass to `<Text color={colors.textPrimary}>`

### Layout breaks on tablet
→ Check BREAKPOINTS.TABLET (720px). Add responsive layout logic.

### Status bar color doesn't update
→ StatusBar color is set in App.tsx using theme. Ensure theme loads before rendering.

### Safe-area padding not working
→ Use `useSafeAreaInsets()` from `react-native-safe-area-context`, then apply via `getSafeTopInset()`, etc.

---

## Resources

- **Design System:** See DESIGN_SYSTEM.md for complete token reference
- **Theme Source:** `/src/shared/theme/`
- **Components Source:** `/src/shared/components/`
- **Constants:** `/src/core/constants/`

---

## Future Enhancements

- Animation token system (durations, easing)
- Additional component variants
- Layout composition patterns
- Accessibility guidelines
