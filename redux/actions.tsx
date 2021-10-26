import { ActionTypes } from "./actionTypes";
import { TGeneralStoreState } from "./reducers/general";

//General Action
export const actSetGeneral = (data: TGeneralStoreState) => ({
  type: ActionTypes.ActionGeneral,
  payload: data
});
