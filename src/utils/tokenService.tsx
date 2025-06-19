import Cookies from 'js-cookie';

const TOKEN_KEY = 'token'; 
const REFRESH_TOKEN_KEY = 'refreshToken';

/**
 * Removes "Bearer " prefix if present, for safe storage
 */
const stripBearer = (token: string): string => token.replace(/^Bearer\s+/i, '');

/**
 * Read token from cookies/localStorage (already stripped of Bearer when stored)
 */
export const getToken = (): string | null => {
  const cookieToken = Cookies.get(TOKEN_KEY);
  const localToken = localStorage.getItem(TOKEN_KEY);
  return localToken || cookieToken || null;
};

/**
 * Save token in both cookie and optionally localStorage
 */
export const setToken = (token: string, rememberMe = true): void => {
  const cleanToken = stripBearer(token);
  if (rememberMe) {
    localStorage.setItem(TOKEN_KEY, cleanToken);
  }
  Cookies.set(TOKEN_KEY, cleanToken, {
    expires: 7,
    secure: true,
    sameSite: 'strict',
  });
};

/**
 * Remove token from both cookie and localStorage
 */
export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  Cookies.remove(TOKEN_KEY);
};

/**
 * Read refresh token from storage (decode if needed)
 */
export const getRefreshToken = (): string | null => {
  const token = localStorage.getItem(REFRESH_TOKEN_KEY) || Cookies.get(REFRESH_TOKEN_KEY);
  return token ? decodeURIComponent(token) : null;
};

/**
 * Store refresh token safely
 */
export const setRefreshToken = (token: string): void => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
  Cookies.set(REFRESH_TOKEN_KEY, token, {
    expires: 30,
    secure: true,
    sameSite: 'strict',
  });
};

/**
 * Remove refresh token from all stores
 */
export const removeRefreshToken = (): void => {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
};

/**
 * Validate JWT expiration
 */
export const isTokenValid = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};
