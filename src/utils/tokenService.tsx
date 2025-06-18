// utils/tokenService.ts
import Cookies from 'js-cookie';

const TOKEN_KEY = 'token'; 
const REFRESH_TOKEN_KEY = 'refreshToken';

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY) || Cookies.get(TOKEN_KEY) || null;
};

export const setToken = (token: string, rememberMe = true): void => {
  if (rememberMe) {
    localStorage.setItem(TOKEN_KEY, token);
  }
  Cookies.set(TOKEN_KEY, token, { expires: 7, secure: true, sameSite: 'strict' });
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  Cookies.remove(TOKEN_KEY);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY) || Cookies.get(REFRESH_TOKEN_KEY) || null;
};

export const setRefreshToken = (token: string): void => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
  Cookies.set(REFRESH_TOKEN_KEY, token, { expires: 30, secure: true, sameSite: 'strict' });
};

export const removeRefreshToken = (): void => {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
};

export const isTokenValid = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};
