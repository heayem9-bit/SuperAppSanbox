import { useEffect, useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider, Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import * as ExpoSplashScreen from 'expo-splash-screen';

import SplashScreen from '@/features/splash/components/splash-screen';

ExpoSplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await ExpoSplashScreen.hideAsync();
      } catch (error) {
        console.error(error);
        await ExpoSplashScreen.hideAsync();
      }
    };

    init();
  }, []);

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