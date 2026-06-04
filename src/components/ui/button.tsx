import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from '@/hooks/use-theme';

export interface ButtonProps {
  onPress?: () => void;
  title?: string;
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

export function Button({
  onPress,
  title,
  children,
  variant = 'primary',
  style,
  textStyle,
  disabled = false,
}: ButtonProps) {
  const theme = useTheme();

  const getButtonStyle = (pressed: boolean) => {
    const baseStyle: ViewStyle[] = [styles.button];

    if (disabled) {
      baseStyle.push(styles.disabled);
    }

    if (variant === 'primary') {
      baseStyle.push({ backgroundColor: theme.primary });
    } else if (variant === 'secondary') {
      baseStyle.push({ backgroundColor: theme.backgroundElement });
    } else if (variant === 'ghost') {
      baseStyle.push({ backgroundColor: theme.backgroundElement });
    }

    if (pressed) {
      baseStyle.push(styles.pressed);
    }

    return [baseStyle, style];
  };

  const getTextStyle = () => {
    const baseTextStyle: TextStyle[] = [styles.text];

    if (variant === 'primary') {
      baseTextStyle.push({ color: theme.white });
    } else if (variant === 'secondary') {
      baseTextStyle.push({ color: theme.text });
    } else if (variant === 'ghost') {
      baseTextStyle.push({ color: theme.textSecondary });
    }

    if (disabled) {
      baseTextStyle.push({ color: theme.textSecondary });
    }

    return [baseTextStyle, textStyle];
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => getButtonStyle(pressed)}
      android_ripple={{ color: variant === 'primary' ? '#ffffff20' : '#00000010' }}
    >
      {children ? children : <Text style={getTextStyle()}>{title}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
