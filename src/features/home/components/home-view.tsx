import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, Stack } from 'expo-router';

import { ThemedView } from '@/components/ui/view';
import {
  BottomTabInset,
  Spacing,
} from '@/constants/theme';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';

// Kept outside the component to prevent memory recreation on every render
const LIST_SCREENS = [
  {
    name: 'Acleda',
    href: '/sandbox' as const,
    uri: 'https://qavetacledaminiapp.udaya-tech.com/#/?profile=eyJmdWxsbmFtZSI6IlllbSBIZWEiLCJwaG9uZSI6IjA5NjI2MzU5NDUifQ',
  }
];

export function HomeView() {

  const theme = useTheme();

  return (
    <>
      <Stack.Screen
        options={{
          title: 'UAT app',
          headerStyle: {
            backgroundColor: theme.primary,
          },
          headerTitleStyle: {
            color: theme.white,
          },
        }}
      />

      <ThemedView
        style={{
          flex: 1,
          flexDirection: 'row',
        }}
      >
        <SafeAreaView
          edges={['bottom', 'left', 'right']}
          style={{
            flex: 1,
            alignItems: 'center',
            maxWidth: '40%',
            paddingTop: Spacing.three,
            paddingHorizontal: Spacing.three,
            paddingBottom: BottomTabInset + Spacing.two,
            gap: Spacing.three,
          }}
        >
          {LIST_SCREENS.map((screen) => (
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
              <Button variant='secondary' title={screen.name} />
            </Link>
          ))}
        </SafeAreaView>
      </ThemedView>
    </>
  );
}