import { createAction } from "redux-actions";
import { ITrainer, ITrainerDashboardState } from "./context";

// Action Types
export enum TrainerDashboardActionEnums {
  getCurrentTrainerPending = "GET_CURRENT_TRAINER_PENDING",
  getCurrentTrainerSuccess = "GET_CURRENT_TRAINER_SUCCESS",
  getCurrentTrainerError = "GET_CURRENT_TRAINER_ERROR",
}

// Pending
export const getCurrentTrainerPending = createAction<ITrainerDashboardState>(
  TrainerDashboardActionEnums.getCurrentTrainerPending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false,
    currentTrainer:null,
  })
);

// Success
export const getCurrentTrainerSuccess = createAction<ITrainerDashboardState, ITrainer>(
  TrainerDashboardActionEnums.getCurrentTrainerSuccess,
  (trainer: ITrainer) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    currentTrainer: trainer,
  })
);

// Error
export const getCurrentTrainerError = createAction<ITrainerDashboardState>(
  TrainerDashboardActionEnums.getCurrentTrainerError,
  () => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    currentTrainer: null,
  })
);
