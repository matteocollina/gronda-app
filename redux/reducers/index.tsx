import { combineReducers } from "redux";
import general, { TGeneralStoreState } from "./general";

export type TGeneralStore = {
    getState: () => TGeneral;
}
export type TGeneral = {
    general: TGeneralStoreState;
}

const appReducer = combineReducers({general})

  
const rootReducer = (state:any, action:any) => {
    return appReducer(state, action)
}

  
export default rootReducer;
