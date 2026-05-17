/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';
import { semanticColors } from './color-tokens';


export const Colors = {
  light: {
    text: semanticColors.light.text.primary,
    background: semanticColors.light.bg.primary,
    tint: semanticColors.light.icon.primary,
    icon: semanticColors.light.icon.secondary,
    tabIconDefault: semanticColors.light.icon.tertiary,
    tabIconSelected: semanticColors.light.icon.primary,
  },
  dark: {
    text: semanticColors.dark.text.primary,
    background: semanticColors.dark.bg.primary,
    tint: semanticColors.dark.icon.primary,
    icon: semanticColors.dark.icon.secondary,
    tabIconDefault: semanticColors.dark.icon.tertiary,
    tabIconSelected: semanticColors.dark.icon.primary,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
