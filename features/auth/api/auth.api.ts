import { api } from '@/shared/api/api';
import { tokenStorage } from '@/shared/api/token-storage';
import { loggedIn, loggedOut } from '../model/auth.slice';
import type { AuthResponse, LoginRequest, RegisterRequest, GoogleSignRequest, AppleSignRequest } from '../types';

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
          throw new Error('Failed to login');
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
          throw new Error('Failed to register');
        }
      },
    }),

    googleAuth: build.mutation<AuthResponse, GoogleSignRequest>({
      query: (body) => ({ url: '/auth/google', method: 'POST', body }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          await tokenStorage.set(data.accessToken, data.refreshToken);
          dispatch(loggedIn(data.user));
        } catch {
          throw new Error('Failed to google auth');
        }
      },
    }),

    appleAuth: build.mutation<AuthResponse, AppleSignRequest>({
      query: (body) => ({ url: '/auth/apple', method: 'POST', body }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          await tokenStorage.set(data.accessToken, data.refreshToken);
          dispatch(loggedIn(data.user));
        } catch {
          throw new Error('Failed to apple auth');
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
          throw new Error('Failed to logout');
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGoogleAuthMutation, useAppleAuthMutation, useLogoutMutation } =
  authApi;
