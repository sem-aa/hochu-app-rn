const raw = process.env.EXPO_PUBLIC_API_URL;

if (!raw && __DEV__) {
  console.warn('[env] EXPO_PUBLIC_API_URL is not set. Falling back to http://localhost:4001/api/v1');
}

export const API_URL = raw ?? 'http://localhost:4001/api/v1';

export const GOOGLE_IOS_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID ?? '';
export const GOOGLE_WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ?? '';
