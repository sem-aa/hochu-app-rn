export {
  useGetWishlistsQuery,
  useGetWishlistQuery,
  useCreateWishlistMutation,
  useUpdateWishlistMutation,
  useDeleteWishlistMutation,
  useShareWishlistMutation,
} from './api/wishlist.api';
export type {
  Wishlist,
  WishlistWithWishes,
  WishInList,
  CreateWishlistRequest,
  UpdateWishlistRequest,
  ShareWishlistResponse,
} from './types';
