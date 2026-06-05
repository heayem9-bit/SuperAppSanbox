import { useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider, Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

import SplashScreen from '@/features/splash/components/splash-screen';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [showSplash, setShowSplash] = useState(true);
  const [appReady, setAppReady] = useState(false);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // Called by SplashScreen when its exit animation begins (not ends),
  // so the Stack is mounted and warmed up while the fade-out plays.
  const handleAppReady = () => {
    setAppReady(true);
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* Splash renders FIRST — sits above Stack in paint order via zIndex */}
      {showSplash && (
        <SplashScreen
          onAnimationComplete={handleSplashComplete}
          onAppReady={handleAppReady}
        />
      )}

      {/* Stack only mounts once splash begins fading — no cold-start flicker */}
      {appReady && <Stack screenOptions={{ headerShown: true }} />}
    </ThemeProvider>
  );
}