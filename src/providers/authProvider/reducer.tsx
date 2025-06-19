import { handleActions } from 'redux-actions';
import { IAuthState, IUser, INITIAL_AUTH_STATE } from './context';
import { AuthActionEnums } from './actions';

type AuthActionPayload =
  | { user: IUser; token: string } // for LoginSuccess, RegisterSuccess, etc.
  | { token: string }              // for RefreshTokenSuccess
  | string                         // for error messages
  | Partial<IAuthState>;           // for generic fallback

export const AuthReducer = handleActions<IAuthState, AuthActionPayload>(
  {
    [AuthActionEnums.LoginPending]: (state) => ({
      ...state,
      isPending: true,
      isSuccess: false,
      isError: false,
      error: '',
    }),

    [AuthActionEnums.LoginSuccess]: (state, action) => ({
      ...state,
      isPending: false,
      isSuccess: true,
      isError: false,
      error: '',
      isAuthenticated: true,
      token: (action.payload as { token: string }).token,
      user: (action.payload as { user: IUser }).user,
      userRole: (action.payload as { user: IUser }).user?.role ?? null,
    }),

    [AuthActionEnums.LoginError]: (state, action) => ({
      ...state,
      isPending: false,
      isSuccess: false,
      isError: true,
      isAuthenticated: false,
      error: action.payload as string,
      token: null,
      user: undefined,
      userRole: null,
    }),

    [AuthActionEnums.RegisterTrainerPending]: (state) => ({
      ...state,
      isPending: true,
      isSuccess: false,
      isError: false,
      error: '',
    }),

    [AuthActionEnums.RegisterTrainerSuccess]: (state, action) => ({
      ...state,
      isPending: false,
      isSuccess: true,
      isError: false,
      isAuthenticated: true,
      token: (action.payload as { token: string }).token,
      user: (action.payload as { user: IUser }).user,
      userRole: (action.payload as { user: IUser }).user?.role ?? null,
    }),

    [AuthActionEnums.RegisterTrainerError]: (state, action) => ({
      ...state,
      isPending: false,
      isSuccess: false,
      isError: true,
      isAuthenticated: false,
      error: action.payload as string,
    }),

    [AuthActionEnums.RegisterClientPending]: (state) => ({
      ...state,
      isPending: true,
      isSuccess: false,
      isError: false,
      error: '',
    }),

    [AuthActionEnums.RegisterClientSuccess]: (state, action) => ({
      ...state,
      isPending: false,
      isSuccess: true,
      isError: false,
      isAuthenticated: true,
      token: (action.payload as { token: string }).token,
      user: (action.payload as { user: IUser }).user,
      userRole: (action.payload as { user: IUser }).user?.role ?? null,
    }),

    [AuthActionEnums.RegisterClientError]: (state, action) => ({
      ...state,
      isPending: false,
      isSuccess: false,
      isError: true,
      isAuthenticated: false,
      error: action.payload as string,
    }),

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
      error: '',
    }),

    [AuthActionEnums.CreateClientError]: (state, action) => ({
      ...state,
      isPending: false,
      isSuccess: false,
      isError: true,
      error: action.payload as string,
    }),

    [AuthActionEnums.LogoutPending]: (state) => ({
      ...state,
      isPending: true,
      isSuccess: false,
      isError: false,
    }),

    [AuthActionEnums.LogoutSuccess]: () => ({
      ...INITIAL_AUTH_STATE,
    }),

    [AuthActionEnums.LogoutError]: (state, action) => ({
      ...state,
      isPending: false,
      isSuccess: false,
      isError: true,
      error: action.payload as string,
    }),

    [AuthActionEnums.CheckAuthPending]: (state) => ({
      ...state,
      isPending: true,
      isSuccess: false,
      isError: false,
    }),

    [AuthActionEnums.CheckAuthSuccess]: (state, action) => ({
      ...state,
      isPending: false,
      isSuccess: true,
      isError: false,
      isAuthenticated: true,
      token: (action.payload as { token: string }).token,
      user: (action.payload as { user: IUser }).user,
      userRole: (action.payload as { user: IUser }).user?.role ?? null,
    }),

    [AuthActionEnums.CheckAuthError]: (state, action) => ({
      ...state,
      isPending: false,
      isSuccess: false,
      isError: true,
      isAuthenticated: false,
      token: null,
      user: undefined,
      userRole: null,
      error: action.payload as string,
    }),

    [AuthActionEnums.RefreshTokenPending]: (state) => ({
      ...state,
      isPending: true,
      isSuccess: false,
      isError: false,
    }),

    [AuthActionEnums.RefreshTokenSuccess]: (state, action) => ({
      ...state,
      isPending: false,
      isSuccess: true,
      token: (action.payload as { token: string }).token,
    }),

    [AuthActionEnums.RefreshTokenError]: (state, action) => ({
      ...state,
      isPending: false,
      isError: true,
      error: action.payload as string,
    }),
  },
  INITIAL_AUTH_STATE
);
