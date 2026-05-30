import { primitives, semanticColors } from '@/constants';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

export function GradientBackground() {
  return (
    <LinearGradient
      colors={[semanticColors.dark.bg.primary, semanticColors.dark.bg.primary, primitives.error[500]]}
      locations={[0, 0.3, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={StyleSheet.absoluteFillObject}
    />
  );
}
