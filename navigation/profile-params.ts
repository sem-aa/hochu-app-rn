/** Test user data for passing between screens (DZ). */
export const MOCK_USER = {
  name: 'Daria',
  email: 'daria@gmail.com',
} as const;

export type ProfileRouteParams = {
  name?: string;
  email?: string;
};

export type ParsedProfileParams = {
  name: string;
  email: string;
  error?: string;
};

export function parseProfileParams(params: ProfileRouteParams): ParsedProfileParams {
  const name = params.name?.trim();
  const email = params.email?.trim();

  if (!name || !email) {
    return {
      name: MOCK_USER.name,
      email: MOCK_USER.email,
      error: 'Імʼя або email не передано або не в. Показано значення за замовчуванням.',
    };
  }

  if (!email.includes('@')) {
    return {
      name,
      email: MOCK_USER.email,
      error: 'Некоректний формат email.',
    };
  }

  return { name, email };
}
