'use client';

import React, { useContext, useReducer, useCallback, ReactNode } from 'react';
import Cookies from 'js-cookie';
import qs from 'qs';
import { getAxiosInstance } from '@/utils/axiosInstance';
import { decodeToken } from '@/utils/auth/JwtHandler';
import { mapDecodedTokenToUser } from '@/utils/auth/mapDecodedTokenToUser';
import {
  INITIAL_AUTH_STATE,
  ILoginRequest,
  ITrainerRegisterRequest,
  IClientRegisterRequest,
  IClientCreateRequest,
  AuthActionContext,
  AuthStateContext,
} from './context';
import { AuthReducer } from './reducer';
import * as actions from './actions';

const TOKEN_COOKIE_NAME = 'token';
const TOKEN_EXPIRY_DAYS = 7;

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_AUTH_STATE);

  const setTokenCookie = (token: string) => {
    Cookies.set(TOKEN_COOKIE_NAME, token, { expires: TOKEN_EXPIRY_DAYS });
  };

  const removeTokenCookie = () => {
    Cookies.remove(TOKEN_COOKIE_NAME);
  };

  const handleAuthResponse = useCallback(
    async (email: string, password: string) => {
      const { data } = await getAxiosInstance().post(
        '/users/login',
        qs.stringify({ email, password }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );

      const token: string = data?.data?.token ?? data?.token;
      if (!token) throw new Error('No token received');

      setTokenCookie(token);
      const decoded = decodeToken(token.replace('Bearer ', ''));
      const user = mapDecodedTokenToUser(decoded);
      return { user, token };
    },
    []
  );
  


  const login = useCallback(
    async (credentials: ILoginRequest) => {
      dispatch(actions.loginPending());
      try {
        removeTokenCookie();
        const authData = await handleAuthResponse(credentials.email, credentials.password);
        dispatch(actions.loginSuccess(authData));
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Login failed';
        dispatch(actions.loginError(message));
      }
    },
    [handleAuthResponse]
  );

  const registerTrainer = useCallback(
    async (trainer: ITrainerRegisterRequest) => {
      dispatch(actions.registerTrainerPending());

      const payload = qs.stringify({
        ...trainer,
        role: 'admin',
        planType: 'base',
        activeState: 'true',
        trial: 'false',
        policiesAccepted: 'true',
      });

      try {
        await getAxiosInstance().post('/users/register', payload, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        const authData = await handleAuthResponse(trainer.email, trainer.password);
        dispatch(actions.registerTrainerSuccess(authData));
      } catch (error: unknown) {
        let message = 'Trainer registration failed';
        if (
          typeof error === 'object' &&
          error !== null &&
          'response' in error
        ) {
        } else if (error instanceof Error) {
          message = error.message;
        }
        dispatch(actions.registerTrainerError(message));
      }
    },
    [handleAuthResponse]
  );

  const registerClient = useCallback(
    async (client: IClientRegisterRequest) => {
      dispatch(actions.registerClientPending());
      removeTokenCookie();

      try {
        await getAxiosInstance().post(
          '/users/register/mobile',
          qs.stringify({
            ...client,
            policiesAccepted: client.policiesAccepted ? 'true' : 'false',
          }),
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );

        const authData = await handleAuthResponse(client.email, client.password);
        dispatch(actions.registerClientSuccess(authData));
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Client registration failed';
        dispatch(actions.registerClientError(message));
      }
    },
    [handleAuthResponse]
  );

  const createClient = useCallback(
    async (clientData: IClientCreateRequest) => {
      dispatch(actions.createClientPending());
      try {
        const token = Cookies.get(TOKEN_COOKIE_NAME);
        if (!token) throw new Error('No token found');

        await getAxiosInstance().post(
          '/client',
          qs.stringify({ ...clientData, activeState: 'true' }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(actions.createClientSuccess());
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Create client failed';
        dispatch(actions.createClientError(message));
      }
    },
    []
  );

  const logout = useCallback(async () => {
    dispatch(actions.logoutPending());
    try {
      removeTokenCookie();
      dispatch(actions.logoutSuccess());
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Logout failed';
      dispatch(actions.logoutError(message));
    }
  }, []);

  const checkAuth = useCallback(async () => {
    dispatch(actions.checkAuthPending());
    const token = Cookies.get(TOKEN_COOKIE_NAME);
    if (!token) {
      dispatch(actions.checkAuthError('No token found'));
      return;
    }

    try {
      const decoded = decodeToken(token.replace('Bearer ', ''));
      const user = mapDecodedTokenToUser(decoded);
      if (user) {
        dispatch(actions.checkAuthSuccess({ user, token }));
      } else {
        throw new Error('No user returned');
      }
    } catch (error: unknown) {
      removeTokenCookie();
      const message = error instanceof Error ? error.message : 'Auth check failed';
      dispatch(actions.checkAuthError(message));
    }
  }, []);

  const authActions = {
    login,
    registerTrainer,
    registerClient,
    createClient,
    logout,
    checkAuth,
  };

  return (
    <AuthStateContext.Provider value={state}>
      <AuthActionContext.Provider value={authActions}>
        {children}
      </AuthActionContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (!context) throw new Error('useAuthState must be used within an AuthProvider');
  return context;
};

export const useAuthActions = () => {
  const context = useContext(AuthActionContext);
  if (!context) throw new Error('useAuthActions must be used within an AuthProvider');
  return context;
};
