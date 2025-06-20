import { handleActions, Action } from "redux-actions";
import {
  ITrainerDashboardState,
  INITIAL_TRAINER_STATE,
  ITrainer,
} from "./context";
import { TrainerDashboardActionEnums } from "./actions";
import { IClient } from "@/providers/authProvider/context";

export const TrainerDashboardReducer = handleActions<ITrainerDashboardState, unknown>(
  {
    [TrainerDashboardActionEnums.getCurrentTrainerPending]: (state) => ({
      ...state,
      isPending: true,
      isSuccess: false,
      isError: false,
    }),

    [TrainerDashboardActionEnums.getCurrentTrainerSuccess]: (
      state,
      action: Action<unknown>
    ) => {
      const trainer = action.payload as ITrainer;
      return {
        ...state,
        currentTrainer: trainer,
        isPending: false,
        isError: false,
        isSuccess: true,
      };
    },

    [TrainerDashboardActionEnums.getCurrentTrainerError]: (state) => ({
      ...state,
      isPending: false,
      isError: true,
      isSuccess: false,
    }),

    [TrainerDashboardActionEnums.getClientsPending]: (state) => ({
      ...state,
      isPending: true,
    }),

    [TrainerDashboardActionEnums.getClientsSuccess]: (
      state,
      action: Action<unknown>
    ) => {
      const clients = action.payload as IClient[];
      return {
        ...state,
        clients: clients ?? [],
        isPending: false,
        isError: false,
        isSuccess: true,
      };
    },

    [TrainerDashboardActionEnums.getClientsError]: (state) => ({
      ...state,
      clients: [],
      isPending: false,
      isError: true,
      isSuccess: false,
    }),
  },
  INITIAL_TRAINER_STATE
);
