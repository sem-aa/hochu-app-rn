import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { radius, semanticColors, spacing } from '@/constants';
import { addItem, removeItem, updateQuantity } from '@/features/wish-cart';
import { useAppDispatch, useAppSelector } from '@/shared/store';
import { IconButton } from '@/shared/ui/buttons';
import { ThemedText, ThemedView } from '@/shared/ui/themed';

const DEMO_WISHES = [
  { id: 'demo-1', title: 'AirPods Pro', price: '8 999' },
  { id: 'demo-2', title: 'Книга "Clean Code"', price: '450' },
  { id: 'demo-3', title: 'iPad mini', price: '25 000' },
  { id: 'demo-4', title: 'Механічна клавіатура', price: '3 500' },
] as const;

export default function WishCartScreen() {
  const cart = useAppSelector((state) => state.wishCart);
  const dispatch = useAppDispatch();

  const isInCart = (id: string) => cart.some((item) => item.id === id);

  const handleAdd = (wish: (typeof DEMO_WISHES)[number]) => {
    dispatch(addItem({ id: wish.id, title: wish.title, price: wish.price }));
  };

  const handleRemove = (id: string) => {
    dispatch(removeItem(id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch(removeItem(id));
    } else {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <IconButton variant="secondary" icon="arrow.left" onPress={() => router.back()} />
        <ThemedText variant="headingMd" bold>
          Список бажань
        </ThemedText>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Секція доступних бажань */}
        <ThemedText variant="headingSm" bold style={styles.sectionTitle}>
          Додати бажання
        </ThemedText>

        {DEMO_WISHES.map((wish) => {
          const inCart = isInCart(wish.id);
          return (
            <ThemedView key={wish.id} style={styles.wishRow}>
              <View style={styles.wishInfo}>
                <ThemedText variant="bodyMd">{wish.title}</ThemedText>
                <ThemedText
                  variant="bodySm"
                  lightColor={semanticColors.light.text.secondary}
                  darkColor={semanticColors.dark.text.secondary}
                >
                  {wish.price} ₴
                </ThemedText>
              </View>
              <IconButton
                variant={inCart ? 'secondary' : 'primary'}
                icon={inCart ? 'checkmark' : 'plus'}
                onPress={() => handleAdd(wish)}
                disabled={inCart}
              />
            </ThemedView>
          );
        })}

        {/* Секція кошика */}
        <ThemedText variant="headingSm" bold style={styles.sectionTitle}>
          Мій кошик ({cart.length})
        </ThemedText>

        {cart.length === 0 ? (
          <ThemedText
            variant="bodyMd"
            center
            lightColor={semanticColors.light.text.secondary}
            darkColor={semanticColors.dark.text.secondary}
            style={styles.emptyText}
          >
            Кошик порожній — додайте бажання вище
          </ThemedText>
        ) : (
          cart.map((item) => (
            <ThemedView key={item.id} style={styles.cartRow}>
              <View style={styles.wishInfo}>
                <ThemedText variant="bodyMd" bold>
                  {item.title}
                </ThemedText>
                {item.price !== null && (
                  <ThemedText
                    variant="bodySm"
                    lightColor={semanticColors.light.text.secondary}
                    darkColor={semanticColors.dark.text.secondary}
                  >
                    {item.price} ₴
                  </ThemedText>
                )}
              </View>

              <View style={styles.quantityRow}>
                <IconButton
                  size="sm"
                  variant="secondary"
                  icon="minus"
                  onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                />
                <ThemedText variant="bodyMd" style={styles.quantityText}>
                  {item.quantity}
                </ThemedText>
                <IconButton
                  size="sm"
                  variant="secondary"
                  icon="plus"
                  onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                />
                <IconButton size="sm" variant="secondary" icon="trash" onPress={() => handleRemove(item.id)} />
              </View>
            </ThemedView>
          ))
        )}
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
    padding: spacing[4],
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    padding: spacing[4],
    gap: spacing[3],
  },
  sectionTitle: {
    marginTop: spacing[4],
    marginBottom: spacing[2],
  },
  wishRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing[3],
    borderRadius: radius.lg,
    gap: spacing[3],
  },
  cartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing[3],
    borderRadius: radius.lg,
    gap: spacing[3],
  },
  wishInfo: {
    flex: 1,
    gap: spacing[1],
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  quantityText: {
    minWidth: 20,
    textAlign: 'center',
  },
  emptyText: {
    paddingVertical: spacing[6],
  },
});
