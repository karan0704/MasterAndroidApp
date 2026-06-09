# Master Android App - Design System

## Overview

This design system establishes a unified visual and interactive foundation across Android and iPhone platforms. It includes theme support (Universal warm palette, AMOLED Black, Black & White), spacing scales, typography tokens, and reusable components.

All styling is centralized in `/src/shared/theme` and `/src/shared/components` to ensure consistency and ease of future changes.

---

## Theme System

### Available Themes

1. **Universal** (default) — Warm earthy palette with browns, creams, and muted tones
2. **AMOLED Black** — Pure black backgrounds with high-contrast text for low-light environments
3. **Black & White** — Pure greyscale for accessibility

### Using Themes

```tsx
import { useTheme } from '@/shared/theme';

export function MyComponent() {
  const { colors } = useTheme();
  return <Text style={{ color: colors.textPrimary }}>Hello</Text>;
}
```

### Theme Colors

Each theme provides these color tokens:

- **Backgrounds**: `black`, `darkBrown`, `darkBrownAlt`, `lightBg`, `panelBg`, `creamBg`, `whiteBg`, `almostWhite`, `offWhite`
- **Text**: `textPrimary`, `textSecondary`, `textTertiary`, `textMuted`, `textLight`, `textLighter`, `textLightest`, `textPlaceholder`
- **UI**: `buttonPrimary`, `buttonPrimaryText`, `buttonSecondary`, `buttonSecondaryText`, `border`, `borderLight`
- **Categories**: `work` (blue), `health` (green), `personal` (yellow), `important` (red)
- **Status**: `error`, `errorBg`, `overlay`

### Runtime Theme Switching

```tsx
const { theme, setTheme } = useTheme();

// Switch themes
setTheme('amoled');  // or 'universal', 'bw'

// Theme preference is persisted to MMKV storage
```

---

## Spacing Scale

Spacing tokens are pixel-based and used consistently throughout the app.

```tsx
import { SPACING } from '@/shared/theme';

<View style={{ padding: SPACING.md, gap: SPACING.sm }}>
```

### Tokens

- `xs` = 4px — Extra small gaps (between date/time)
- `sm` = 8px — Small spacing (padding, tight groups)
- `md` = 12px — Medium spacing (standard card padding)
- `lg` = 16px — Large spacing (section dividers, horizontal padding)
- `xl` = 20px — Extra large spacing (major section gaps)
- `xxl` = 24px — 2x large spacing (wide spacing)
- `xxxl` = 28px — 3x large spacing (extra spacious)
- `xxxxl` = 32px — 4x large spacing (maximum)

### Safe-Area Insets

For modals and screens that need to account for notches and home indicators:

```tsx
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getSafeTopInset, getSafeBottomInset } from '@/shared/theme';

const insets = useSafeAreaInsets();
const topPadding = getSafeTopInset(insets, SPACING.md);  // respects device insets + minimum
```

---

## Typography

Typography tokens define font sizes, weights, and line heights.

```tsx
import { useTheme, TYPOGRAPHY } from '@/shared/theme';
import { Text } from '@/shared/components';

// Use the shared Text component with variants
<Text variant="header">Title</Text>
<Text variant="body">Body text</Text>
<Text variant="caption">Small text</Text>
```

### Variants

- **header** — `24px`, bold (`800`), `32px` line height
- **subheader** — `18px`, bold (`700`), `26px` line height
- **kicker** — `12px`, bold (`700`), uppercase, letter-spaced
- **body** — `15px`, regular (`400`), `24px` line height
- **bodySemibold** — `15px`, semibold (`600`), `24px` line height
- **metadata** — `13px`, medium (`500`), `18px` line height
- **caption** — `12px`, regular (`400`), `16px` line height
- **button** — `12px`, bold (`700`), `16px` line height
- **code** — `13px`, medium (`500`), `18px` line height

---

## Border Radius

Rounded corner tokens for consistency.

```tsx
import { BORDER_RADIUS } from '@/core/constants';

<View style={{ borderRadius: BORDER_RADIUS.lg }}>
```

- `sm` = 8px
- `md` = 12px
- `lg` = 16px
- `xl` = 20px
- `xxl` = 28px
- `pill` = 999px (full roundness)

---

## Responsive Design

### Breakpoints

