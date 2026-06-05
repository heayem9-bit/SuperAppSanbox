import { useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, Stack } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import {
  Pressable,
  Modal,
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { ThemedView } from '@/components/ui/view';
import { ThemedText } from '@/components/ui/text';
import { useTheme } from '@/hooks/use-theme';

const TILES = [
  {
    nameKey: 'home.partners' as const,
    symbolIos: 'building.2',
    symbolAndroid: 'business',
    href: '/sandbox',
    params: { uri: encodeURIComponent('https://qavetacledaminiapp.udaya-tech.com/#/?profile=eyJmdWxsbmFtZSI6IlllbSBIZWEiLCJwaG9uZSI6IjA5NjI2MzU5NDUifQ') },
  },
  {
    nameKey: 'home.profile' as const,
    symbolIos: 'person.crop.circle',
    symbolAndroid: 'account_circle',
    href: '/profile',
    params: {},
  },
] as const;

const LANGUAGES = [
  { code: 'en', flag: '🇬🇧', name: 'English', nativeName: 'English' },
  { code: 'km', flag: '🇰🇭', name: 'Khmer', nativeName: 'ខ្មែរ' },
] as const;

export function HomeView() {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const [sheetVisible, setSheetVisible] = useState(false);
  const [slideAnim] = useState(() => new Animated.Value(300));

  const openSheet = useCallback(() => {
    setSheetVisible(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 4,
    }).start();
  }, [slideAnim]);

  const closeSheet = useCallback(() => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 220,
      useNativeDriver: true,
    }).start(() => {
      slideAnim.setValue(300);
      setSheetVisible(false);
    });
  }, [slideAnim]);

  const selectLanguage = useCallback((code: string) => {
    i18n.changeLanguage(code);
    closeSheet();
  }, [i18n, closeSheet]);

  const currentLang = LANGUAGES.find(l => i18n.language.startsWith(l.code)) ?? LANGUAGES[0];

  return (
    <>
      <Stack.Screen
        options={{
          title: t('home.title'),
          headerStyle: {
            backgroundColor: theme.primary,
          },
          headerTitleStyle: {
            color: theme.white,
          },
          headerRight: () => (
            <Pressable
              onPress={openSheet}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
              android_ripple={{ color: '#ffffff30', radius: 24 }}
            >
              <Text style={{ fontSize: 20, lineHeight: 24 }}>{currentLang.flag}</Text>
            </Pressable>
          ),
        }}
      />

      <ThemedView style={{ flex: 1 }}>
        <SafeAreaView
          edges={['bottom', 'left', 'right']}
          style={{ flex: 1 }}
        >
          <ThemedView
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 12,
              padding: 16,
            }}
          >
            {TILES.map((tile) => (
              <Link
                key={tile.nameKey}
                href={{
                  pathname: tile.href as any,
                  params: tile.params as any,
                }}
                asChild
              >
                <Pressable style={{ flexGrow: 1, flexBasis: '45%' }}>
                  <ThemedView
                    type="backgroundElement"
                    style={{
                      padding: 20,
                      borderRadius: 16,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <SymbolView
                      name={{
                        ios: tile.symbolIos,
                        android: tile.symbolAndroid,
                        web: tile.symbolAndroid,
                      }}
                      size={40}
                      tintColor={theme.primary}
                    />
                    <ThemedText
                      style={{
                        marginTop: 8,
                        fontWeight: '600',
                        textAlign: 'center',
                      }}
                    >
                      {t(tile.nameKey)}
                    </ThemedText>
                  </ThemedView>
                </Pressable>
              </Link>
            ))}
          </ThemedView>
        </SafeAreaView>
      </ThemedView>

      {/* Language Selection Bottom Sheet */}
      <Modal
        visible={sheetVisible}
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={closeSheet}
      >
        {/* Dimmed backdrop */}
        <TouchableWithoutFeedback onPress={closeSheet}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.45)',
            }}
          />
        </TouchableWithoutFeedback>

        {/* Sheet panel */}
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingHorizontal: 20,
            paddingTop: 12,
            paddingBottom: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.12,
            shadowRadius: 8,
            elevation: 16,
            backgroundColor: theme.background,
            transform: [{ translateY: slideAnim }],
          }}
        >
          {/* Drag handle */}
          <View
            style={{
              width: 40,
              height: 4,
              borderRadius: 2,
              alignSelf: 'center',
              marginBottom: 16,
              backgroundColor: theme.backgroundSelected,
            }}
          />

          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              marginBottom: 16,
              color: theme.text,
            }}
          >
            {t('home.selectLanguage')}
          </Text>

          {LANGUAGES.map((lang) => {
            const isActive = i18n.language.startsWith(lang.code);
            return (
              <Pressable
                key={lang.code}
                onPress={() => selectLanguage(lang.code)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 14,
                  paddingHorizontal: 12,
                  borderRadius: 12,
                  marginBottom: 8,
                  borderWidth: 1.5,
                  backgroundColor: isActive
                    ? theme.backgroundElement
                    : 'transparent',
                  borderColor: isActive ? theme.primary : 'transparent',
                }}
                android_ripple={{ color: '#00000010' }}
              >
                <Text style={{ fontSize: 32, marginRight: 16, lineHeight: 40 }}>
                  {lang.flag}
                </Text>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      marginBottom: 2,
                      color: theme.text,
                    }}
                  >
                    {lang.nativeName}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: theme.textSecondary,
                    }}
                  >
                    {lang.name}
                  </Text>
                </View>
                {isActive && (
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '700',
                      marginLeft: 8,
                      color: theme.primary,
                    }}
                  >
                    ✓
                  </Text>
                )}
              </Pressable>
            );
          })}

          {/* Bottom safe area spacer */}
          <SafeAreaView edges={['bottom']} />
        </Animated.View>
      </Modal>
    </>
  );
}