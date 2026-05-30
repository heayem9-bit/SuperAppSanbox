import { ThemedView } from '@/components/themed-view';
import { BackButton } from '@/components/ui/buttons/BackButton';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { Linking } from 'react-native';


export default function SandboxScreen() {
    const { uri } = useLocalSearchParams();
    const router = useRouter();

    const decodedUri = uri ? decodeURIComponent(uri as string) : '';

    const webViewRef = useRef<WebView>(null);
    const [canGoBack, setCanGoBack] = useState(false);

    const onNavigationStateChange = (navState: any) => {
        setCanGoBack(navState.canGoBack);
    };

    // Handle Android hardware back
    BackHandler.addEventListener('hardwareBackPress', () => {
        if (canGoBack && webViewRef.current) {
            webViewRef.current.goBack();
            return true; // prevent exit
        }
        return false; // exit screen
    });



    const injectedBridge = `
            window.NativeBridge = {
                openMap: function(lat, lng) {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: 'OPEN_MAP',
                    lat,
                    lng
                }));
                }
            };
            true;
            `;


    const onMessage = async (event: any) => {
        try {
            const data = JSON.parse(event.nativeEvent.data);

            if (data.type === 'OPEN_MAP') {
                const query = `${data.lat},${data.lng}`;
                const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
                await Linking.openURL(url);
            }
        } catch {
            console.log(event.nativeEvent.data);
        }
    };

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Sandbox',
                    headerStyle: { backgroundColor: 'orange' },
                    headerTintColor: '#fff',

                    headerLeft: () => (
                        <BackButton
                            onPress={() => {
                                if (canGoBack) {
                                    webViewRef.current?.goBack();
                                } else {
                                    router.back(); // exit screen
                                }
                            }}
                        />
                    ),
                }}
            />

            <ThemedView style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
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