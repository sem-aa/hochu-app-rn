import { useLocalSearchParams } from 'expo-router';

import { WishMoreModal } from '@/screens/wishlist/modals';

export default function WishlistWishMoreModalScreen() {
  const { wishId, wishlistId } = useLocalSearchParams<{ wishId: string; wishlistId: string }>();
  return <WishMoreModal wishId={wishId ?? ''} wishlistId={wishlistId ?? ''} />;
}
