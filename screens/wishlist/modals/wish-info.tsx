import { router, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Linking, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ROUTES, radius, semanticColors, spacing } from '@/constants';
import { useGetWishlistQuery } from '@/entities/wishlist';
import { IconButton } from '@/shared/ui/buttons';
import { ThemedText } from '@/shared/ui/themed/themed-text';
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

  const openMore = () => {
    router.push({ pathname: ROUTES.WISHLIST_WISH_MORE, params: { wishId: wishId ?? '', wishlistId: wishlistId ?? '' } });
  };

  const openProductUrl = () => {
    if (!wish?.url) return;
    Linking.openURL(wish.url);
  };

  if (isLoading || !wish) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={semanticColors.light.text.secondary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <IconButton variant="secondary" icon="arrow.left" onPress={() => router.back()} />
        <IconButton styleIcon={styles.moreIcon} variant="secondary" icon="ellipsis" onPress={openMore} />
      </View>

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

        <View style={styles.titleRow}>
          <ThemedText variant="headingMd" bold style={styles.title}>
            {wish.title}
          </ThemedText>
          {wish.url ? (
            <IconButton variant="primary" icon="square.and.arrow.up" sizeIcon={18} onPress={openProductUrl} />
          ) : null}
        </View>

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[2],
    paddingTop: spacing[2],
  },
  moreIcon: {
    transform: [{ rotate: '90deg' }],
  },
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing[3],
  },
  title: {
    flex: 1,
  },
});
