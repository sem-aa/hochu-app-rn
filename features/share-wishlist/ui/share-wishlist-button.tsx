import * as Haptics from 'expo-haptics';
import { Share } from 'react-native';

import { IconButton } from '@/shared/ui/buttons';
import { useShareWishlistMutation } from '@/entities/wishlist';

type ShareWishlistButtonProps = {
  wishlistId: string;
};

export function ShareWishlistButton({ wishlistId }: ShareWishlistButtonProps) {
  const [shareWishlist, { isLoading }] = useShareWishlistMutation();

  const handleShare = async () => {
    try {
      const { shareUrl } = await shareWishlist(wishlistId).unwrap();
      console.log('shareUrl', shareUrl);
      await Haptics.selectionAsync();
      await Share.share({ url: shareUrl, message: shareUrl });
    } catch {
      // пользователь отменил шит — не показываем ошибку
    }
  };

  return (
    <IconButton
      variant="secondary"
      icon="square.and.arrow.up"
      onPress={handleShare}
      disabled={isLoading}
    />
  );
}
