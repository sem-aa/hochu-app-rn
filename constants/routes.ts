/** Constants for the application routes. */
export const ROUTES = {
  AUTH: '/',
  WISHLIST: '/wishlist-page',
  PROFILE: '/profile-page',
  PROFILE_EDIT: '/profile-page/profile-edit-modal',
  PROFILE_MORE: '/profile-page/profile-more-modal',
  WISHLIST_ADD_LIST: '/wishlist-page/wishlist-add-list-modal',
  WISHLIST_ADD_WISH: '/wishlist-page/wishlist-add-wish-modal',
  WISHLIST_WISH_INFO: '/wishlist-page/wishlist-wish-info-modal',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
