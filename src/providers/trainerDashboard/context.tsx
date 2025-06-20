import { createContext } from "react";
import { IClient } from '@/providers/authProvider/context';

// Represents the current trainer's data
export interface ITrainer {
  id: string;
  name: string;
  email: string;
  role: string;
  contactNumber?: string;
}

export interface ITrainerDashboardState {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  currentTrainer: ITrainer | null;
  clients: IClient[]; 
}

export interface ITrainerDashboardActions {
  getCurrentTrainer: () => Promise<void>;
  getClientsForTrainer: (trainerId: string) => Promise<void>;
}

export const INITIAL_TRAINER_STATE: ITrainerDashboardState = {
  isPending: false,
  isSuccess: false,
  isError: false,
  currentTrainer: null,
  clients: [],
};

export const TrainerDashboardStateContext = createContext<ITrainerDashboardState>(INITIAL_TRAINER_STATE);
export const TrainerDashboardActionContext = createContext<ITrainerDashboardActions | undefined>(undefined);
