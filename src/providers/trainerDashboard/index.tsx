'use client';

import React, { useContext, useReducer, useEffect, useCallback } from 'react';
import { useAuthState, useAuthActions } from '@/providers/authProvider';
import {
  TrainerDashboardStateContext,
  TrainerDashboardActionContext,
  ITrainerDashboardState,
  ITrainerDashboardActions,
  INITIAL_TRAINER_STATE,
} from './context';
import {
  getCurrentTrainerPending,
  getCurrentTrainerSuccess,
  getCurrentTrainerError,
} from './actions';
import { TrainerDashboardReducer } from './reducer';
import { ITrainer } from '@/providers/authProvider/context';

export const TrainerDashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(TrainerDashboardReducer, INITIAL_TRAINER_STATE);

  //Hook usage at the top level
  const { token, userRole, user } = useAuthState();
  const { getCurrentUser } = useAuthActions();

  const getCurrentTrainer = useCallback(async () => {
    dispatch(getCurrentTrainerPending());

    try {
      if (!token || userRole !== 'admin') {
        throw new Error('Unauthorized access');
      }

      // ✅ Refetch user data
      await getCurrentUser();

      // ✅ Use the user from the updated auth state
      dispatch(getCurrentTrainerSuccess(user as ITrainer));
    } catch (error) {
      console.error('Failed to fetch current trainer:', error);
      dispatch(getCurrentTrainerError());
    }
  }, [token, userRole, getCurrentUser, user]);

  useEffect(() => {
    getCurrentTrainer();
  }, [getCurrentTrainer]);

  return (
    <TrainerDashboardStateContext.Provider value={state}>
      <TrainerDashboardActionContext.Provider value={{ getCurrentTrainer }}>
        {children}
      </TrainerDashboardActionContext.Provider>
    </TrainerDashboardStateContext.Provider>
  );
};

// Hook to consume state
export const useTrainerDashboardState = (): ITrainerDashboardState => {
  const context = useContext(TrainerDashboardStateContext);
  if (!context) {
    throw new Error('useTrainerDashboardState must be used within a TrainerDashboardProvider');
  }
  return context;
};

// Hook to consume actions
export const useTrainerDashboardActions = (): ITrainerDashboardActions => {
  const context = useContext(TrainerDashboardActionContext);
  if (!context) {
    throw new Error('useTrainerDashboardActions must be used within a TrainerDashboardProvider');
  }
  return context;
};
