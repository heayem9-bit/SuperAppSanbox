import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';

import { ThemedText } from '@/components/ui/text';
import { useTheme } from '@/hooks/use-theme';

interface SplashScreenProps {
  onAnimationComplete: () => void;
}

export default function SplashScreen({
  onAnimationComplete,
}: SplashScreenProps) {
  const theme = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      onAnimationComplete();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: theme.primary,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={require('../../../../assets/logos/app-logo.png')}
          style={{
            width: 120,
            height: 120,
          }}
          placeholder={blurhash}
          contentFit="contain"
        />

        <ThemedText
          style={{
            marginTop: 12,
            fontSize: 24,
            fontWeight: '700',
            color: theme.white,
          }}
        >
          UAT APP
        </ThemedText>
      </View>

      <ActivityIndicator
        size="small"
        color={theme.white}
        style={{
          position: 'absolute',
          bottom: 60,
        }}
      />
    </View>
  );
}