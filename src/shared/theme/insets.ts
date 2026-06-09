import { EdgeInsets } from 'react-native-safe-area-context';
import { SPACING } from './spacing';

// Safe-area inset utilities for consistent handling across platforms

export function getSafeTopInset(insets: EdgeInsets, minPadding: number = SPACING.md): number {
  return Math.max(insets.top, minPadding);
}

export function getSafeBottomInset(insets: EdgeInsets, minPadding: number = SPACING.sm): number {
  return Math.max(insets.bottom, minPadding);
}

export function getSafeLeftInset(insets: EdgeInsets, minPadding: number = SPACING.sm): number {
  return Math.max(insets.left, minPadding);
}

export function getSafeRightInset(insets: EdgeInsets, minPadding: number = SPACING.sm): number {
  return Math.max(insets.right, minPadding);
}

// Vertical inset offset (for scroll views that need to account for top/bottom safe areas)
export function getVerticalInsetOffset(insets: EdgeInsets): number {
  return insets.top + insets.bottom;
}

// Horizontal inset offset
export function getHorizontalInsetOffset(insets: EdgeInsets): number {
  return insets.left + insets.right;
}

// Build complete padding object for container
export function buildInsetPadding(
  insets: EdgeInsets,
  options?: {
    top?: boolean | number;
    bottom?: boolean | number;
    left?: boolean | number;
    right?: boolean | number;
    minPadding?: number;
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

  if (options?.top === true) {
    padding.paddingTop = getSafeTopInset(insets, options?.minPadding);
  } else if (typeof options?.top === 'number') {
    padding.paddingTop = Math.max(insets.top, options.top);
  }

  if (options?.bottom === true) {
    padding.paddingBottom = getSafeBottomInset(insets, options?.minPadding);
  } else if (typeof options?.bottom === 'number') {
    padding.paddingBottom = Math.max(insets.bottom, options.bottom);
  }

  if (options?.left === true) {
    padding.paddingLeft = getSafeLeftInset(insets, options?.minPadding);
  } else if (typeof options?.left === 'number') {
    padding.paddingLeft = Math.max(insets.left, options.left);
  }

  if (options?.right === true) {
    padding.paddingRight = getSafeRightInset(insets, options?.minPadding);
  } else if (typeof options?.right === 'number') {
    padding.paddingRight = Math.max(insets.right, options.right);
  }

  return padding;
}
