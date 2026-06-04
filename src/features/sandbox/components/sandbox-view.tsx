import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

import { ThemedView } from '@/components/ui/view';
import { BackButton } from '@/components/ui/back-button';
import { useSandboxState } from '../hooks/use-sandbox-state';
import { handleBridgeMessage, injectedBridge } from '@/bridge';
import { useTheme } from '@/hooks/use-theme';

interface SandboxViewProps {
  decodedUri: string;
}

export function SandboxView({ decodedUri }: SandboxViewProps) {

  const theme = useTheme();

  const {
    webViewRef,
    onNavigationStateChange,
    handleBackPress,
  } = useSandboxState();

  const onMessage = async (event: any) => {
    await handleBridgeMessage(event.nativeEvent.data);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Mini app',
          headerStyle: { backgroundColor: theme.primary },
          headerTintColor: theme.white,
          headerLeft: () => (
            <BackButton onPress={handleBackPress} />
          ),
        }}
      />

      <ThemedView style={{ flex: 1 }}>
        <SafeAreaView style={
          {
            flex: 1,
            backgroundColor: theme.primary,
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
          />
        </SafeAreaView>
      </ThemedView>
    </>
  );
}
