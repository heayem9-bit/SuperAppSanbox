import { StyleSheet, Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, Stack } from 'expo-router';

import { ThemedView } from '@/components/themed-view';
import {
  BottomTabInset,
  MaxContentWidth,
  Spacing,
} from '@/constants/theme';

export default function HomeScreen() {
  const listScreen = [
    {
      name: 'Sandbox',
      href: '/sandbox' as const,
      // uri: 'http://192.168.1.123:5173/?profile=eyJmdWxsbmFtZSI6IlllbSBIZWEiLCJwaG9uZSI6IjA5NiAyNiAzNSA5NDUifQ=='
      uri: 'https://qavetacledaminiapp.udaya-tech.com/#/?profile=eyJmdWxsbmFtZSI6IlllbSBIZWEiLCJwaG9uZSI6IjA5NjI2MzU5NDUifQ',
    }
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: 'lightblue',
          },
        }}
      />

      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>


          {listScreen.map((screen) => (
            <Link
              key={screen.href}
              href={{
                pathname: screen.href,
                params: {
                  uri: encodeURIComponent(screen.uri),
                },
              }}
              asChild
            >
              <Pressable
                style={styles.box}
                android_ripple={{ color: '#00000010' }}
              >
                <Text style={styles.boxText}>{screen.name}</Text>
              </Pressable>
            </Link>
          ))}

        </SafeAreaView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.three,
    gap: Spacing.three,
  },
  box: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#0078ff',
    borderRadius: 8,
    alignItems: 'center',
  },
  boxText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});