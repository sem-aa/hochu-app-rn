// Типы зеркалят Zod-схемы бэкенда (back/src/features/auth/auth.schema.ts)

export type User = {
  id: string;
  email: string | null;
  name: string;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AuthResponse = {
  user: User;
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
