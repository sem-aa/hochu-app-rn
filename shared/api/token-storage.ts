import * as SecureStore from 'expo-secure-store';

const ACCESS_KEY = 'auth.accessToken';
const REFRESH_KEY = 'auth.refreshToken';

export const tokenStorage = {
  getAccess: (): Promise<string | null> => SecureStore.getItemAsync(ACCESS_KEY),
  getRefresh: (): Promise<string | null> => SecureStore.getItemAsync(REFRESH_KEY),

  async set(access: string, refresh: string): Promise<void> {
    await SecureStore.setItemAsync(ACCESS_KEY, access);
    await SecureStore.setItemAsync(REFRESH_KEY, refresh);
  },

  async clear(): Promise<void> {
    await SecureStore.deleteItemAsync(ACCESS_KEY);
    await SecureStore.deleteItemAsync(REFRESH_KEY);
  },
};
