import { semanticColors } from '@/constants/color-tokens';
import { spacing } from '@/constants/spacing-tokens';
import { SymbolViewProps } from 'expo-symbols';
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { IconSymbol } from '../icon-symbol';
import { type ButtonSize, type ButtonVariant, MainButton } from './main-button';

type IconButtonProp = {
  icon: SymbolViewProps['name'];
  onPress: () => void;
  title?: string;
  variant?: ButtonVariant;
  sizeIcon?: number;
  styleIcon?: StyleProp<TextStyle>;
  size?: ButtonSize;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function IconButton({
  icon,
  onPress,
  title,
  style,
  variant = 'primary',
  size = 'md',
  sizeIcon = 20,
  styleIcon,
  disabled = false,
}: IconButtonProp) {
  const iconColor = disabled
    ? semanticColors.light.icon.tertiary
    : variant === 'primary'
      ? semanticColors.dark.text.primary
      : semanticColors.light.text.primary;
  return (
    <MainButton
      disabled={disabled}
      onPress={onPress}
      variant={variant}
      title={title}
      size={size}
      style={title ? style : styles.iconButton}
    >
      <IconSymbol name={icon} size={sizeIcon} color={iconColor} style={styleIcon} />
    </MainButton>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[2],
  },
});
