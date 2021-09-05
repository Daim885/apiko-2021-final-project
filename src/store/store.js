import { configureStore } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { changeStoreReducer } from "./reducer";

export const store = configureStore({
  reducer: changeStoreReducer,
  preloadedState: initialState,
});
