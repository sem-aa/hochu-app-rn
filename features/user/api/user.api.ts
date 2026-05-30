import { api } from '@/shared/api/api';
import { loggedIn } from '@/features/auth/model/auth.slice';
import type { User } from '@/features/auth/types';
import type { UpdateUserRequest } from '../types';

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<User, void>({
      query: () => '/users/me',
      providesTags: ['User'],
    }),

    updateMe: build.mutation<User, UpdateUserRequest>({
      query: (body) => ({ url: '/users/me', method: 'PATCH', body }),
      invalidatesTags: ['User'],
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(loggedIn(data));
      },
    }),

    deleteMe: build.mutation<void, void>({
      query: () => ({ url: '/users/me', method: 'DELETE' }),
    }),
  }),
});

export const { useGetMeQuery, useUpdateMeMutation, useDeleteMeMutation } = userApi;
