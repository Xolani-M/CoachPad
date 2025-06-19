import { handleActions } from "redux-actions";
import { ITrainerDashboardState, INITIAL_TRAINER_STATE } from "./context";
import { TrainerDashboardActionEnums } from "./actions";

export const TrainerDashboardReducer = handleActions<ITrainerDashboardState, ITrainerDashboardState>({
  [TrainerDashboardActionEnums.getCurrentTrainerPending]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [TrainerDashboardActionEnums.getCurrentTrainerSuccess]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [TrainerDashboardActionEnums.getCurrentTrainerError]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
}, INITIAL_TRAINER_STATE);
