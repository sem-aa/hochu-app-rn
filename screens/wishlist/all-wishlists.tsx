import { router } from 'expo-router';
import { useCallback, useMemo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
  type ListRenderItem,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ROUTES, semanticColors, spacing } from '@/constants';
import { useGetWishlistsQuery, type Wishlist } from '@/entities/wishlist';
import { getWishCardWidth, WISH_GRID_COLUMNS, WISH_GRID_GAP } from '@/shared/lib/wish-grid';
import { IconButton } from '@/shared/ui/buttons';

import { WishlistGridCard } from './components/wishlist-grid-card';

export default function AllWishlistsScreen() {
  const { width } = useWindowDimensions();
  const cardWidth = useMemo(() => getWishCardWidth(width), [width]);
  const cardStyle = useMemo(() => ({ width: cardWidth }), [cardWidth]);

  const { data: wishlists = [], isLoading } = useGetWishlistsQuery();

  const openCreateWishlist = () => {
    router.push(ROUTES.WISHLIST_ADD_LIST);
  };

  const openWishlist = useCallback((wishlistId: string) => {
    router.replace({ pathname: ROUTES.WISHLIST, params: { wishlistId } });
  }, []);

  const keyExtractor = useCallback((item: Wishlist) => item.id, []);

  const renderItem = useCallback<ListRenderItem<Wishlist>>(
    ({ item }) => (
      <WishlistGridCard
        emoji={item.emoji}
        title={item.title}
        style={cardStyle}
        onPress={() => openWishlist(item.id)}
      />
    ),
    [cardStyle, openWishlist],
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <IconButton variant="secondary" icon="arrow.left"  onPress={() => router.back()} />
      </View>

      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator color={semanticColors.light.text.secondary} />
        </View>
      ) : (
        <FlatList
          data={wishlists}
          keyExtractor={keyExtractor}
          numColumns={WISH_GRID_COLUMNS}
          renderItem={renderItem}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.grid}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

      <View style={styles.footer}>
        <IconButton icon="plus" size="lg" title="Створити ще один" onPress={openCreateWishlist} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    alignItems: 'flex-start',
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[2],
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
  },
  grid: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[4],
  },
  row: {
    gap: WISH_GRID_GAP,
    marginBottom: WISH_GRID_GAP,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: spacing[4],
  },
});
