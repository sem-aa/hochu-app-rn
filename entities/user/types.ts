// Зеркалит back/src/features/users/users.schema.ts и back/src/features/auth/auth.schema.ts

export type User = {
  id: string;
  email: string | null;
  name: string;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateUserRequest = {
  name?: string;
  avatarUrl?: string | null;
};
