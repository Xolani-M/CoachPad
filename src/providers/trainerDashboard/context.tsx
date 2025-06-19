import { createContext } from "react";

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
}

export interface ITrainerDashboardActions {
  getCurrentTrainer: () => Promise<void>;
}

export const INITIAL_TRAINER_STATE: ITrainerDashboardState = {
  isPending: false,
  isSuccess: false,
  isError: false,
  currentTrainer: null,
};

export const TrainerDashboardStateContext = createContext<ITrainerDashboardState>(INITIAL_TRAINER_STATE);
export const TrainerDashboardActionContext = createContext<ITrainerDashboardActions | undefined>(undefined);
