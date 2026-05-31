import { ROUTES } from '@/constants/routes';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { IconButton } from '@/shared/ui/buttons';
import { ThemedText, ThemedView } from '@/shared/ui/themed';
import { radius, semanticColors, spacing } from '@/constants';

import { WishlistPagination, type WishlistPaginationProps } from './wishlist-pagination';

export function AddWishlistSlide({ slideCount, activeIndex }: WishlistPaginationProps) {
  return (
    <View style={styles.slideContent}>
      <ThemedView
        style={styles.wishlistAddContainer}
        lightColor={semanticColors.light.bg.secondary}
        darkColor={semanticColors.dark.bg.secondary}
      >
        <View style={styles.wishlistAddContent}>
          <ThemedText variant="headingMd" bold>
            Ще один список?
          </ThemedText>
          <ThemedText
            lightColor={semanticColors.light.text.secondary}
            darkColor={semanticColors.dark.text.secondary}
            variant="bodySm"
          >
            На день народження, свято чи просто так
          </ThemedText>
          <IconButton icon="plus" onPress={() => router.push(ROUTES.WISHLIST_ADD_LIST)} />
        </View>
      </ThemedView>

      <WishlistPagination slideCount={slideCount} activeIndex={activeIndex} />

      <View style={styles.wishlistEmptyContainer}>
        <ThemedText variant="bodyLg" center>
          Створи список, щоб не забути про важливе
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slideContent: {
    flex: 1,
    paddingHorizontal: spacing[4],
    gap: spacing[4],
  },
  wishlistAddContainer: {
    padding: spacing[4],
    borderColor: semanticColors.light.border.primary,
    borderRadius: radius.lg,
  },
  wishlistAddContent: {
    alignItems: 'center',
    gap: spacing[2],
  },
  wishlistEmptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing[4],
  },
});
