'use client';

import { createContext } from 'react';

// -------------------- Role Definitions --------------------
export type UserRole = 'admin' | 'user';

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
}

export interface IClient extends IBaseUser {
  clientId?: string;
  trainerId: string;
  sex?: string;
}

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

// -------------------- Auth State (State Only) --------------------
export interface IAuthState {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  error?: string;
  isAuthenticated: boolean;
  user?: IUser;
  permissions?: string[];
  token: string | null;
  userRole: string | null;
  authLoaded: boolean;
}

// -------------------- Actions Context --------------------
export interface IAuthActionContext {
  login: (credentials: ILoginRequest) => Promise<void>;
  registerTrainer: (userData: ITrainerRegisterRequest) => Promise<void>;
  createClient: (userData: IClientCreateRequest) => Promise<void>;
  registerClient: (userData: IClientRegisterRequest) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  refreshToken?: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
}

// -------------------- Combined Context Type (Optional) --------------------
export type IAuthStateContext = IAuthState & IAuthActionContext;

// -------------------- Initial State --------------------
export const INITIAL_AUTH_STATE: IAuthState = {
  isPending: false,
  isSuccess: false,
  isError: false,
  isAuthenticated: false,
  user: undefined,
  permissions: [],
  token: null,
  userRole: null,
  authLoaded: false,
};

// -------------------- Contexts --------------------
export const AuthStateContext = createContext<IAuthState>(INITIAL_AUTH_STATE);
export const AuthActionContext = createContext<IAuthActionContext>(undefined!);
