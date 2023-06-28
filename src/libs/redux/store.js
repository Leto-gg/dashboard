// third-party
import { configureStore } from "@reduxjs/toolkit";

// project import
import { rootReducer } from "./reducers";

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

export const store = configureStore({
  reducer: rootReducer,
});

export const { dispatch } = store;
