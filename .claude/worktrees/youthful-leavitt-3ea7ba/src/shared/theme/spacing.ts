import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EdgeInsets } from 'react-native-safe-area-context';

// Spacing scale tokens (in pixels)
export const SPACING = {
  xs: 4,      // extra small
  sm: 8,      // small
  md: 12,     // medium
  lg: 16,     // large
  xl: 20,     // extra large
  xxl: 24,    // 2x large
  xxxl: 28,   // 3x large
  xxxxl: 32,  // 4x large
} as const;

// Responsive breakpoints
export const BREAKPOINTS = {
  PHONE: 600,      // small phone
  TABLET: 720,     // tablet/split layout
  LARGE: 1024,     // large tablet/desktop
} as const;

// Helper hook to get safe-area insets
export function useSafeAreaInsetsPadding() {
  return useSafeAreaInsets();
}

// Create padding values that respect safe areas
// Usage: createInsetPadding({ top: true, bottom: true })
export function createInsetPadding(
  insets: EdgeInsets,
  edges?: {
    top?: boolean;
    bottom?: boolean;
    left?: boolean;
    right?: boolean;
  }
): {
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
} {
  const padding: {
    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
  } = {};

  if (edges?.top) {
    padding.paddingTop = insets.top;
  }
  if (edges?.bottom) {
    padding.paddingBottom = insets.bottom;
  }
  if (edges?.left) {
    padding.paddingLeft = insets.left;
  }
  if (edges?.right) {
    padding.paddingRight = insets.right;
  }

  return padding;
}

// Common padding combinations for modals and screens
export const INSET_PRESETS = {
  // For modal panels (top only, to clear status bar)
  modalTop: (insets: EdgeInsets) => ({
    paddingTop: Math.max(insets.top, SPACING.md),
  }),

  // For full-screen modals (top + bottom for home indicator)
  modalFull: (insets: EdgeInsets) => ({
    paddingTop: Math.max(insets.top, SPACING.md),
    paddingBottom: Math.max(insets.bottom, SPACING.sm),
  }),

  // For screens that should respect all safe areas
  screen: (insets: EdgeInsets) => ({
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  }),
};
