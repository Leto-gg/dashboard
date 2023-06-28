import { combineReducers } from "redux";

import drawer from "./slices/drawer.slice";

export const rootReducer = combineReducers({
  drawer,
});
