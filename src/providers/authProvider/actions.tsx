'use client';

import { createAction } from 'redux-actions';
import { IUser, IAuthStateContext } from './context';

export enum AuthActionEnums {
  LoginPending = 'LOGIN_PENDING',
  LoginSuccess = 'LOGIN_SUCCESS',
  LoginError = 'LOGIN_ERROR',

  RegisterTrainerPending = 'REGISTER_TRAINER_PENDING',
  RegisterTrainerSuccess = 'REGISTER_TRAINER_SUCCESS',
  RegisterTrainerError = 'REGISTER_TRAINER_ERROR',

  CreateClientPending = 'CREATE_CLIENT_PENDING',
  CreateClientSuccess = 'CREATE_CLIENT_SUCCESS',
  CreateClientError = 'CREATE_CLIENT_ERROR',

  RegisterClientPending = 'REGISTER_CLIENT_PENDING',
  RegisterClientSuccess = 'REGISTER_CLIENT_SUCCESS',
  RegisterClientError = 'REGISTER_CLIENT_ERROR',

  LogoutPending = 'LOGOUT_PENDING',
  LogoutSuccess = 'LOGOUT_SUCCESS',
  LogoutError = 'LOGOUT_ERROR',

  CheckAuthPending = 'CHECK_AUTH_PENDING',
  CheckAuthSuccess = 'CHECK_AUTH_SUCCESS',
  CheckAuthError = 'CHECK_AUTH_ERROR',

  RefreshTokenPending = 'REFRESH_TOKEN_PENDING',
  RefreshTokenSuccess = 'REFRESH_TOKEN_SUCCESS',
  RefreshTokenError = 'REFRESH_TOKEN_ERROR',
}

// --------------------- LOGIN ---------------------

export const loginPending = createAction<IAuthStateContext>(
  AuthActionEnums.LoginPending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false,
    isAuthenticated: false,
  })
);

export const loginSuccess = createAction<
  IAuthStateContext,
  { user: IUser; token: string; refreshToken?: string }
>(AuthActionEnums.LoginSuccess, ({ user, token, refreshToken }) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  isAuthenticated: true,
  user,
  token,
  refreshToken,
}));

export const loginError = createAction<IAuthStateContext, string>(
  AuthActionEnums.LoginError,
  (error) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    error,
    isAuthenticated: false,
  })
);

// --------------------- REGISTER TRAINER ---------------------

export const registerTrainerPending = createAction<IAuthStateContext>(
  AuthActionEnums.RegisterTrainerPending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false,
    isAuthenticated: false,
  })
);

export const registerTrainerSuccess = createAction<
  IAuthStateContext,
  { user: IUser; token: string; refreshToken?: string }
>(AuthActionEnums.RegisterTrainerSuccess, ({ user, token, refreshToken }) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  isAuthenticated: true,
  user,
  token,
  refreshToken,
}));

export const registerTrainerError = createAction<IAuthStateContext, string>(
  AuthActionEnums.RegisterTrainerError,
  (error) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    error,
    isAuthenticated: false,
  })
);

// --------------------- CREATE CLIENT (by trainer) ---------------------

export const createClientPending = createAction<IAuthStateContext>(
  AuthActionEnums.CreateClientPending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false,
    isAuthenticated: true,
  })
);

export const createClientSuccess = createAction<IAuthStateContext>(
  AuthActionEnums.CreateClientSuccess,
  () => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    isAuthenticated: true,
  })
);

export const createClientError = createAction<IAuthStateContext, string>(
  AuthActionEnums.CreateClientError,
  (error) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    error,
    isAuthenticated: true,
  })
);

// --------------------- REGISTER CLIENT ---------------------

export const registerClientPending = createAction<IAuthStateContext>(
  AuthActionEnums.RegisterClientPending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false,
    isAuthenticated: false,
  })
);

export const registerClientSuccess = createAction<
  IAuthStateContext,
  { user: IUser; token: string; refreshToken?: string }
>(AuthActionEnums.RegisterClientSuccess, ({ user, token, refreshToken }) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  isAuthenticated: true,
  user,
  token,
  refreshToken,
}));

export const registerClientError = createAction<IAuthStateContext, string>(
  AuthActionEnums.RegisterClientError,
  (error) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    error,
    isAuthenticated: false,
  })
);

// --------------------- LOGOUT ---------------------

export const logoutPending = createAction<IAuthStateContext>(
  AuthActionEnums.LogoutPending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false,
    isAuthenticated: true,
  })
);

export const logoutSuccess = createAction<IAuthStateContext>(
  AuthActionEnums.LogoutSuccess,
  () => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    isAuthenticated: false,
  })
);

export const logoutError = createAction<IAuthStateContext, string>(
  AuthActionEnums.LogoutError,
  (error) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    error,
    isAuthenticated: true,
  })
);

// --------------------- AUTH CHECK ---------------------

export const checkAuthPending = createAction<IAuthStateContext>(
  AuthActionEnums.CheckAuthPending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false,
    isAuthenticated: false,
  })
);

export const checkAuthSuccess = createAction<
  IAuthStateContext,
  { user: IUser; token: string; refreshToken?: string }
>(AuthActionEnums.CheckAuthSuccess, ({ user, token, refreshToken }) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  isAuthenticated: true,
  user,
  token,
  refreshToken,
}));

export const checkAuthError = createAction<IAuthStateContext, string>(
  AuthActionEnums.CheckAuthError,
  (error) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    error,
    isAuthenticated: false,
  })
);

// --------------------- REFRESH TOKEN ---------------------

export const refreshTokenPending = createAction<IAuthStateContext>(
  AuthActionEnums.RefreshTokenPending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false,
    isAuthenticated: true,
  })
);

export const refreshTokenSuccess = createAction<
  IAuthStateContext,
  { token: string; refreshToken?: string }
>(AuthActionEnums.RefreshTokenSuccess, ({ token, refreshToken }) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  isAuthenticated: true,
  token,
  refreshToken,
}));

export const refreshTokenError = createAction<IAuthStateContext, string>(
  AuthActionEnums.RefreshTokenError,
  (error) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    error,
    isAuthenticated: false,
  })
);
