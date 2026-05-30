import { api } from '@/shared/api/api';
import type { Wish, CreateWishRequest, UpdateWishRequest } from '../types';

export const wishApi = api.injectEndpoints({
  endpoints: (build) => ({
    createWish: build.mutation<Wish, { wishlistId: string } & CreateWishRequest>({
      query: ({ wishlistId, ...body }) => ({
        // Роут зарегистрирован в wishes.router под префиксом /wishes
        url: `/wishes/wishlists/${wishlistId}/wishes`,
        method: 'POST',
        body,
      }),
      // Инвалидируем конкретный вишлист, чтобы подтянуть обновлённый список желаний
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
