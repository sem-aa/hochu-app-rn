export {
  useGetWishlistsQuery,
  useGetWishlistQuery,
  useCreateWishlistMutation,
  useUpdateWishlistMutation,
  useDeleteWishlistMutation,
} from './api/wishlist.api';
export type { Wishlist, WishlistWithWishes, WishInList, CreateWishlistRequest, UpdateWishlistRequest } from './types';
