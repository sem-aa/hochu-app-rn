import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { StoreProvider } from '@/shared/store';
import { AppThemeProvider, useThemeContext } from '@/shared/providers/theme-context';

/** Читає тему з контексту і передає її навігації */
function NavigationLayout() {
  const { theme } = useThemeContext();
  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="profile-page" />
        <Stack.Screen name="wishlist-page" />
        <Stack.Screen name="wish-cart-page" />
      </Stack>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <StoreProvider>
      <AppThemeProvider>
        <NavigationLayout />
      </AppThemeProvider>
    </StoreProvider>
  );
}
