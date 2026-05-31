import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Image } from 'expo-image';

import { ThemedText } from '@/shared/ui/themed/themed-text';
import { radius, semanticColors, spacing } from '@/constants';
import { useGetWishlistQuery } from '@/entities/wishlist';
import { formatWishPrice } from '@/shared/lib/format-wish-price';

type WishInfoParams = {
  wishId: string;
  wishlistId: string;
};

export function WishlistWishInfoModal() {
  const { width } = useWindowDimensions();
  const { wishId, wishlistId } = useLocalSearchParams<WishInfoParams>();

  const { data: wishlist, isLoading } = useGetWishlistQuery(wishlistId ?? '', {
    skip: !wishlistId,
  });

  const wish = wishlist?.wishes.find((w) => w.id === wishId);
  const priceLabel = wish ? formatWishPrice(wish.price, wish.currency) : undefined;

  const imageSize = width - spacing[4] * 2;

  if (isLoading || !wish) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={semanticColors.light.text.secondary} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {wish.imageUrl ? (
        <Image
          source={{ uri: wish.imageUrl }}
          style={[styles.image, { width: imageSize, height: imageSize }]}
          contentFit="cover"
        />
      ) : (
        <Image
          source={require('@/assets/images/logo-hochu/logo-auth.png')}
          style={[styles.imagePlaceholder, { width: imageSize, height: imageSize }]}
          contentFit="contain"
        />
      )}

      <ThemedText variant="headingMd" bold>
        {wish.title}
      </ThemedText>

      {wish.note ? (
        <ThemedText
          variant="bodyMd"
          lightColor={semanticColors.light.text.secondary}
          darkColor={semanticColors.dark.text.secondary}
        >
          {wish.note}
        </ThemedText>
      ) : null}

      {priceLabel ? (
        <ThemedText variant="bodyLg" bold>
          {priceLabel}
        </ThemedText>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[4],
  },
  container: {
    padding: spacing[4],
    gap: spacing[4],
  },
  image: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: semanticColors.light.border.primary,
    alignSelf: 'center',
  },
  imagePlaceholder: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: semanticColors.light.border.primary,
    padding: spacing[6],
    opacity: 0.35,
    alignSelf: 'center',
  },
});
