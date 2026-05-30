import type { WishInList } from '@/features/wishlist';

const CURRENCY_LABEL: Record<WishInList['currency'], string> = {
  UAH: '₴',
  USD: '$',
  EUR: '€',
};

export function formatWishPrice(price: string | null, currency: WishInList['currency']): string | undefined {
  if (!price) return undefined;
  return `${price} ${CURRENCY_LABEL[currency]}`;
}
