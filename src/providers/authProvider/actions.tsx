import { createAction } from 'redux-actions';
import { IAuthState, IUser } from './context';

export enum AuthActionEnums {
  LoginPending = 'LOGIN_PENDING',
  LoginSuccess = 'LOGIN_SUCCESS',
  LoginError = 'LOGIN_ERROR',

  RegisterTrainerPending = 'REGISTER_TRAINER_PENDING',
  RegisterTrainerSuccess = 'REGISTER_TRAINER_SUCCESS',
  RegisterTrainerError = 'REGISTER_TRAINER_ERROR',

  RegisterClientPending = 'REGISTER_CLIENT_PENDING',
  RegisterClientSuccess = 'REGISTER_CLIENT_SUCCESS',
  RegisterClientError = 'REGISTER_CLIENT_ERROR',

  CreateClientPending = 'CREATE_CLIENT_PENDING',
  CreateClientSuccess = 'CREATE_CLIENT_SUCCESS',
  CreateClientError = 'CREATE_CLIENT_ERROR',

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

// -------------------- Login --------------------

export const loginPending = createAction<IAuthState>(
  AuthActionEnums.LoginPending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false,
    isAuthenticated: false,
    token: null,
    userRole: null,
    authLoaded: true,
  })
);

export const loginSuccess = createAction<IAuthState, { user: IUser; token: string }>(
  AuthActionEnums.LoginSuccess,
  ({ user, token }) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    isAuthenticated: true,
    token,
    userRole: user.role,
    authLoaded: true,
  })
);

export const loginError = createAction<IAuthState, string>(
  AuthActionEnums.LoginError,
  (error) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    isAuthenticated: false,
    error,
    token: null,
    userRole: null,
    authLoaded: true,
  })
);

// -------------------- Register Trainer --------------------

export const registerTrainerPending = createAction<IAuthState>(
  AuthActionEnums.RegisterTrainerPending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false,
    isAuthenticated: false,
    token: null,
    userRole: null,
    authLoaded: true,
  })
);

export const registerTrainerSuccess = createAction<IAuthState, { user: IUser; token: string }>(
  AuthActionEnums.RegisterTrainerSuccess,
  ({ user, token }) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    isAuthenticated: true,
    user,
    token,
    userRole: user.role,
    authLoaded: true,
  })
);

export const registerTrainerError = createAction<IAuthState, string>(
  AuthActionEnums.RegisterTrainerError,
  (error) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    isAuthenticated: false,
    error,
    token: null,
    userRole: null,
    authLoaded: true,
  })
);

// -------------------- Register Client --------------------

export const registerClientPending = createAction<IAuthState>(
  AuthActionEnums.RegisterClientPending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false,
    isAuthenticated: false,
    token: null,
    userRole: null,
    authLoaded: true,
  })
);

export const registerClientSuccess = createAction<IAuthState, { user: IUser; token: string }>(
  AuthActionEnums.RegisterClientSuccess,
  ({ user, token }) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    isAuthenticated: true,
    user,
    token,
    userRole: user.role,
    authLoaded: true,
  })
);

export const registerClientError = createAction<IAuthState, string>(
  AuthActionEnums.RegisterClientError,
  (error) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    isAuthenticated: false,
    error,
    token: null,
    userRole: null,
    authLoaded: true,
  })
);

// -------------------- Create Client --------------------

export const createClientPending = createAction<IAuthState>(
  AuthActionEnums.CreateClientPending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false,
    isAuthenticated: true,
    token: null,
    userRole: null,
    authLoaded: true,
  })
);

export const createClientSuccess = createAction<IAuthState>(
  AuthActionEnums.CreateClientSuccess,
  () => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    isAuthenticated: true,
    token: null,
    userRole: null,
    authLoaded: true,
  })
);

export const createClientError = createAction<IAuthState, string>(
  AuthActionEnums.CreateClientError,
  (error) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    isAuthenticated: true,
    error,
    token: null,
    userRole: null,
    authLoaded: true,
  })
);

// -------------------- Logout --------------------

export const logoutPending = createAction<IAuthState>(
  AuthActionEnums.LogoutPending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false,
    isAuthenticated: true,
    token: null,
    userRole: null,
    authLoaded: true,
  })
);

export const logoutSuccess = createAction<IAuthState>(
  AuthActionEnums.LogoutSuccess,
  () => ({
    isPending: false,
    isSuccess: false,
    isError: false,
    isAuthenticated: false,
    user: undefined,
    token: null,
    userRole: null,
    authLoaded: true,
  })
);

export const logoutError = createAction<IAuthState, string>(
  AuthActionEnums.LogoutError,
  (error) => ({
    isPending: false,
    isError: true,
    isAuthenticated: true,
    error,
    token: null,
    userRole: null,
    isSuccess: false,
    authLoaded: true,
  })
);

// -------------------- Check Auth --------------------

export const checkAuthPending = createAction<IAuthState>(
  AuthActionEnums.CheckAuthPending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false,
    isAuthenticated: false,
    token: null,
    userRole: null,
    authLoaded: false,
  })
);

export const checkAuthSuccess = createAction<IAuthState, { user: IUser; token: string }>(
  AuthActionEnums.CheckAuthSuccess,
  ({ user, token }) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    isAuthenticated: true,
    user,
    token,
    userRole: user.role,
    authLoaded: true,
  })
);

export const checkAuthError = createAction<IAuthState, string>(
  AuthActionEnums.CheckAuthError,
  (error) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    isAuthenticated: false,
    error,
    token: null,
    userRole: null,
    authLoaded: true,
  })
);

// -------------------- Refresh Token --------------------

export const refreshTokenPending = createAction<IAuthState>(
  AuthActionEnums.RefreshTokenPending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false,
    isAuthenticated: true,
    token: null,
    userRole: null,
    authLoaded: true,
  })
);

export const refreshTokenSuccess = createAction<IAuthState, string>(
  AuthActionEnums.RefreshTokenSuccess,
  (token) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    isAuthenticated: true,
    token,
    userRole: null,
    authLoaded: true,
  })
);

export const refreshTokenError = createAction<IAuthState, string>(
  AuthActionEnums.RefreshTokenError,
  (error) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    isAuthenticated: true,
    error,
    token: null,
    userRole: null,
    authLoaded: true,
  })
);
