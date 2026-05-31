import { api } from '@/shared/api/api';
import type { Wishlist, WishlistWithWishes, CreateWishlistRequest, UpdateWishlistRequest } from '../types';

export const wishlistApi = api.injectEndpoints({
  endpoints: (build) => ({
    getWishlists: build.query<Wishlist[], void>({
      query: () => '/wishlists',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Wishlist' as const, id })), { type: 'Wishlist', id: 'LIST' }]
          : [{ type: 'Wishlist', id: 'LIST' }],
    }),

    getWishlist: build.query<WishlistWithWishes, string>({
      query: (id) => `/wishlists/${id}`,
      providesTags: (_result, _err, id) => [{ type: 'Wishlist', id }],
    }),

    createWishlist: build.mutation<Wishlist, CreateWishlistRequest>({
      query: (body) => ({ url: '/wishlists', method: 'POST', body }),
      invalidatesTags: [{ type: 'Wishlist', id: 'LIST' }],
    }),

    updateWishlist: build.mutation<Wishlist, { id: string } & UpdateWishlistRequest>({
      query: ({ id, ...body }) => ({ url: `/wishlists/${id}`, method: 'PATCH', body }),
      invalidatesTags: (_result, _err, { id }) => [{ type: 'Wishlist', id }],
    }),

    deleteWishlist: build.mutation<void, string>({
      query: (id) => ({ url: `/wishlists/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Wishlist', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetWishlistsQuery,
  useGetWishlistQuery,
  useCreateWishlistMutation,
  useUpdateWishlistMutation,
  useDeleteWishlistMutation,
} = wishlistApi;
