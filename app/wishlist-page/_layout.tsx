import { router, Stack } from 'expo-router';

import { IconButton } from '@/components';

export default function WishlistLayout() {
  const handleCloseModal = () => {
    router.back();
  };

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="wishlist-add-wish-modal"
        options={{
          presentation: 'modal',
          title: 'Додати бажання',
          headerRight: () => <IconButton variant={'secondary'} icon="xmark" sizeIcon={16} onPress={handleCloseModal} />,
        }}
      />
      <Stack.Screen
        name="wishlist-add-list-modal"
        options={{
          presentation: 'modal',
          title: 'Додати список',
          headerRight: () => <IconButton variant={'secondary'} icon="xmark" sizeIcon={16} onPress={handleCloseModal} />,
        }}
      />
    </Stack>
  );
}
