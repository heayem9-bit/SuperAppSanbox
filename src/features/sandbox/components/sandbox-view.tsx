import { Stack, useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView, WebViewNavigation } from 'react-native-webview';

import { getProfile, handleBridgeMessage, injectedBridge } from '@/bridge';
import { BackButton } from '@/components/ui/back-button';
import { ThemedView } from '@/components/ui/view';
import { getProfile as getDbProfile } from '@/features/profile/services/db';
import { useTheme } from '@/hooks/use-theme';
import { UserProfile } from '@/types/bridge.types';
import { hmacSHA256, SECRET_KEY, uppercase } from '@/utils/crypto';
import { BackHandler } from 'react-native';

interface SandboxViewProps {
  decodedUri: string;
}

export function SandboxView({ decodedUri }: SandboxViewProps) {

  const theme = useTheme();
  const router = useRouter();

  const [headerTitle, setHeaderTitle] = useState<string>('');
  const [headerBgColor, setHeaderBgColor] = useState<string>(theme.primary);
  const [headerTextColor, setHeaderTextColor] = useState<string>(theme.white);
  const [safeAreaBgColor, setSafeAreaBgColor] = useState<string>(theme.primary);

  const webViewLoadedRef = useRef(false);
  const [profileData, setProfileData] = useState<UserProfile | null>(null);

  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(true);

  const onNavigationStateChange = useCallback(
    (navState: WebViewNavigation) => {
      setCanGoBack(navState.canGoBack);
    },
    [canGoBack],
  );

  const handleBackPress = () => {
    webViewRef.current?.goBack();
  };

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        webViewRef.current?.goBack();
        return true;
      },
    );

    return () => subscription.remove();
  }, []);


  useEffect(() => {
    async function prepareProfile() {
      const dbProfile = getDbProfile();

      const profile = {
        fullName: dbProfile?.fullname || "Yem Hea",
        sex: dbProfile?.gender || "F",
        nationality: dbProfile?.nationality || "KHM",
        phone: dbProfile?.phone || "09635945",
        email: dbProfile?.email || "heayem7@gmail.com",
        lang: "en",
        dob: "1990-01-01",
      };

      const plainText = JSON.stringify(profile);
      const signature = await hmacSHA256(uppercase(plainText), SECRET_KEY).then(
        (hashedValue: string) => uppercase(hashedValue)
      );

      const signedProfile: UserProfile = {
        ...profile,
        signature,
      };

      setProfileData(signedProfile);
    }

    prepareProfile();

  }, []);

  useEffect(() => {
    if (profileData && webViewLoadedRef.current) {
      getProfile(webViewRef, profileData);
    }
  }, [profileData, webViewRef]);

  const onMessage = async (event: any) => {
    await handleBridgeMessage(
      event.nativeEvent.data,
      {
        onSetBarTitle: (title, bgColor, color, safeAreaColor) => {
          if (title) setHeaderTitle(title);
          if (bgColor) setHeaderBgColor(bgColor);
          if (color) setHeaderTextColor(color);
          if (safeAreaColor) setSafeAreaBgColor(safeAreaColor);
        },
        handleCloseMiniApp: () => {
          router.replace('/');
        }
      }
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: headerTitle,
          headerStyle: { backgroundColor: headerBgColor },
          headerTintColor: headerTextColor,
          headerLeft: () => (
            <BackButton onPress={handleBackPress} />
          ),
          headerBackVisible: false,
          gestureEnabled: false,
        }}
      />

      <ThemedView style={{ flex: 1 }}>
        <SafeAreaView style={
          {
            flex: 1,
            backgroundColor: safeAreaBgColor,
          }}
          edges={['left', 'right', 'bottom']}
        >
          <WebView
            ref={webViewRef}
            source={{ uri: decodedUri }}
            injectedJavaScript={injectedBridge}
            onMessage={onMessage}
            onNavigationStateChange={onNavigationStateChange}
            javaScriptEnabled
            onLoadEnd={() => {
              webViewLoadedRef.current = true;
              if (profileData) {
                getProfile(webViewRef, profileData);
              }
            }}
          />
        </SafeAreaView>
      </ThemedView>
    </>
  );
}
