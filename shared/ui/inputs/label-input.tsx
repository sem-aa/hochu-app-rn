import { StyleProp, StyleSheet, useColorScheme, View, type ViewStyle } from 'react-native';

import { ThemedText } from '../themed/themed-text';
import { semanticColors, spacing } from '@/constants';
import { BaseInput, type BaseInputProps } from './base-input';

type LabelInputProps = BaseInputProps & {
  label: string;
  style?: StyleProp<ViewStyle>;
};

export function LabelInput({ label, style, containerStyle, ...props }: LabelInputProps) {
  const scheme = useColorScheme() ?? 'light';
  const semantic = semanticColors[scheme];
  return (
    <View style={[styles.container, style]}>
      <ThemedText lightColor={semantic.text.secondary} darkColor={semantic.text.secondary} variant="bodyMd">
        {label}
      </ThemedText>
      <BaseInput containerStyle={[styles.input, containerStyle]} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing[2],
  },
  input: {
    alignSelf: 'stretch',
  },
});
