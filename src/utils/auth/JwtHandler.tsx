// utils/auth/JwtHandler.tsx
import { jwtDecode } from 'jwt-decode';


export interface IDecodedToken {
  [key: string]: unknown;
  id: string;
  username: string;
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
}

export const decodeToken = (jwtToken: string): IDecodedToken => {
  const decoded = jwtDecode<IDecodedToken>(jwtToken);
  console.log("🔍 Decoded Token:", decoded);
  return decoded;
};

export const getRole = (loginObj: { jwtToken: string }): string => {
  if (loginObj?.jwtToken) {
    const decoded = decodeToken(loginObj.jwtToken);
    return `${decoded.role  ?? "client"}`.toLowerCase();
  }
  return "client";
};

export const getId = (token: string): string => {
  if (token) {
    const decoded = decodeToken(token);
    return `${ decoded.id ?? "1"}`.toLowerCase();
  }
  return "1";
};

export const getName = (token: string): string => {
  if (token) {
    const decoded = decodeToken(token);
    return `${decoded.name  ?? ""}`;
  }
  return "";
};

export const getEmail = (token: string): string => {
  if (token) {
    const decoded = decodeToken(token);
    return `${decoded.email ?? ""}`;
  }
  return "";
};
