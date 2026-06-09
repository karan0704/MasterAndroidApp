// Color token system supporting three themes: Universal (warm), AMOLED Black, and B&W

export type ThemeName = 'universal' | 'amoled' | 'bw';

export interface ColorTokens {
  // Neutrals & Backgrounds
  black: string;
  darkBrown: string;
  darkBrownAlt: string;
  lightBg: string;
  panelBg: string;
  creamBg: string;
  whiteBg: string;
  almostWhite: string;
  offWhite: string;

  // Text Colors (primary to light)
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textMuted: string;
  textLight: string;
  textLighter: string;
  textLightest: string;
  textPlaceholder: string;

  // UI Surfaces
  buttonPrimary: string;
  buttonPrimaryText: string;
  buttonSecondary: string;
  buttonSecondaryText: string;
  border: string;
  borderLight: string;

  // Status & Categories (semantic colors)
  work: string;         // blue
  health: string;       // green
  personal: string;     // yellow
  important: string;    // red
  error: string;
  errorBg: string;

  // Accent colors
  overlay: string;      // semi-transparent overlay
}

// Universal Theme (warm earthy palette - current design)
export const UNIVERSAL_THEME: ColorTokens = {
  black: '#000000',
  darkBrown: '#1F1A16',
  darkBrownAlt: '#201A14',
  lightBg: '#F4EFE5',
  panelBg: '#F8EEDB',
  creamBg: '#F5EBDD',
  whiteBg: '#FFF9EF',
  almostWhite: '#FFFDF8',
  offWhite: '#FFF7E8',

  textPrimary: '#201A14',
  textSecondary: '#6C4E33',
  textTertiary: '#6D6154',
  textMuted: '#7B6C5D',
  textLight: '#8C7F70',
  textLighter: '#8A7F71',
  textLightest: '#7D746A',
  textPlaceholder: '#BFA486',

  buttonPrimary: '#1F1A16',
  buttonPrimaryText: '#FFF7E8',
  buttonSecondary: '#F3E3CF',
  buttonSecondaryText: '#6C4E33',
  border: '#E7D8C3',
  borderLight: '#BFA486',

  work: '#3B82F6',
  health: '#22C55E',
  personal: '#FACC15',
  important: '#EF4444',
  error: '#991B1B',
  errorBg: '#FEE2E2',

  overlay: 'rgba(6, 6, 6, 0.46)',
};

// AMOLED Black Theme (pure black background with adjusted contrast)
export const AMOLED_THEME: ColorTokens = {
  black: '#000000',
  darkBrown: '#0A0A0A',
  darkBrownAlt: '#1A1A1A',
  lightBg: '#0F0F0F',
  panelBg: '#1A1A1A',
  creamBg: '#2A2A2A',
  whiteBg: '#1F1F1F',
  almostWhite: '#3A3A3A',
  offWhite: '#404040',

  textPrimary: '#FFFFFF',
  textSecondary: '#E0E0E0',
  textTertiary: '#CCCCCC',
  textMuted: '#AAAAAA',
  textLight: '#888888',
  textLighter: '#777777',
  textLightest: '#666666',
  textPlaceholder: '#555555',

  buttonPrimary: '#FFFFFF',
  buttonPrimaryText: '#000000',
  buttonSecondary: '#404040',
  buttonSecondaryText: '#E0E0E0',
  border: '#333333',
  borderLight: '#555555',

  work: '#60A5FA',      // brighter blue for contrast
  health: '#4ADE80',    // brighter green
  personal: '#FCD34D',  // brighter yellow
  important: '#F87171', // brighter red
  error: '#FCA5A5',     // brighter red for error
  errorBg: '#7F1D1D',   // dark red background

  overlay: 'rgba(0, 0, 0, 0.8)',
};

// Black & White Theme (pure greyscale)
export const BW_THEME: ColorTokens = {
  black: '#000000',
  darkBrown: '#1A1A1A',
  darkBrownAlt: '#2A2A2A',
  lightBg: '#F5F5F5',
  panelBg: '#EEEEEE',
  creamBg: '#E8E8E8',
  whiteBg: '#FFFFFF',
  almostWhite: '#FAFAFA',
  offWhite: '#F0F0F0',

  textPrimary: '#000000',
  textSecondary: '#333333',
  textTertiary: '#555555',
  textMuted: '#777777',
  textLight: '#999999',
  textLighter: '#AAAAAA',
  textLightest: '#BBBBBB',
  textPlaceholder: '#CCCCCC',

  buttonPrimary: '#000000',
  buttonPrimaryText: '#FFFFFF',
  buttonSecondary: '#CCCCCC',
  buttonSecondaryText: '#000000',
  border: '#DDDDDD',
  borderLight: '#EEEEEE',

  work: '#333333',
  health: '#333333',
  personal: '#666666',
  important: '#000000',
  error: '#000000',
  errorBg: '#F0F0F0',

  overlay: 'rgba(0, 0, 0, 0.5)',
};

// Get theme by name
export function getTheme(themeName: ThemeName): ColorTokens {
  switch (themeName) {
    case 'amoled':
      return AMOLED_THEME;
    case 'bw':
      return BW_THEME;
    case 'universal':
    default:
      return UNIVERSAL_THEME;
  }
}

// All available themes
export const ALL_THEMES: { name: ThemeName; label: string }[] = [
  { name: 'universal', label: 'Universal' },
  { name: 'amoled', label: 'AMOLED Black' },
  { name: 'bw', label: 'Black & White' },
];
