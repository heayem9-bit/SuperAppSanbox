import { useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider, Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

import SplashScreen from '@/features/splash/components/splash-screen';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [showSplash, setShowSplash] = useState(true);

  return (
    <ThemeProvider
      value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <Stack screenOptions={{ headerShown: true }} />

      {showSplash && (
        <SplashScreen onAnimationComplete={() => setShowSplash(false)} />
      )}
    </ThemeProvider>
  );
}