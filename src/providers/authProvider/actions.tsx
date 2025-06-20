import { createAction } from 'redux-actions';
import { IUser } from './context';

// Enums
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

export const loginPending = createAction(AuthActionEnums.LoginPending);

export const loginSuccess = createAction<{ user: IUser; token: string }>(
  AuthActionEnums.LoginSuccess
);

export const loginError = createAction<string>(
  AuthActionEnums.LoginError
);

// -------------------- Register Trainer --------------------

export const registerTrainerPending = createAction(AuthActionEnums.RegisterTrainerPending);

export const registerTrainerSuccess = createAction<{ user: IUser; token: string }>(
  AuthActionEnums.RegisterTrainerSuccess
);

export const registerTrainerError = createAction<string>(
  AuthActionEnums.RegisterTrainerError
);

// -------------------- Register Client --------------------

export const registerClientPending = createAction(AuthActionEnums.RegisterClientPending);

export const registerClientSuccess = createAction<{ user: IUser; token: string }>(
  AuthActionEnums.RegisterClientSuccess
);

export const registerClientError = createAction<string>(
  AuthActionEnums.RegisterClientError
);

// -------------------- Create Client --------------------

export const createClientPending = createAction(AuthActionEnums.CreateClientPending);

export const createClientSuccess = createAction(AuthActionEnums.CreateClientSuccess);

export const createClientError = createAction<string>(
  AuthActionEnums.CreateClientError
);

// -------------------- Logout --------------------

export const logoutPending = createAction(AuthActionEnums.LogoutPending);

export const logoutSuccess = createAction(AuthActionEnums.LogoutSuccess);

export const logoutError = createAction<string>(
  AuthActionEnums.LogoutError
);

// -------------------- Check Auth --------------------

export const checkAuthPending = createAction(AuthActionEnums.CheckAuthPending);

export const checkAuthSuccess = createAction<{ user: IUser; token: string }>(
  AuthActionEnums.CheckAuthSuccess
);

export const checkAuthError = createAction<string>(
  AuthActionEnums.CheckAuthError
);

// -------------------- Refresh Token --------------------

export const refreshTokenPending = createAction(AuthActionEnums.RefreshTokenPending);

export const refreshTokenSuccess = createAction<string>(
  AuthActionEnums.RefreshTokenSuccess
);

export const refreshTokenError = createAction<string>(
  AuthActionEnums.RefreshTokenError
);
