import { router } from 'expo-router';
import { Pressable, StyleSheet, useColorScheme, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconSymbol, ThemedText, ThemedView } from '@/shared/ui';
import { radius, semanticColors, spacing } from '@/constants';

export function ProfileMoreModal() {
  const { bottom } = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'light' ? semanticColors.light.text.primary : semanticColors.dark.text.primary;
  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={() => router.back()} accessibilityRole="button" />

      <ThemedView style={[styles.sheet, { paddingBottom: bottom + spacing[4] }]}>
        <Pressable style={styles.action} onPress={() => router.back()} accessibilityRole="button">
          <IconSymbol name="trash.fill" size={20} color={textColor} />
          <ThemedText variant="bodyLg">Видалити обліковий запис</ThemedText>
        </Pressable>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  sheet: {
    width: '100%',
    borderTopLeftRadius: radius.xxl,
    borderTopRightRadius: radius.xxl,
  },
  action: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    padding: spacing[4],
  },
});
