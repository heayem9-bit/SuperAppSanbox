import { useRef, useState, useEffect, useCallback } from 'react';
import { BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRouter } from 'expo-router';

export function useSandboxState() {

  const router = useRouter();
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);

  const onNavigationStateChange = useCallback((navState: any) => {
    setCanGoBack(navState.canGoBack);
  }, []);

  const handleBackPress = useCallback(() => {
    if (canGoBack && webViewRef.current) {
      webViewRef.current.goBack();
    } else {
      router.back(); // exit screen
    }
  }, [canGoBack, router]);

  // Handle Android hardware back button cleanly with subscription lifecycle management
  useEffect(() => {
    const onHardwareBack = () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true; // handled, prevent exit
      }
      return false; // let system default exit the screen
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onHardwareBack);
    return () => {
      subscription.remove();
    };
  }, [canGoBack]);

  return {
    webViewRef,
    canGoBack,
    onNavigationStateChange,
    handleBackPress,
  };
}
