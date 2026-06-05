import { useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider, Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

import SplashScreen from '@/features/splash/components/splash-screen';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [showSplash, setShowSplash] = useState(true);
  const [appReady, setAppReady] = useState(false);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {showSplash && (
        <SplashScreen
          onAnimationComplete={() => setShowSplash(false)}
          onAppReady={() => setAppReady(true)}
        />
      )}
      {appReady && <Stack screenOptions={{ headerShown: true }} />}
    </ThemeProvider>
  );
}