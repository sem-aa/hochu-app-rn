import { Text, type TextProps } from 'react-native';

import { semanticColors } from '@/constants';
import { typography } from '@/constants/typography-tokens';
import { useThemeColor } from '@/hooks/use-theme-color';

export type TypographyVariant = keyof typeof typography;

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  variant?: TypographyVariant;
  bold?: boolean;
  center?: boolean;
};

export function ThemedText({
  style,
  lightColor = semanticColors.light.text.primary,
  darkColor = semanticColors.dark.text.primary,
  variant = 'bodyMd',
  bold = false,
  center = false,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color, textAlign: center ? 'center' : 'left' },
        typography[variant],
        bold ? { fontWeight: 'bold' } : undefined,
        style,
      ]}
      {...rest}
    />
  );
}
