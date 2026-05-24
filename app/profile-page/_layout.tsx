import { router, Stack } from 'expo-router';

import { IconButton } from '@/components';

export default function ProfileLayout() {
  const handleCloseModal = () => {
    router.back();
  };

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="profile-edit-modal"
        options={{
          presentation: 'modal',
          title: 'Редагувати імʼя',
          headerRight: () => <IconButton variant={'secondary'} icon="xmark" sizeIcon={16} onPress={handleCloseModal} />,
        }}
      />
      <Stack.Screen
        name="profile-more-modal"
        options={{
          presentation: 'transparentModal',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
