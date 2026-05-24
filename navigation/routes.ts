/** Constants for the application routes. */
export const ROUTES = {
  HOME: '/',
  COMPONENTS: '/components',
  WISHLIST: '/wishlist-page',
  PROFILE: '/profile-page',
  PROFILE_EDIT: '/profile-edit',
  PROFILE_MORE: '/profile-more',
  WISHLIST_ADD_LIST: '/wishlist-add-list',
  WISHLIST_ADD_WISH: '/wishlist-add-wish',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

/** Routes for the Drawer menu (DZ). */
export const DRAWER_ROUTES = {
  HOME: ROUTES.HOME,
  PROFILE: ROUTES.PROFILE,
  COMPONENTS: ROUTES.COMPONENTS,
} as const;

export type DrawerRoute = (typeof DRAWER_ROUTES)[keyof typeof DRAWER_ROUTES];
