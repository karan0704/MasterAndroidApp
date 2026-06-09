import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider, useTheme } from './src/shared/theme';
import { AppRoot } from './src/app/AppRoot';

// Inner component to access theme context
function AppWithTheme() {
  const { colors } = useTheme();

  // Update status bar color based on theme
  useEffect(() => {
    StatusBar.setBackgroundColor(colors.lightBg);
  }, [colors.lightBg]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.lightBg} />
      <AppRoot />
    </>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppWithTheme />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
