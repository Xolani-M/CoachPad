// src/providers/authProvider/reducer.tsx

import { handleActions } from 'redux-actions';
import { IAuthStateContext, INITIAL_AUTH_STATE } from './context';
import { AuthActionEnums } from './actions';

export const AuthReducer = handleActions<IAuthStateContext, IAuthStateContext>(
  {
    [AuthActionEnums.LoginPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [AuthActionEnums.LoginSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [AuthActionEnums.LoginError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [AuthActionEnums.RegisterTrainerPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [AuthActionEnums.RegisterTrainerSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [AuthActionEnums.RegisterTrainerError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [AuthActionEnums.RegisterClientPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [AuthActionEnums.RegisterClientSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [AuthActionEnums.RegisterClientError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [AuthActionEnums.CreateClientPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [AuthActionEnums.CreateClientSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [AuthActionEnums.CreateClientError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [AuthActionEnums.LogoutPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [AuthActionEnums.LogoutSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [AuthActionEnums.LogoutError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [AuthActionEnums.CheckAuthPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [AuthActionEnums.CheckAuthSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [AuthActionEnums.CheckAuthError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [AuthActionEnums.RefreshTokenPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [AuthActionEnums.RefreshTokenSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [AuthActionEnums.RefreshTokenError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_AUTH_STATE
);
