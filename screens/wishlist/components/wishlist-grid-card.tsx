import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { radius, semanticColors, spacing } from '@/constants';
import { ThemedText, ThemedView } from '@/shared/ui/themed';

type WishlistGridCardProps = {
  emoji: string;
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export function WishlistGridCard({ emoji, title, onPress, style }: WishlistGridCardProps) {
  return (
    <Pressable style={style} onPress={onPress}>
      <ThemedView
        style={styles.card}
        lightColor={semanticColors.light.bg.secondary}
        darkColor={semanticColors.dark.bg.secondary}
      >
        <ThemedText variant="headingXl">{emoji}</ThemedText>
        <ThemedText variant="headingSm" bold numberOfLines={3}>
          {title}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    aspectRatio: 1,
    borderRadius: radius.xl,
    padding: spacing[4],
    justifyContent: 'flex-start',
    gap: spacing[2],
  },
});
