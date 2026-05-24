import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { IconButton } from '@/components';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(drawer)/(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const handleCloseModal = () => {
    router.back();
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        <Stack.Screen
          name="profile-edit"
          options={{
            presentation: 'modal',
            title: 'Редагувати імʼя',
            headerRight: () => (
              <IconButton variant={'secondary'} icon="xmark" sizeIcon={16} onPress={handleCloseModal} />
            ),
          }}
        />
        <Stack.Screen
          name="profile-more"
          options={{
            presentation: 'transparentModal',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="wishlist-add-wish"
          options={{
            presentation: 'modal',
            title: 'Додати бажання',
            headerRight: () => (
              <IconButton variant={'secondary'} icon="xmark" sizeIcon={16} onPress={handleCloseModal} />
            ),
          }}
        />
        <Stack.Screen
          name="wishlist-add-list"
          options={{
            presentation: 'modal',
            title: 'Додати список',
            headerRight: () => (
              <IconButton variant={'secondary'} icon="xmark" sizeIcon={16} onPress={handleCloseModal} />
            ),
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
