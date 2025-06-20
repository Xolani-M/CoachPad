// utils/auth/JwtHandler.tsx
import { jwtDecode } from 'jwt-decode';

export interface IDecodedToken {
  [key: string]: unknown;
  id: string;
  username?: string;
  sub?: string;
  jti?: string;
  iat?: number;
  nbf?: number;
  exp?: number;
  iss?: string;
  aud?: string;
  name?: string;
  email?: string;
  role?: string;
  roles?: string[];
  permissions?: string[];
  features?: string[];
  planType?: string;
  trial?: boolean;
  activeState?: boolean;
  trainerId?: string;
  sex?: string;
  dateOfBirth?: string;
}

export const decodeToken = (jwtToken: string): IDecodedToken => {
  try {
    const decoded = jwtDecode<IDecodedToken>(jwtToken);
    console.log("🔍 Decoded Token:", decoded);
    return decoded;
  } catch (error) {
    console.error("❌ Failed to decode token:", error);
    return {} as IDecodedToken;
  }
};

export const getRole = (loginObj: { jwtToken: string }): string => {
  if (loginObj?.jwtToken) {
    const decoded = decodeToken(loginObj.jwtToken);
    const role = decoded?.role;
    return role === 'admin' || role === 'user' ? role : 'user';
  }
  return 'user';
};

export const getId = (token: string): string => {
  const decoded = decodeToken(token);
  return decoded?.id ?? '1';
};

export const getName = (token: string): string => {
  const decoded = decodeToken(token);
  return decoded?.name ?? '';
};

export const getEmail = (token: string): string => {
  const decoded = decodeToken(token);
  return decoded?.email ?? '';
};
