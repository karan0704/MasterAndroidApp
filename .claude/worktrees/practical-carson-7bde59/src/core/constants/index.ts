// Core application constants

// Responsive breakpoints (in pixels)
export const BREAKPOINTS = {
  PHONE: 600,      // small phone
  TABLET: 720,     // tablet/split layout threshold
  LARGE: 1024,     // large tablet/desktop
} as const;

// Shadow definitions (for elevation effects)
export const SHADOWS = {
  // iOS: shadow styling
  // Android: elevation prop
  small: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
} as const;

// Border radius scale
export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  pill: 999,
} as const;

// Animation durations (milliseconds)
export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
} as const;

// Z-index stack
export const Z_INDEX = {
  hidden: -1,
  base: 0,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modal: 400,
  tooltip: 500,
} as const;
