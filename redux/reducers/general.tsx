import Action, { ActionTypes } from "../actionTypes";

export type TGeneralStoreState = {
    countMap?: Map<string,number>;
}
const initialState: TGeneralStoreState = {
  countMap: new Map()
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
