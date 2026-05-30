import { useLocalSearchParams } from 'expo-router';
import { WishlistAddWishModal } from '@/screens/wishlist/modals';

export default function WishlistAddWishModalScreen() {
  const { wishlistId } = useLocalSearchParams<{ wishlistId: string }>();
  return <WishlistAddWishModal wishlistId={wishlistId ?? ''} />;
}
