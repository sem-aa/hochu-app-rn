// Mirror back/src/features/auth/auth.schema.ts
export type { User } from '@/entities/user';

export type AuthResponse = {
  user: import('@/entities/user').User;
  accessToken: string;
  refreshToken: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  name: string;
};

export type GoogleSignRequest = {
  idToken: string;
};

export type AppleSignRequest = {
  identityToken: string;
  fullName?: string;
};
