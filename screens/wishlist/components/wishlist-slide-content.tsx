import { ROUTES } from '@/constants/routes';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { IconButton, IconSymbol, ThemedText, ThemedView } from '@/components';
import { radius, semanticColors, spacing } from '@/constants';

import { type WishlistSlide } from '../types';
import { WishlistPagination } from './wishlist-pagination';

type WishlistSlideProps = {
  slide: WishlistSlide;
  slideCount: number;
  activeIndex: number;
};

export function WishlistSlideContent({ slide, slideCount, activeIndex }: WishlistSlideProps) {
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

      <View style={styles.wishlistEmptyContainer}>
        <ThemedText variant="bodyLg" center>
          Час нарешті наповнити список тим, чого хочеться
        </ThemedText>
        <IconButton icon="plus" onPress={() => router.push(ROUTES.WISHLIST_ADD_WISH)} title="Хочу" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slideContent: {
    flex: 1,
    paddingHorizontal: spacing[4],
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
  wishlistEmptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing[4],
  },
});
