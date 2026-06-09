import React, { createContext, useContext, useEffect, useState } from 'react';
import { ColorTokens, ThemeName, getTheme } from './colors';
import { getStoredTheme, setStoredTheme } from './store';

interface ThemeContextType {
  theme: ThemeName;
  colors: ColorTokens;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeName>('universal');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load theme from storage on mount
  useEffect(() => {
    const storedTheme = getStoredTheme();
    setThemeState(storedTheme);
    setIsLoaded(true);
  }, []);

  const handleSetTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
    setStoredTheme(newTheme);
  };

  const colors = getTheme(theme);

  // Don't render children until theme is loaded from storage
  if (!isLoaded) {
    return null;
  }

  const value: ThemeContextType = {
    theme,
    colors,
    setTheme: handleSetTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
