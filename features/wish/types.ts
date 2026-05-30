// Зеркалит back/src/features/wishes/wishes.schema.ts

export type WishCurrency = 'UAH' | 'USD' | 'EUR';
export type WishStatus = 'ACTIVE' | 'FULFILLED';

export type Wish = {
  id: string;
  wishlistId: string;
  title: string;
  note: string | null;
  url: string | null;
  imageUrl: string | null;
  price: string | null;
  currency: WishCurrency;
  quantity: number;
  status: WishStatus;
  position: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateWishRequest = {
  title: string;
  note?: string | null;
  url?: string | null;
  imageUrl?: string | null;
  price?: string | null;
  currency?: WishCurrency;
  quantity?: number;
};

export type UpdateWishRequest = Partial<CreateWishRequest>;
