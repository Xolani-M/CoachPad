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
import { IUser } from './context';


const TOKEN_COOKIE_NAME = 'token';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_AUTH_STATE);

  const setTokenCookie = (token: string) => {
    const cleanToken = token.replace(/^Bearer\s+/, '');
    Cookies.set(TOKEN_COOKIE_NAME, cleanToken, { expires: 7, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });
  };

  const handleAuthResponse = useCallback(async (email: string, password: string) => {
    const { data } = await getAxiosInstance().post(
      '/users/login',
      qs.stringify({ email, password }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );


    
    const token: string = data?.data?.token ?? data?.token;
    if (!token) throw new Error('No token received');

    const cleanToken = token.replace(/^Bearer\s+/, '');
    setTokenCookie(cleanToken);

    const decoded = decodeToken(cleanToken);
    const user = mapDecodedTokenToUser(decoded);

    
    
    dispatch(actions.loginSuccess({ token: cleanToken, user }));
    
    return { user, token: cleanToken };
  }, []);

  const login = useCallback(async (credentials: ILoginRequest) => {
    dispatch(actions.loginPending());
    

    try {
      const { data } = await getAxiosInstance().post(
        '/users/login',
        qs.stringify(credentials),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );

      const token: string = data?.data?.token ?? data?.token;
      if (!token) throw new Error('No token received');

      const cleanToken = token.replace(/^Bearer\s+/, '');
      setTokenCookie(cleanToken);

      const decoded = decodeToken(cleanToken);
      const user = mapDecodedTokenToUser(decoded);
      console.log('[✔️ Mapped User]', user);

      dispatch(actions.loginSuccess({ user, token: cleanToken }));
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Login failed';
      dispatch(actions.loginError(message));
    }
  }, []);

  const registerTrainer = useCallback(async (trainer: ITrainerRegisterRequest) => {
    dispatch(actions.registerTrainerPending());

    const payload = qs.stringify({
      name: trainer.name,
      email: trainer.email,
      password: trainer.password,
      confirmPassword: trainer.confirmPassword,
      contactNumber: trainer.contactNumber,
      role: 'admin',
      planType: trainer.planType || 'base',
      activeState: String(trainer.activeState ?? true),
      trial: String(trainer.trial ?? false),
      policiesAccepted: String(trainer.policiesAccepted ?? true),
    });

    try {
      console.log('Submitting payload:', payload);
      await getAxiosInstance().post('/users/register', payload, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      const { user, token } = await handleAuthResponse(trainer.email, trainer.password);
      dispatch(actions.registerTrainerSuccess({ user, token }));

    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Trainer registration failed';
      console.error('Trainer registration error:', message);
      dispatch(actions.registerTrainerError(message));
    }
  }, [handleAuthResponse]);



  const registerClient = useCallback(async (client: IClientRegisterRequest) => {
    dispatch(actions.registerClientPending());

    try {
      await getAxiosInstance().post(
        '/users/register/mobile',
        qs.stringify({
          ...client,
          policiesAccepted: String(client.policiesAccepted ?? true),
        }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );

      const { user, token } = await handleAuthResponse(client.email, client.password);
      dispatch(actions.registerClientSuccess({ user, token })); // ✅ Only user + token

    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Client registration failed';
      dispatch(actions.registerClientError(message));
    }
  }, [handleAuthResponse]);





  const getCurrentUser = useCallback(async (): Promise<{ user: IUser; token: string } | null> => {
  dispatch(actions.checkAuthPending());

  const rawToken = Cookies.get(TOKEN_COOKIE_NAME);
  if (!rawToken) {
    dispatch(actions.checkAuthError('No token found'));
    return null;
  }

  try {
    const token = decodeURIComponent(rawToken);

    const response = await getAxiosInstance().get('/user/current', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const user = response.data?.data;
    if (!user || !user.role) throw new Error('Invalid user returned');

    dispatch(actions.checkAuthSuccess({ user, token }));
    return { user, token };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch current user';
    dispatch(actions.checkAuthError(message));
    return null;
  }
}, []);






  const createClient = useCallback(async (clientData: IClientCreateRequest) => {
  dispatch(actions.createClientPending());

  try {
    const rawToken = Cookies.get(TOKEN_COOKIE_NAME);
    const token = rawToken ? decodeURIComponent(rawToken) : null;
    if (!token) throw new Error('No token found');

    const decoded = decodeToken(token);
    const trainerId = decoded?.id;
    if (!trainerId) throw new Error('Trainer ID missing from token');

    console.log('🧠 Creating client with trainerId from token:', trainerId);

    await getAxiosInstance().post(
      '/client',
      qs.stringify({ ...clientData, trainerId, activeState: 'true' }),
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
    console.error('Client creation failed:', message);
    dispatch(actions.createClientError(message));
    throw error; // let calling component see the error
  }
}, []);



  const logout = useCallback(async () => {
    dispatch(actions.logoutPending());
    try {
      Cookies.remove(TOKEN_COOKIE_NAME);
      dispatch(actions.logoutSuccess());
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Logout failed';
      dispatch(actions.logoutError(message));
    }
  }, []);

  const checkAuth = useCallback(async () => {
    dispatch(actions.checkAuthPending());

    const rawToken = Cookies.get(TOKEN_COOKIE_NAME);
    const token = rawToken ? decodeURIComponent(rawToken) : null;

    if (!token) {
      dispatch(actions.checkAuthError('No token found'));
      return;
    }

    try {
      const decoded = decodeToken(token);
      const user = mapDecodedTokenToUser(decoded);

      if (!user || !user.role) {
        throw new Error('Invalid token or user mapping');
      }

      dispatch(actions.checkAuthSuccess({ user, token }));
    } catch (error: unknown) {
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
    getCurrentUser,
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
