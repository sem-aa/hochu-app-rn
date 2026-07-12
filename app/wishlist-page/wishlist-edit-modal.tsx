import { useLocalSearchParams } from 'expo-router';

import { WishlistEditModal } from '@/screens/wishlist/modals';

export default function WishlistEditModalScreen() {
  const { wishlistId } = useLocalSearchParams<{ wishlistId: string }>();
  return <WishlistEditModal wishlistId={wishlistId ?? ''} />;
}
