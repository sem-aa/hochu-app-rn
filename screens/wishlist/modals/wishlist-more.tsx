import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { Alert, Pressable, Share, StyleSheet, useColorScheme, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ROUTES, radius, semanticColors, spacing } from '@/constants';
import { useDeleteWishlistMutation, useShareWishlistMutation } from '@/entities/wishlist';
import { MenuActionIcon } from '@/shared/ui/menu-action-icon';
import { ThemedText, ThemedView } from '@/shared/ui/themed';

type WishlistMoreModalProps = {
  wishlistId: string;
};

type MenuAction = {
  key: string;
  label: string;
  icon: 'edit' | 'share' | 'delete';
  onPress: () => void;
};

export function WishlistMoreModal({ wishlistId }: WishlistMoreModalProps) {
  const { bottom } = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'light' ? semanticColors.light.text.primary : semanticColors.dark.text.primary;
  const dividerColor = colorScheme === 'light' ? semanticColors.light.border.primary : semanticColors.dark.border.primary;

  const [shareWishlist] = useShareWishlistMutation();
  const [deleteWishlist] = useDeleteWishlistMutation();

  const handleEdit = () => {
    router.back();
    router.push({ pathname: ROUTES.WISHLIST_EDIT, params: { wishlistId } });
  };

  const handleShare = async () => {
    try {
      const { shareUrl } = await shareWishlist(wishlistId).unwrap();
      await Haptics.selectionAsync();
      await Share.share({ url: shareUrl, message: shareUrl });
      router.back();
    } catch {
      // пользователь отменил шит — не показываем ошибку
    }
  };

  const handleDelete = () => {
    Alert.alert('Видалити вішліст?', 'Цю дію не можна скасувати.', [
      { text: 'Скасувати', style: 'cancel' },
      {
        text: 'Видалити',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteWishlist(wishlistId).unwrap();
            router.back();
          } catch {
            Alert.alert('Помилка', 'Не вдалося видалити вішліст. Спробуй ще раз.');
          }
        },
      },
    ]);
  };

  const actions: MenuAction[] = [
    { key: 'edit', label: 'Відредагувати імʼя вішліста', icon: 'edit', onPress: handleEdit },
    { key: 'share', label: 'Поділитися вішлістом', icon: 'share', onPress: handleShare },
    { key: 'delete', label: 'Видалити вішліст', icon: 'delete', onPress: handleDelete },
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
