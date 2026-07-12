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

    updateWish: build.mutation<Wish, { id: string; wishlistId: string } & UpdateWishRequest>({
      query: ({ id, wishlistId: _wishlistId, ...body }) => ({ url: `/wishes/${id}`, method: 'PATCH', body }),
      invalidatesTags: (_result, _err, { wishlistId }) => [{ type: 'Wishlist', id: wishlistId }],
    }),

    deleteWish: build.mutation<void, { id: string; wishlistId: string }>({
      query: ({ id }) => ({ url: `/wishes/${id}`, method: 'DELETE' }),
      invalidatesTags: (_result, _err, { wishlistId }) => [{ type: 'Wishlist', id: wishlistId }],
    }),
  }),
});

export const { useCreateWishMutation, useUpdateWishMutation, useDeleteWishMutation } = wishApi;