```tsx
import { BREAKPOINTS } from '@/core/constants';

if (width >= BREAKPOINTS.TABLET) {  // 720px
  // Show split layout
}
```

- `PHONE` = 600px — Small phones
- `TABLET` = 720px — Tablets and split layouts
- `LARGE` = 1024px — Large tablets and desktop

### Safe-Area Handling

All screens should respect device safe areas (status bar, home indicator, notches).

```tsx
import { SafeContainer } from '@/shared/components';

<SafeContainer edges={{ top: true, bottom: true }}>
  {/* Content automatically has padding for safe areas */}
</SafeContainer>
```

---

## Shared Components

### Button

Primary, secondary, and tertiary button variants.

```tsx
import { Button } from '@/shared/components';

<Button
  onPress={() => console.log('clicked')}
  title="Press me"
  variant="primary"  // or 'secondary', 'tertiary'
  disabled={false}
/>
```

### Text

Typography-aware text component with color support.

```tsx
import { Text } from '@/shared/components';

<Text variant="header" color={colors.textPrimary}>
  Heading
</Text>
```

### Container

Card/panel wrapper with theme-aware styling.

```tsx
import { Container } from '@/shared/components';

<Container
  padding="md"        // 'sm', 'md', 'lg', 'xl'
  background="secondary"  // 'primary', 'secondary', 'tertiary', 'transparent'
  borderRadius="lg"   // 'sm', 'md', 'lg', 'xl', 'xxl', 'pill'
  shadow="medium"     // 'none', 'small', 'medium', 'large'
>
  {/* Content */}
</Container>
```

### Input

Text input with theme-aware styling.

```tsx
import { Input } from '@/shared/components';

<Input
  placeholder="Search..."
  value={value}
  onChangeText={setValue}
  variant="filled"  // or 'outlined'
  size="md"         // 'sm', 'md', 'lg'
/>
```

### SafeContainer

Container that automatically applies safe-area insets.

```tsx
import { SafeContainer } from '@/shared/components';

<SafeContainer
  edges={{ top: true, bottom: true }}
  background="primary"
>
  {/* Padding respects status bar and home indicator */}
</SafeContainer>
```

---

## Shadows & Elevation

```tsx
import { SHADOWS } from '@/core/constants';

<View style={SHADOWS.medium}>
```

- `small` — Subtle elevation
- `medium` — Standard elevation
- `large` — Prominent elevation

---

## Quick Reference

### Imports

```tsx
// Theme & tokens
import { useTheme, SPACING, TYPOGRAPHY } from '@/shared/theme';

// Components
import { Button, Text, Container, Input, SafeContainer } from '@/shared/components';

// Constants
import { BREAKPOINTS, SHADOWS, BORDER_RADIUS } from '@/core/constants';

// Safe area
import { useSafeAreaInsets } from 'react-native-safe-area-context';
```

### Common Patterns

**Heading with spacing:**
```tsx
<Text variant="header" color={colors.textPrimary} style={{ marginBottom: SPACING.md }}>
  Section
</Text>
```

**Button group:**
```tsx
<View style={{ flexDirection: 'row', gap: SPACING.sm }}>
  <Button title="Cancel" variant="secondary" onPress={() => {}} />
  <Button title="Save" variant="primary" onPress={() => {}} />
</View>
```

**Card:**
```tsx
<Container padding="md" shadow="small">
  <Text variant="bodySemibold">{title}</Text>
  <Text variant="caption" color={colors.textMuted}>{date}</Text>
</Container>
```

---

## Migration Guide: Hardcoded Styles → Design System

### Before
```tsx
<View style={{
  backgroundColor: '#F8EEDB',
  paddingHorizontal: 18,
  paddingVertical: 20,
  borderRadius: 28,
}}>
```

### After
```tsx
import { useTheme, SPACING, BORDER_RADIUS } from '@/shared/theme';
import { Container } from '@/shared/components';

const { colors } = useTheme();

<Container
  padding="xl"
  background="secondary"
  borderRadius="xxl"
/>
```

---

## Future Enhancements

- [ ] Dark mode toggle in settings
- [ ] Custom color picker for theme customization
- [ ] Animation duration tokens
- [ ] Additional component variants (badges, chips, modals)
- [ ] Component composition patterns guide
