export const fontFamily = {
  regular: 'Geologica_400Regular',
  medium: 'Geologica_500Medium',
  semiBold: 'Geologica_600SemiBold',
  bold: 'Geologica_700Bold',
} as const;

export type FontFamily = (typeof fontFamily)[keyof typeof fontFamily];
