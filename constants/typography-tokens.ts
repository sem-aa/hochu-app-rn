export const figmaTextStyles = {
  'display-lg': { fontSize: 32, lineHeight: 40 },
  'heading-xl': { fontSize: 24, lineHeight: 32 },
  'heading-lg': { fontSize: 20, lineHeight: 28 },
  'heading-md': { fontSize: 18, lineHeight: 26 },
  'heading-sm': { fontSize: 16, lineHeight: 24 },
  'body-lg': { fontSize: 16, lineHeight: 24 },
  'body-md': { fontSize: 14, lineHeight: 22 },
  'body-sm': { fontSize: 12, lineHeight: 18 },
  'label-lg': { fontSize: 14, lineHeight: 18 },
  'label-md': { fontSize: 12, lineHeight: 16 },
  caption: { fontSize: 11, lineHeight: 16 },
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
