import { useLocalSearchParams } from 'expo-router';

import { WishlistMoreModal } from '@/screens/wishlist/modals';

export default function WishlistMoreModalScreen() {
  const { wishlistId } = useLocalSearchParams<{ wishlistId: string }>();
  return <WishlistMoreModal wishlistId={wishlistId ?? ''} />;
}
