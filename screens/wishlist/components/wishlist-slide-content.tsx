import { ROUTES } from '@/constants/routes';
import { router } from 'expo-router';
import { ActivityIndicator, FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';

import { IconButton } from '@/shared/ui/buttons';
import { IconSymbol } from '@/shared/ui/icon-symbol';
import { ThemedText, ThemedView } from '@/shared/ui/themed';
import { WishCard } from '@/entities/wish';
import { radius, semanticColors, spacing } from '@/constants';
import { useGetWishlistQuery } from '@/entities/wishlist';
import { getWishCardWidth, WISH_GRID_COLUMNS, WISH_GRID_GAP } from '@/shared/lib/wish-grid';

import { type WishlistSlide } from '../types';
import { WishlistPagination } from './wishlist-pagination';

type WishlistSlideProps = {
  slide: WishlistSlide;
  slideCount: number;
  activeIndex: number;
};

export function WishlistSlideContent({ slide, slideCount, activeIndex }: WishlistSlideProps) {
  const { width } = useWindowDimensions();
  const cardWidth = getWishCardWidth(width);

  const { data: wishlist, isLoading } = useGetWishlistQuery(slide.id);
  const wishes = wishlist?.wishes ?? [];
  const isEmpty = !isLoading && wishes.length === 0;

  const openAddWish = () => {
    router.push({ pathname: ROUTES.WISHLIST_ADD_WISH, params: { wishlistId: slide.id } });
  };

  const openWishInfo = (wishId: string) => {
    router.push({ pathname: ROUTES.WISHLIST_WISH_INFO, params: { wishId, wishlistId: slide.id } });
  };

  return (
    <View style={styles.slideContent}>
      <ThemedView
        style={styles.wishlistContainer}
        lightColor={semanticColors.light.bg.secondary}
        darkColor={semanticColors.dark.bg.secondary}
      >
        <View style={styles.wishlistTitleHeader}>
          <View>
            <ThemedText variant="headingXl">{slide.emoji}</ThemedText>
            <ThemedText variant="headingXl" bold>
              {slide.title}
            </ThemedText>
          </View>
          <IconSymbol name="ellipsis" style={styles.iconEllipsis} size={24} color={semanticColors.light.text.primary} />
        </View>
      </ThemedView>

      <WishlistPagination slideCount={slideCount} activeIndex={activeIndex} />

      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={semanticColors.light.text.secondary} />
        </View>
      ) : isEmpty ? (
        <View style={styles.wishlistEmptyContainer}>
          <ThemedText variant="bodyLg" center>
            Час нарешті наповнити список тим, чого хочеться
          </ThemedText>
          <IconButton icon="plus" onPress={openAddWish} title="Хочу" />
        </View>
      ) : (
        <FlatList
          data={wishes}
          keyExtractor={(item) => item.id}
          numColumns={WISH_GRID_COLUMNS}
          renderItem={({ item }) => (
            <WishCard wish={item} onPress={() => openWishInfo(item.id)} style={{ width: cardWidth }} />
          )}
          columnWrapperStyle={styles.wishesRow}
          contentContainerStyle={styles.wishesGrid}
          style={styles.wishesList}
          showsVerticalScrollIndicator={false}
        />
      )}

      {!isEmpty && !isLoading && (
        <View style={styles.addButtonContainer}>
          <IconButton icon="plus" size="lg" onPress={openAddWish} title="Хочу" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  slideContent: {
    flex: 1,
    paddingHorizontal: spacing[4],
    gap: spacing[4],
  },
  wishlistContainer: {
    borderWidth: 1,
    padding: spacing[4],
    paddingBottom: spacing[8],
    borderColor: semanticColors.light.border.primary,
    borderRadius: radius.lg,
  },
  wishlistTitleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconEllipsis: {
    transform: [{ rotate: '90deg' }],
    width: 16,
    height: 16,
    padding: spacing[2],
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishlistEmptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing[4],
  },
  wishesList: {
    flex: 1,
  },
  wishesGrid: {
    paddingBottom: spacing[4],
  },
  wishesRow: {
    gap: WISH_GRID_GAP,
    marginBottom: WISH_GRID_GAP,
  },
  addButtonContainer: {
    alignItems: 'center',
    paddingVertical: spacing[2],
  },
});
