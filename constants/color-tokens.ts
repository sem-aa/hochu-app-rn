export const primitives = {
  neutral: {
    0: '#FFFFFF',
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#111111',
    1000: '#000000',
  },
  success: {
    100: '#DCFCE7',
    500: '#22C55E',
    900: '#14532D',
  },
  warning: {
    100: '#FEF3C7',
    500: '#F59E0B',
    900: '#78350F',
  },
  error: {
    100: '#FEE2E2',
    500: '#EF4444',
    900: '#7F1D1D',
  },
  info: {
    100: '#DBEAFE',
    500: '#3B82F6',
    900: '#1E3A5F',
  },
} as const;

export const semanticColors = {
  light: {
    bg: {
      primary: primitives.neutral[0],
      secondary: primitives.neutral[50],
      tertiary: primitives.neutral[100],
    },
    surface: {
      primary: primitives.neutral[0],
      secondary: primitives.neutral[50],
      inverse: primitives.neutral[950],
    },
    text: {
      primary: primitives.neutral[950],
      secondary: primitives.neutral[600],
      tertiary: primitives.neutral[500],
      disabled: primitives.neutral[400],
      inverse: primitives.neutral[0],
      onBrand: primitives.neutral[0],
    },
    border: {
      primary: primitives.neutral[200],
      secondary: primitives.neutral[300],
      focus: primitives.neutral[950],
      disabled: primitives.neutral[300],
      danger: primitives.error[500],
    },
    icon: {
      primary: primitives.neutral[950],
      secondary: primitives.neutral[600],
      tertiary: primitives.neutral[500],
      disabled: primitives.neutral[400],
      inverse: primitives.neutral[0],
      onBrand: primitives.neutral[0],
    },
    action: {
      primaryBg: primitives.neutral[950],
      primaryFg: primitives.neutral[0],
      secondaryBg: primitives.neutral[0],
      secondaryFg: primitives.neutral[950],
      ghostFg: primitives.neutral[950],
      disabledBg: primitives.neutral[200],
      disabledFg: primitives.neutral[500],
      primaryPressed: primitives.neutral[800],
    },
    state: {
      hover: primitives.neutral[100],
      pressed: primitives.neutral[200],
      focus: primitives.neutral[950],
      disabled: primitives.neutral[100],
    },
    feedback: {
      successBg: primitives.success[100],
      successFg: primitives.success[500],
      warningBg: primitives.warning[100],
      warningFg: primitives.warning[500],
      dangerBg: primitives.error[100],
      dangerFg: primitives.error[500],
      infoBg: primitives.info[100],
      infoFg: primitives.info[500],
    },
  },
  dark: {
    bg: {
      primary: primitives.neutral[950],
      secondary: primitives.neutral[900],
      tertiary: primitives.neutral[800],
    },
    surface: {
      primary: primitives.neutral[900],
      secondary: primitives.neutral[800],
      inverse: primitives.neutral[0],
    },
    text: {
      primary: primitives.neutral[0],
      secondary: primitives.neutral[300],
      tertiary: primitives.neutral[400],
      disabled: primitives.neutral[600],
      inverse: primitives.neutral[950],
      onBrand: primitives.neutral[950],
    },
    border: {
      primary: primitives.neutral[800],
      secondary: primitives.neutral[700],
      focus: primitives.neutral[0],
      disabled: primitives.neutral[600],
      danger: primitives.error[500],
    },
    icon: {
      primary: primitives.neutral[0],
      secondary: primitives.neutral[400],
      tertiary: primitives.neutral[400],
      disabled: primitives.neutral[600],
      inverse: primitives.neutral[950],
      onBrand: primitives.neutral[950],
    },
    action: {
      primaryBg: primitives.neutral[0],
      primaryFg: primitives.neutral[950],
      secondaryBg: primitives.neutral[950],
      secondaryFg: primitives.neutral[0],
      ghostFg: primitives.neutral[0],
      disabledBg: primitives.neutral[800],
      disabledFg: primitives.neutral[400],
      primaryPressed: primitives.neutral[200],
    },
    state: {
      hover: primitives.neutral[800],
      pressed: primitives.neutral[700],
      focus: primitives.neutral[0],
      disabled: primitives.neutral[900],
    },
    feedback: {
      successBg: primitives.success[900],
      successFg: primitives.success[500],
      warningBg: primitives.warning[900],
      warningFg: primitives.warning[500],
      dangerBg: primitives.error[900],
      dangerFg: primitives.error[500],
      infoBg: primitives.info[900],
      infoFg: primitives.info[500],
    },
  },
} as const;

export const componentColors = {
  light: {
    button: {
      bg: {
        primary: semanticColors.light.action.primaryBg,
        secondary: semanticColors.light.action.secondaryBg,
        disabled: semanticColors.light.action.disabledBg,
        pressed: semanticColors.light.action.primaryPressed,
      },
      text: {
        primary: semanticColors.light.action.primaryFg,
        secondary: semanticColors.light.action.secondaryFg,
        disabled: semanticColors.light.action.disabledFg,
      },
      border: {
        primary: semanticColors.light.action.secondaryFg,
        secondary: semanticColors.light.border.primary,
      },
    },
    input: {
      bg: semanticColors.light.surface.primary,
      text: semanticColors.light.text.primary,
      placeholder: semanticColors.light.text.tertiary,
      border: semanticColors.light.border.primary,
      borderFocus: semanticColors.light.border.focus,
      borderError: semanticColors.light.border.danger,
    },
  },
  dark: {
    button: {
      bg: {
        primary: semanticColors.dark.action.primaryBg,
        secondary: semanticColors.dark.action.secondaryBg,
        disabled: semanticColors.dark.action.disabledBg,
        pressed: semanticColors.dark.action.primaryPressed,
      },
      text: {
        primary: semanticColors.dark.action.primaryFg,
        secondary: semanticColors.dark.action.secondaryFg,
        disabled: semanticColors.dark.action.disabledFg,
      },
      border: {
        primary: semanticColors.dark.action.secondaryFg,
        secondary: semanticColors.dark.border.primary,
      },
    },
    input: {
      bg: semanticColors.dark.surface.primary,
      text: semanticColors.dark.text.primary,
      placeholder: semanticColors.dark.text.tertiary,
      border: semanticColors.dark.border.primary,
      borderFocus: semanticColors.dark.border.focus,
      borderError: semanticColors.dark.border.danger,
    },
  },
} as const;

export type ColorScheme = 'light' | 'dark';

export type PrimitivePalette = typeof primitives;
export type SemanticPalette = typeof semanticColors.light;

/** Все цветовые токены одним объектом (удобно для передачи в тему) */
export const figmaColorTokens = {
  primitives,
  semantic: semanticColors,
  component: componentColors,
} as const;
