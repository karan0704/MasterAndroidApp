import { MMKV } from 'react-native-mmkv';
import { ThemeName } from './colors';

// Initialize MMKV storage for theme preferences
const themeStorage = new MMKV({
  id: 'app.theme',
});

const THEME_KEY = 'theme';
const DEFAULT_THEME: ThemeName = 'universal';

// Get current theme preference from storage
export function getStoredTheme(): ThemeName {
  const stored = themeStorage.getString(THEME_KEY);
  if (stored === 'amoled' || stored === 'bw' || stored === 'universal') {
    return stored;
  }
  return DEFAULT_THEME;
}

// Save theme preference to storage
export function setStoredTheme(theme: ThemeName): void {
  themeStorage.set(THEME_KEY, theme);
}

// Reset theme to default
export function resetTheme(): void {
  themeStorage.delete(THEME_KEY);
}
