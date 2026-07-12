import { router, Stack } from 'expo-router';

import { IconButton } from '@/shared/ui/buttons';

export default function WishlistLayout() {
  const handleCloseModal = () => {
    router.back();
  };

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="all-wishlists" options={{ headerShown: false }} />
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
      <Stack.Screen
        name="wishlist-wish-info-modal"
        options={{
          presentation: 'modal',
          title: 'Інформація про бажання',
          headerRight: () => <IconButton variant={'secondary'} icon="xmark" sizeIcon={16} onPress={handleCloseModal} />,
        }}
      />
      <Stack.Screen
        name="wishlist-more-modal"
        options={{
          presentation: 'transparentModal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="wishlist-edit-modal"
        options={{
          presentation: 'modal',
          title: 'Редагувати імʼя',
          headerRight: () => <IconButton variant={'secondary'} icon="xmark" sizeIcon={16} onPress={handleCloseModal} />,
        }}
      />
    </Stack>
  );
}
