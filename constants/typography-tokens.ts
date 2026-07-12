import { fontFamily } from './font-tokens';

export const figmaTextStyles = {
  'display-lg': { fontFamily: fontFamily.bold, fontSize: 32, lineHeight: 40 },
  'heading-xl': { fontFamily: fontFamily.bold, fontSize: 24, lineHeight: 32 },
  'heading-lg': { fontFamily: fontFamily.semiBold, fontSize: 20, lineHeight: 28 },
  'heading-md': { fontFamily: fontFamily.semiBold, fontSize: 18, lineHeight: 26 },
  'heading-sm': { fontFamily: fontFamily.semiBold, fontSize: 16, lineHeight: 24 },
  'body-lg': { fontFamily: fontFamily.regular, fontSize: 16, lineHeight: 24 },
  'body-md': { fontFamily: fontFamily.regular, fontSize: 14, lineHeight: 22 },
  'body-sm': { fontFamily: fontFamily.regular, fontSize: 12, lineHeight: 18 },
  'label-lg': { fontFamily: fontFamily.medium, fontSize: 14, lineHeight: 18 },
  'label-md': { fontFamily: fontFamily.medium, fontSize: 12, lineHeight: 16 },
  caption: { fontFamily: fontFamily.regular, fontSize: 11, lineHeight: 16 },
} as const;

export type FigmaTextStyleName = keyof typeof figmaTextStyles;
export type FigmaTextStyle = (typeof figmaTextStyles)[FigmaTextStyleName];

export const typography = {
  displayLg: figmaTextStyles['display-lg'],
  headingXl: figmaTextStyles['heading-xl'],
  headingLg: figmaTextStyles['heading-lg'],
  headingMd: figmaTextStyles['heading-md'],
  headingSm: figmaTextStyles['heading-sm'],
  bodyLg: figmaTextStyles['body-lg'],
  bodyMd: figmaTextStyles['body-md'],
  bodySm: figmaTextStyles['body-sm'],
  labelLg: figmaTextStyles['label-lg'],
  labelMd: figmaTextStyles['label-md'],
  caption: figmaTextStyles.caption,
} as const;
