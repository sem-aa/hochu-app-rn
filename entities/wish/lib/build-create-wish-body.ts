import type { CreateWishRequest } from '../types';

const PRICE_REGEX = /^\d+(\.\d{1,2})?$/;

type FormValues = {
  title: string;
  note: string;
  url: string;
  imageUrl: string | null;
  price: string;
  quantity: string;
};

function normalizePrice(raw: string): string | undefined {
  const trimmed = raw.trim().replace(',', '.');
  if (!trimmed) return undefined;
  return PRICE_REGEX.test(trimmed) ? trimmed : undefined;
}

function isValidUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function normalizeUrl(raw: string): string | undefined {
  const trimmed = raw.trim();
  if (!trimmed || !isValidUrl(trimmed)) return undefined;
  return trimmed;
}

export function buildCreateWishBody(values: FormValues): CreateWishRequest {
  const body: CreateWishRequest = {
    title: values.title.trim(),
  };

  const note = values.note.trim();
  if (note) body.note = note;

  const url = normalizeUrl(values.url);
  if (url) body.url = url;

  // null — explicitly without photo (after deletion); undefined — field not touched
  if (values.imageUrl === null) {
    body.imageUrl = null;
  } else if (values.imageUrl) {
    body.imageUrl = values.imageUrl;
  }

  const price = normalizePrice(values.price);
  if (price) body.price = price;

  const qty = Number(values.quantity);
  if (qty > 0) body.quantity = qty;

  return body;
}

export function getWishErrorMessage(e: unknown): string {
  if (typeof e !== 'object' || e === null) {
    return 'Не вдалося додати бажання. Спробуй ще раз.';
  }

  const err = e as {
    status?: string | number;
    data?: { error?: { message?: string; details?: unknown } };
  };

  if (err.status === 'FETCH_ERROR' || err.status === 'TIMEOUT_ERROR') {
    return 'Не вдалося підключитися до сервера.';
  }

  if (err.status === 400) {
    return 'Перевір дані: посилання має бути повним URL, ціна — число (наприклад 199.99).';
  }

  if (err.data?.error?.message) {
    return err.data.error.message;
  }

  return 'Не вдалося додати бажання. Спробуй ще раз.';
}
