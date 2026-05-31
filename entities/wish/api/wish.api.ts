import { api } from '@/shared/api/api';
import type { Wish, CreateWishRequest, UpdateWishRequest } from '../types';

export const wishApi = api.injectEndpoints({
  endpoints: (build) => ({
    createWish: build.mutation<Wish, { wishlistId: string } & CreateWishRequest>({
      query: ({ wishlistId, ...body }) => ({
        url: `/wishes/wishlists/${wishlistId}/wishes`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (_result, _err, { wishlistId }) => [{ type: 'Wishlist', id: wishlistId }],
    }),

    updateWish: build.mutation<Wish, { id: string } & UpdateWishRequest>({
      query: ({ id, ...body }) => ({ url: `/wishes/${id}`, method: 'PATCH', body }),
      invalidatesTags: (_result, _err, { id }) => [{ type: 'Wish', id }],
    }),

    deleteWish: build.mutation<void, string>({
      query: (id) => ({ url: `/wishes/${id}`, method: 'DELETE' }),
      invalidatesTags: (_result, _err, id) => [{ type: 'Wish', id }],
    }),
  }),
});

export const { useCreateWishMutation, useUpdateWishMutation, useDeleteWishMutation } = wishApi;
