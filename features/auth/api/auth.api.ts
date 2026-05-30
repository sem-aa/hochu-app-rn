import { api } from '@/shared/api/api';
import { tokenStorage } from '@/shared/api/token-storage';
import { loggedIn, loggedOut } from '../model/auth.slice';
import type { AuthResponse, LoginRequest, RegisterRequest } from '../types';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          await tokenStorage.set(data.accessToken, data.refreshToken);
          dispatch(loggedIn(data.user));
        } catch {
          // ошибка обрабатывается в компоненте через unwrap()
        }
      },
    }),

    register: build.mutation<AuthResponse, RegisterRequest>({
      query: (body) => ({ url: '/auth/register', method: 'POST', body }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          await tokenStorage.set(data.accessToken, data.refreshToken);
          dispatch(loggedIn(data.user));
        } catch {
          // ошибка обрабатывается в компоненте через unwrap()
        }
      },
    }),

    logout: build.mutation<void, string>({
      query: (refreshToken) => ({ url: '/auth/logout', method: 'POST', body: { refreshToken } }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          await tokenStorage.clear();
          dispatch(loggedOut());
        } catch {
          // ошибка обрабатывается в компоненте
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;
