import { semanticColors } from '@/constants';
import { SymbolView, SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { StyleProp, useColorScheme, ViewStyle } from 'react-native';

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight = 'regular',
}: {
  name: SymbolViewProps['name'];
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'light' ? semanticColors.light.text.primary : semanticColors.dark.text.primary;
  return (
    <SymbolView
      weight={weight}
      tintColor={color ?? textColor}
      resizeMode="scaleAspectFit"
      name={name}
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
    />
  );
}
