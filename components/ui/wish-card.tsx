import { Image } from 'expo-image';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { radius, ROUTES, semanticColors, spacing } from '@/constants';
import { formatWishPrice } from '@/shared/lib/format-wish-price';

import { ThemedText } from '../themed-text';
import { router } from 'expo-router';

export type WishCardData = {
  id: string;
  title: string;
  note: string | null;
  imageUrl: string | null;
  price: string | null;
  currency: 'UAH' | 'USD' | 'EUR';
  status: 'ACTIVE' | 'FULFILLED';
};

type WishCardProps = {
  wish: WishCardData;
  wishlistId: string;
  style?: StyleProp<ViewStyle>;
};

export function WishCard({ wish, wishlistId, style }: WishCardProps) {
  const priceLabel = formatWishPrice(wish.price, wish.currency);
  const isFulfilled = wish.status === 'FULFILLED';

  const handlePress = () => {
    router.push({
      pathname: ROUTES.WISHLIST_WISH_INFO,
      params: { wishId: wish.id, wishlistId },
    });
  };
  
  return (
    <Pressable style={[styles.container, isFulfilled && styles.fulfilled, style]} onPress={handlePress}>
      {wish.imageUrl ? (
        <Image source={{ uri: wish.imageUrl }} style={styles.image} contentFit="cover" />
      ) : (
        <Image source={require('@/assets/images/logo-hochu/logo-auth.png')} style={styles.imagePlaceholder} contentFit="contain" />
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
