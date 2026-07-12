import { router } from 'expo-router';
import { Alert, Pressable, StyleSheet, useColorScheme, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ROUTES, radius, semanticColors, spacing } from '@/constants';
import { useDeleteWishMutation } from '@/entities/wish';
import { MenuActionIcon } from '@/shared/ui/menu-action-icon';
import { ThemedText, ThemedView } from '@/shared/ui/themed';

type WishMoreModalProps = {
  wishId: string;
  wishlistId: string;
};

type MenuAction = {
  key: string;
  label: string;
  icon: 'edit' | 'delete';
  onPress: () => void;
  danger?: boolean;
};

export function WishMoreModal({ wishId, wishlistId }: WishMoreModalProps) {
  const { bottom } = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'light' ? semanticColors.light.text.primary : semanticColors.dark.text.primary;
  const dividerColor =
    colorScheme === 'light' ? semanticColors.light.border.primary : semanticColors.dark.border.primary;

  const [deleteWish] = useDeleteWishMutation();

  const handleEdit = () => {
    router.back();
    router.push({ pathname: ROUTES.WISHLIST_WISH_EDIT, params: { wishId, wishlistId } });
  };

  const handleDelete = () => {
    Alert.alert('Вже не хочу?', 'Бажання буде видалено зі списку.', [
      { text: 'Скасувати', style: 'cancel' },
      {
        text: 'Видалити',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteWish({ id: wishId, wishlistId }).unwrap();
            router.back();
            router.back();
          } catch {
            Alert.alert('Помилка', 'Не вдалося видалити бажання. Спробуй ще раз.');
          }
        },
      },
    ]);
  };

  const actions: MenuAction[] = [
    { key: 'edit', label: 'Відредагувати', icon: 'edit', onPress: handleEdit },
    { key: 'delete', label: 'Вже не хочу', icon: 'delete', onPress: handleDelete, danger: true },
  ];

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={() => router.back()} accessibilityRole="button" />

      <ThemedView style={[styles.sheet, { paddingBottom: bottom + spacing[4] }]}>
        {actions.map((action, index) => (
          <View key={action.key}>
            {index > 0 ? <View style={[styles.divider, { backgroundColor: dividerColor }]} /> : null}
            <Pressable style={styles.action} onPress={action.onPress} accessibilityRole="button">
              <MenuActionIcon name={action.icon} color={textColor} />
              <ThemedText variant="bodyLg">{action.label}</ThemedText>
            </Pressable>
          </View>
        ))}
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  sheet: {
    width: '100%',
    borderTopLeftRadius: radius.xxl,
    borderTopRightRadius: radius.xxl,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: spacing[4],
  },
  action: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
  },
});
