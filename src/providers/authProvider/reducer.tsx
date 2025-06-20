import { handleActions, Action } from 'redux-actions';
import { IAuthState, IUser, INITIAL_AUTH_STATE } from './context';
import { AuthActionEnums } from './actions';

// Payload types
type PayloadWithUserAndToken = { user: IUser; token: string };
type PayloadWithToken = { token: string };
type PayloadWithError = string;

export const AuthReducer = handleActions<IAuthState, unknown>(
  {
    // Login Flow
    [AuthActionEnums.LoginPending]: (state) => ({
      ...state,
      isPending: true,
      isSuccess: false,
      isError: false,
      error: '',
    }),

    [AuthActionEnums.LoginSuccess]: (state, action: Action<unknown>) => {
      const payload = action.payload as PayloadWithUserAndToken;
      if (!payload?.user || !payload?.token) {
        console.warn('[AuthReducer] ⚠️ Invalid LoginSuccess payload:', action.payload);
        return {
          ...state,
          isPending: false,
          isSuccess: false,
          isError: true,
          isAuthenticated: false,
          token: null,
          user: null,
          userRole: null,
          authLoaded: true,
          error: 'Invalid login payload',
        };
      }

      return {
        ...state,
        isPending: false,
        isSuccess: true,
        isError: false,
        isAuthenticated: true,
        user: payload.user,
        token: payload.token,
        userRole: payload.user.role ?? null,
        authLoaded: true,
      };
    },

    [AuthActionEnums.LoginError]: (state, action: Action<unknown>) => ({
      ...state,
      isPending: false,
      isSuccess: false,
      isError: true,
      isAuthenticated: false,
      token: null,
      user: null,
      userRole: null,
      error: (action.payload as PayloadWithError) ?? 'Unknown login error',
    }),

    //  Register Trainer
    [AuthActionEnums.RegisterTrainerPending]: (state) => ({
      ...state,
      isPending: true,
      isSuccess: false,
      isError: false,
      error: '',
    }),

    [AuthActionEnums.RegisterTrainerSuccess]: (state, action: Action<unknown>) => {
      const payload = action.payload as PayloadWithUserAndToken;
      if (!payload?.user || !payload?.token) {
        return state;
      }

      return {
        ...state,
        isPending: false,
        isSuccess: true,
        isError: false,
        isAuthenticated: true,
        user: payload.user,
        token: payload.token,
        userRole: payload.user.role ?? null,
        authLoaded: true,
      };
    },

    [AuthActionEnums.RegisterTrainerError]: (state, action: Action<unknown>) => ({
      ...state,
      isPending: false,
      isSuccess: false,
      isError: true,
      isAuthenticated: false,
      error: (action.payload as PayloadWithError) ?? 'Trainer registration error',
    }),

    // 👥 Register Client
    [AuthActionEnums.RegisterClientPending]: (state) => ({
      ...state,
      isPending: true,
      isSuccess: false,
      isError: false,
      error: '',
    }),

    [AuthActionEnums.RegisterClientSuccess]: (state, action: Action<unknown>) => {
      const payload = action.payload as PayloadWithUserAndToken;
      if (!payload?.user || !payload?.token) {
        return state;
      }

      return {
        ...state,
        isPending: false,
        isSuccess: true,
        isError: false,
        isAuthenticated: true,
        user: payload.user,
        token: payload.token,
        userRole: payload.user.role ?? null,
        authLoaded: true,
      };
    },

    [AuthActionEnums.RegisterClientError]: (state, action: Action<unknown>) => ({
      ...state,
      isPending: false,
      isSuccess: false,
      isError: true,
      isAuthenticated: false,
      error: (action.payload as PayloadWithError) ?? 'Client registration error',
    }),

    // Create Client (no login involved)
    [AuthActionEnums.CreateClientPending]: (state) => ({
      ...state,
      isPending: true,
      isSuccess: false,
      isError: false,
      error: '',
    }),

    [AuthActionEnums.CreateClientSuccess]: (state) => ({
      ...state,
      isPending: false,
      isSuccess: true,
      isError: false,
    }),

    [AuthActionEnums.CreateClientError]: (state, action: Action<unknown>) => ({
      ...state,
      isPending: false,
      isSuccess: false,
      isError: true,
      error: (action.payload as PayloadWithError) ?? 'Create client failed',
    }),

    //  Logout
    [AuthActionEnums.LogoutPending]: (state) => ({
      ...state,
      isPending: true,
      isSuccess: false,
      isError: false,
    }),

    [AuthActionEnums.LogoutSuccess]: () => ({
      ...INITIAL_AUTH_STATE,
    }),

    [AuthActionEnums.LogoutError]: (state, action: Action<unknown>) => ({
      ...state,
      isPending: false,
      isSuccess: false,
      isError: true,
      error: (action.payload as PayloadWithError) ?? 'Logout failed',
    }),

    //  Check Auth
    [AuthActionEnums.CheckAuthPending]: (state) => ({
      ...state,
      isPending: true,
      isSuccess: false,
      isError: false,
    }),

    [AuthActionEnums.CheckAuthSuccess]: (state, action: Action<unknown>) => {
      const payload = action.payload as PayloadWithUserAndToken;
      if (!payload?.user || !payload?.token) {
        return state;
      }

      return {
        ...state,
        isPending: false,
        isSuccess: true,
        isError: false,
        isAuthenticated: true,
        user: payload.user,
        token: payload.token,
        userRole: payload.user.role ?? null,
        authLoaded: true,
      };
    },

    [AuthActionEnums.CheckAuthError]: (state, action: Action<unknown>) => ({
      ...state,
      isPending: false,
      isSuccess: false,
      isError: true,
      isAuthenticated: false,
      token: null,
      user: null,
      userRole: null,
      error: (action.payload as PayloadWithError) ?? 'Auth check failed',
    }),

    //  Refresh Token
    [AuthActionEnums.RefreshTokenPending]: (state) => ({
      ...state,
      isPending: true,
      isSuccess: false,
      isError: false,
    }),

    [AuthActionEnums.RefreshTokenSuccess]: (state, action: Action<unknown>) => {
      const payload = action.payload as PayloadWithToken;
      return {
        ...state,
        isPending: false,
        isSuccess: true,
        token: payload.token ?? null,
      };
    },

    [AuthActionEnums.RefreshTokenError]: (state, action: Action<unknown>) => ({
      ...state,
      isPending: false,
      isError: true,
      error: (action.payload as PayloadWithError) ?? 'Token refresh failed',
    }),
  },
  INITIAL_AUTH_STATE
);
