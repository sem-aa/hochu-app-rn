import { Image } from 'expo-image';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { radius, semanticColors, spacing } from '@/constants';
import { ThemedText } from '@/shared/ui/themed/themed-text';
import { formatWishPrice } from '@/shared/lib/format-wish-price';
import type { WishCurrency, WishStatus } from '../types';

export type WishCardData = {
  id: string;
  title: string;
  note: string | null;
  imageUrl: string | null;
  price: string | null;
  currency: WishCurrency;
  status: WishStatus;
};

type WishCardProps = {
  wish: WishCardData;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export function WishCard({ wish, onPress, style }: WishCardProps) {
  const priceLabel = formatWishPrice(wish.price, wish.currency);
  const isFulfilled = wish.status === 'FULFILLED';

  return (
    <Pressable style={[styles.container, isFulfilled && styles.fulfilled, style]} onPress={onPress}>
      {wish.imageUrl ? (
        <Image source={{ uri: wish.imageUrl }} style={styles.image} contentFit="cover" />
      ) : (
        <Image
          source={require('@/assets/images/logo-hochu/logo-auth.png')}
          style={styles.imagePlaceholder}
          contentFit="contain"
        />
      )}
      <View style={styles.contentContainer}>
        <ThemedText variant="headingSm" bold numberOfLines={2}>
          {wish.title}
        </ThemedText>

        {wish.note ? (
          <ThemedText
            variant="bodyMd"
            numberOfLines={2}
            lightColor={semanticColors.light.text.tertiary}
            darkColor={semanticColors.dark.text.tertiary}
          >
            {wish.note}
          </ThemedText>
        ) : null}

        {priceLabel ? (
          <ThemedText
            variant="bodyMd"
            lightColor={semanticColors.light.text.tertiary}
            darkColor={semanticColors.dark.text.tertiary}
          >
            {priceLabel}
          </ThemedText>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: semanticColors.light.border.primary,
    backgroundColor: semanticColors.light.bg.primary,
    overflow: 'hidden',
  },
  fulfilled: {
    opacity: 0.55,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  imagePlaceholder: {
    width: '100%',
    aspectRatio: 1,
    padding: spacing[4],
    opacity: 0.35,
  },
  contentContainer: {
    padding: spacing[3],
    gap: spacing[1],
  },
});
