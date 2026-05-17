import { Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { typography } from '@/constants/typography-tokens';

export type TypographyVariant = keyof typeof typography;

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  variant?: TypographyVariant;
  bold?: boolean;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  variant = 'bodyMd',
  bold = false,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        typography[variant],
        bold ? { fontWeight: 'bold' } : undefined,
        style,
      ]}
      {...rest}
    />
  );
}
