import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { API_URL } from './config';
import { tokenStorage } from './token-storage';

const REQUEST_TIMEOUT_MS = 10_000;

const fetchWithTimeout: typeof fetch = async (input, init) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
};

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  fetchFn: fetchWithTimeout,
  prepareHeaders: async (headers) => {
    const token = await tokenStorage.getAccess();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

type RefreshResponse = { accessToken: string; refreshToken: string };

// Эндпоинты, где 401 — ожидаемая ошибка (неверный пароль), а не истёкший токен
function isAuthEndpoint(args: string | FetchArgs): boolean {
  const url = typeof args === 'string' ? args : args.url;
  return url.includes('/auth/login') || url.includes('/auth/register') || url.includes('/auth/refresh');
}

let refreshPromise: Promise<boolean> | null = null;

async function tryRefresh(): Promise<boolean> {
  const refreshToken = await tokenStorage.getRefresh();
  if (!refreshToken) return false;

  const res = await fetchWithTimeout(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) return false;

  const data = (await res.json()) as RefreshResponse;
  await tokenStorage.set(data.accessToken, data.refreshToken);
  return true;
}

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  // На login/register 401 = неверные данные, refresh не нужен
  if (result.error?.status === 401 && !isAuthEndpoint(args)) {
    refreshPromise ??= tryRefresh().finally(() => {
      refreshPromise = null;
    });

    const refreshed = await refreshPromise;

    if (refreshed) {
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      await tokenStorage.clear();
      const { loggedOut } = await import('@/features/auth/model/auth.slice');
      api.dispatch(loggedOut());
    }
  }

  return result;
};
