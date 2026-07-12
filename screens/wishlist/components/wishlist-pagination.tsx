import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedView } from '@/shared/ui/themed';
import { radius, semanticColors, spacing } from '@/constants';

export type WishlistPaginationProps = {
  slideCount: number;
  activeIndex: number;
};

function WishlistPaginationComponent({ slideCount, activeIndex }: WishlistPaginationProps) {
  return (
    <View style={styles.wishDotContainer}>
      {Array.from({ length: slideCount }, (_, index) => (
        <ThemedView
          key={index}
          style={styles.wishDot}
          lightColor={index === activeIndex ? semanticColors.light.icon.primary : semanticColors.light.icon.tertiary}
          darkColor={index === activeIndex ? semanticColors.dark.icon.primary : semanticColors.dark.icon.tertiary}
        />
      ))}
    </View>
  );
}

export const WishlistPagination = memo(WishlistPaginationComponent);

const styles = StyleSheet.create({
  wishDotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing[2],
  },
  wishDot: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
  },
});
