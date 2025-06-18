// file: context.tsx
"use client";

import { createContext } from "react";

// -------------------- Role Definitions --------------------
export type UserRole = "admin" | "user"; // Based on API

// -------------------- Base User Interface --------------------
interface IBaseUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  contactNumber?: string;
  dateOfBirth?: string;
  policiesAccepted?: boolean;
  activeState?: boolean;
  features?: string[];
  plan?: string | null;
}

// -------------------- Role-Specific Interfaces --------------------
export interface ITrainer extends IBaseUser {
  trainerId?: string;
  planType?: string;
  trial?: boolean;
  avatar?: string;
}

export interface IClient extends IBaseUser {
  clientId?: string;
  trainerId: string;
  sex?: string;
}

// Union type for user
export type IUser = ITrainer | IClient;

// -------------------- Authentication Request Payloads --------------------

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ITrainerRegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  contactNumber: string;
  role?: string;
  planType?: string;
  activeState?: boolean;
  trial?: boolean;
  policiesAccepted?: boolean;
  avatar?: string;
}

export interface IClientCreateRequest {
  fullName: string;
  email: string;
  contactNumber: string;
  sex?: string;
  dateOfBirth?: string;
  activeState?: boolean;
  trainerId: string;
}

export interface IClientRegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth?: string;
  contactNumber: string;
  policiesAccepted: boolean;
  clientId?: string;
}

// -------------------- Authentication State and Actions --------------------

export interface IAuthStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  error?: string;
  isAuthenticated: boolean;
  user?: IUser;
  permissions?: string[];
  token?: string;
}

export interface IAuthActionContext {
  login: (credentials: ILoginRequest) => Promise<void>;
  registerTrainer: (userData: ITrainerRegisterRequest) => Promise<void>;
  createClient: (userData: IClientCreateRequest) => Promise<void>;
  registerClient: (userData: IClientRegisterRequest) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  refreshToken?: () => Promise<void>;
}

// -------------------- Contexts --------------------

export const INITIAL_AUTH_STATE: IAuthStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
  isAuthenticated: false,
  user: undefined,
  token: undefined,
};

export const AuthStateContext = createContext<IAuthStateContext>(INITIAL_AUTH_STATE);

export const AuthActionContext = createContext<IAuthActionContext>(undefined!);
