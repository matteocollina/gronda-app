import Action, { ActionTypes } from "../actionTypes";

export type TGeneralStoreState = {
    loginTryCount?: number;
}
const initialState: TGeneralStoreState = {
    loginTryCount: 0
};


export default function(state = initialState, action:Action) {
  switch (action.type) {
    case ActionTypes.ActionGeneral: {
      return {
        ...state,
        ...action.payload
      };
    }
    default:
      return state;
  }
}
