import { api } from '@/shared/api/api';
import type { User, UpdateUserRequest } from '../types';

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<User, void>({
      query: () => '/users/me',
      providesTags: ['User'],
    }),

    updateMe: build.mutation<User, UpdateUserRequest>({
      query: (body) => ({ url: '/users/me', method: 'PATCH', body }),
      invalidatesTags: ['User'],
    }),

    deleteMe: build.mutation<void, void>({
      query: () => ({ url: '/users/me', method: 'DELETE' }),
    }),
  }),
});

export const { useGetMeQuery, useUpdateMeMutation, useDeleteMeMutation } = userApi;
