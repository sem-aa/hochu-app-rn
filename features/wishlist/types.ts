// Зеркалит back/src/features/wishlists/wishlists.schema.ts

export type Wishlist = {
  id: string;
  ownerId: string;
  title: string;
  emoji: string;
  coverUrl: string | null;
  shareSlug: string;
  isPublic: boolean;
  position: number;
  wishCount?: number;
  createdAt: string;
  updatedAt: string;
};

export type WishlistWithWishes = Wishlist & {
  wishes: WishInList[];
};

export type WishInList = {
  id: string;
  title: string;
  note: string | null;
  imageUrl: string | null;
  price: string | null;
  currency: 'UAH' | 'USD' | 'EUR';
  status: 'ACTIVE' | 'FULFILLED';
  position: number;
};

export type CreateWishlistRequest = {
  title: string;
  emoji?: string;
  coverUrl?: string | null;
};

export type UpdateWishlistRequest = {
  title?: string;
  emoji?: string;
  coverUrl?: string | null;
  isPublic?: boolean;
};
