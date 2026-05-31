export function getAuthErrorMessage(e: unknown): string {
  if (typeof e !== 'object' || e === null) {
    return 'Щось пішло не так. Спробуй ще раз.';
  }

  const err = e as { status?: string | number; data?: { error?: { message?: string } } };

  if (err.status === 'FETCH_ERROR' || err.status === 'TIMEOUT_ERROR') {
    return 'Не вдалося підключитися до сервера. Перевір інтернет і EXPO_PUBLIC_API_URL у .env';
  }

  if (err.data?.error?.message) {
    return err.data.error.message;
  }

  return 'Щось пішло не так. Спробуй ще раз.';
}
