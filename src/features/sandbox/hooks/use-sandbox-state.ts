import { useCallback, useEffect, useRef, useState } from 'react';
import { BackHandler } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';

export function useSandboxState() {
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

  return {
    webViewRef,
    canGoBack,
    onNavigationStateChange,
    handleBackPress,
  };
}