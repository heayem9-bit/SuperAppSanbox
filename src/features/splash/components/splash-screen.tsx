import { useEffect } from 'react';
import { Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  runOnJS,
  Easing,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/ui/text';
import { Image } from 'expo-image';
import { useTheme } from '@/hooks/use-theme';

interface SplashScreenProps {
  onAnimationComplete: () => void;
  onAppReady?: () => void; // fired when exit fade STARTS — use to mount Stack early
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function SplashScreen({ onAnimationComplete, onAppReady }: SplashScreenProps) {
  const theme = useTheme();
  const containerOpacity = useSharedValue(1);
  const logoScale = useSharedValue(0.3);
  const logoOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(SCREEN_HEIGHT);

  useEffect(() => {
    // Entrance
    cardTranslateY.value = withTiming(0, {
      duration: 800,
      easing: Easing.out(Easing.back(1.2)),
    });

    logoScale.value = withDelay(300, withTiming(1, { duration: 600, easing: Easing.out(Easing.quad) }));
    logoOpacity.value = withDelay(300, withTiming(1, { duration: 600 }));

    // Signal app ready at the START of exit delay — Stack mounts while splash still covers screen
    if (onAppReady) {
      const timer = setTimeout(() => {
        runOnJS(onAppReady)();
      }, 2000); // same as withDelay below
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Exit — fade out after 2s, then unmount
    containerOpacity.value = withDelay(
      2000,
      withTiming(0, { duration: 500, easing: Easing.inOut(Easing.quad) }, (finished) => {
        if (finished) {
          runOnJS(onAnimationComplete)();
        }
      })
    );
  }, []);

  const animatedContainerStyle = useAnimatedStyle(() => ({ opacity: containerOpacity.value }));
  const animatedCardStyle = useAnimatedStyle(() => ({ transform: [{ translateY: cardTranslateY.value }] }));
  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  return (
    <Animated.View
      style={[
        {
          width: '100%',
          height: '100%',
          backgroundColor: theme.black,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 0, right: 0, bottom: 0, left: 0,
          zIndex: 9999,
        },
        animatedContainerStyle,
      ]}
    >
      <Animated.View
        style={[
          {
            width: '100%',
            height: '100%',
            backgroundColor: theme.primary,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 10,
          },
          animatedCardStyle,
        ]}
      >
        <Animated.View
          style={[{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }, animatedLogoStyle]}
        >
          <Image
            style={{ width: 150, height: 150 }}
            source={require('../../../../assets/logos/app-logo.png')}
            placeholder={blurhash}
            contentFit="contain"
            transition={1000}
          />
          <ThemedText style={{ color: theme.white, fontSize: 28, fontWeight: 'bold' }}>
            UAT APP
          </ThemedText>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}