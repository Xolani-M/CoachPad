'use client';

import React, { useContext, useReducer, useCallback } from 'react';
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
  getClientsPending,
  getClientsSuccess,
  getClientsError,
} from './actions';
import { TrainerDashboardReducer } from './reducer';
import { useAuthActions } from '@/providers/authProvider';
import { getAxiosInstance } from '@/utils/axiosInstance';


export const TrainerDashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(TrainerDashboardReducer, INITIAL_TRAINER_STATE);
  const { getCurrentUser } = useAuthActions();

  /**
   * Fetch and normalize the current logged-in trainer info.
   */
  const getCurrentTrainer = useCallback(async () => {
  dispatch(getCurrentTrainerPending());

  try {
    const authData = await getCurrentUser();
    if (!authData || !authData.token || !authData.user) throw new Error('Unauthorized');

    const trainer = authData.user;

    console.log('[✅ Trainer from Auth]]', trainer);

    if (!trainer.id) {
      throw new Error('Trainer ID missing in user object');
    }

    dispatch(getCurrentTrainerSuccess(trainer));
  } catch (error) {
    console.error('Failed to fetch current trainer:', error);
    dispatch(getCurrentTrainerError());
  }
}, [getCurrentUser]);






  /**
   * Fetch clients assigned to the current trainer.
   */
  const getClientsForTrainer = useCallback(async (trainerId: string) => {
  dispatch(getClientsPending());

  try {
    if (!trainerId) throw new Error('Trainer ID missing');

    const response = await getAxiosInstance().get(`/client/trainer/${trainerId}/clients`);
    const clients = response.data?.data || [];

    dispatch(getClientsSuccess(clients));
  } catch (error) {
    console.error('Failed to fetch clients:', error);
    dispatch(getClientsError());
  }
}, []);



  return (
    <TrainerDashboardStateContext.Provider value={state}>
      <TrainerDashboardActionContext.Provider
        value={{ getCurrentTrainer, getClientsForTrainer }}
      >
        {children}
      </TrainerDashboardActionContext.Provider>
    </TrainerDashboardStateContext.Provider>
  );
};

/**
 * Custom hook to access trainer dashboard state.
 */
export const useTrainerDashboardState = (): ITrainerDashboardState => {
  const context = useContext(TrainerDashboardStateContext);
  if (!context)
    throw new Error('useTrainerDashboardState must be used within a TrainerDashboardProvider');
  return context;
};

/**
 * Custom hook to access trainer dashboard actions.
 */
export const useTrainerDashboardActions = (): ITrainerDashboardActions => {
  const context = useContext(TrainerDashboardActionContext);
  if (!context)
    throw new Error('useTrainerDashboardActions must be used within a TrainerDashboardProvider');
  return context;
};
