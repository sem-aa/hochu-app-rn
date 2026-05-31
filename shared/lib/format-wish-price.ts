import type { WishCurrency } from '@/entities/wish/types';

const CURRENCY_LABEL: Record<WishCurrency, string> = {
  UAH: '₴',
  USD: '$',
  EUR: '€',
};

export function formatWishPrice(price: string | null, currency: WishCurrency): string | undefined {
  if (!price) return undefined;
  return `${price} ${CURRENCY_LABEL[currency]}`;
}
