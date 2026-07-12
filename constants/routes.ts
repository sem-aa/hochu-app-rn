/** Constants for the application routes. */
export const ROUTES = {
  AUTH: '/',
  WISHLIST: '/wishlist-page',
  WISHLIST_ALL: '/wishlist-page/all-wishlists',
  PROFILE: '/profile-page',
  PROFILE_EDIT: '/profile-page/profile-edit-modal',
  PROFILE_MORE: '/profile-page/profile-more-modal',
  WISHLIST_ADD_LIST: '/wishlist-page/wishlist-add-list-modal',
  WISHLIST_ADD_WISH: '/wishlist-page/wishlist-add-wish-modal',
  WISHLIST_WISH_INFO: '/wishlist-page/wishlist-wish-info-modal',
  WISHLIST_WISH_MORE: '/wishlist-page/wishlist-wish-more-modal',
  WISHLIST_WISH_EDIT: '/wishlist-page/wishlist-wish-edit-modal',
  WISHLIST_MORE: '/wishlist-page/wishlist-more-modal',
  WISHLIST_EDIT: '/wishlist-page/wishlist-edit-modal',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
