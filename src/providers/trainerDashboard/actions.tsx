import { createAction } from "redux-actions";
import { ITrainer, ITrainerDashboardState } from "./context";
import { IClient } from "@/providers/authProvider/context";


// ------------------ Action Types ------------------
export enum TrainerDashboardActionEnums {
  getCurrentTrainerPending = "GET_CURRENT_TRAINER_PENDING",
  getCurrentTrainerSuccess = "GET_CURRENT_TRAINER_SUCCESS",
  getCurrentTrainerError = "GET_CURRENT_TRAINER_ERROR",

  getClientsPending = "GET_CLIENTS_PENDING",
  getClientsSuccess = "GET_CLIENTS_SUCCESS",
  getClientsError = "GET_CLIENTS_ERROR",
}

// ------------------ Trainer Actions ------------------
export const getCurrentTrainerPending = createAction<ITrainerDashboardState>(
  TrainerDashboardActionEnums.getCurrentTrainerPending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false,
    currentTrainer: null,
    clients: [],
  })
);

export const getCurrentTrainerSuccess = createAction<ITrainerDashboardState, ITrainer>(
  TrainerDashboardActionEnums.getCurrentTrainerSuccess,
  (trainer: ITrainer) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    currentTrainer: trainer,
    clients: [],
  })
);

export const getCurrentTrainerError = createAction<ITrainerDashboardState>(
  TrainerDashboardActionEnums.getCurrentTrainerError,
  () => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    currentTrainer: null,
    clients: [],
  })
);

// ------------------ Client Actions ------------------
export const getClientsPending = createAction<ITrainerDashboardState>(
  TrainerDashboardActionEnums.getClientsPending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false,
    currentTrainer: null,
    clients: [],
  })
);

export const getClientsSuccess = createAction<ITrainerDashboardState, IClient[]>(
  TrainerDashboardActionEnums.getClientsSuccess,
  (clients: IClient[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    currentTrainer: null,
    clients,
  })
);

export const getClientsError = createAction<ITrainerDashboardState>(
  TrainerDashboardActionEnums.getClientsError,
  () => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    currentTrainer: null,
    clients: [],
  })
);
