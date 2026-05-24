import { radius, semanticColors, spacing } from '@/constants';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { ThemedText } from '../../themed-text';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'sm' | 'md' | 'lg';

type MainButtonProp = {
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  title?: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  size?: ButtonSize;
  onPress: () => void;
};

export function MainButton({
  variant = 'primary',
  disabled = false,
  onPress,
  size = 'md',
  title,
  children,
  style,
}: MainButtonProp) {
  const buttonStyle = variant === 'primary' ? styles.primaryButton : styles.secondaryButton;
  const buttonTextStyle =
    variant === 'primary'
      ? disabled
        ? styles.disabledButtonText
        : styles.primaryButtonText
      : disabled
        ? styles.disabledButtonText
        : styles.secondaryButtonText;
  const buttonSizeStyle = size === 'sm' ? styles.smallButton : size === 'md' ? styles.mediumButton : styles.largeButton;
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.baseButton,
        buttonStyle,
        buttonSizeStyle,
        pressed && (variant === 'primary' ? styles.primaryPressed : styles.secondaryPressed),
        disabled && styles.disabledButton,
        style,
      ]}
    >
      {children}
      {title && (
        <ThemedText style={buttonTextStyle} variant="bodyLg">
          {title}
        </ThemedText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: semanticColors.light.border.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
  },
  smallButton: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
  },
  mediumButton: {
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[8],
  },
  largeButton: {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[10],
  },
  primaryButton: {
    backgroundColor: semanticColors.light.action.primaryBg,
  },
  primaryButtonText: {
    color: semanticColors.light.action.primaryFg,
  },
  secondaryButton: {
    backgroundColor: semanticColors.light.action.secondaryBg,
  },
  secondaryButtonText: {
    color: semanticColors.light.action.secondaryFg,
  },
  primaryPressed: {
    backgroundColor: semanticColors.light.action.primaryPressed,
    opacity: 0.9,
  },
  secondaryPressed: {
    backgroundColor: semanticColors.light.state.pressed,
  },
  disabledButton: {
    backgroundColor: semanticColors.light.action.disabledBg,
    opacity: 0.5,
  },
  disabledButtonText: {
    color: semanticColors.light.action.disabledFg,
  },
});
