import '@/i18n';
import { useEffect, useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider, Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import SplashScreen from '@/features/splash/components/splash-screen';
import { initProfileDb } from '@/features/profile/services/db';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    initProfileDb();
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

      {!isReady ? (
        <SplashScreen onAnimationComplete={() => setIsReady(true)} />
      ) : (
        <Stack screenOptions={{ headerShown: true }} />
      )}

    </ThemeProvider>
  );
}