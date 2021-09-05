import { createReducer } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import {
  setToken,
  setUserData,
  setIsLoading,
  setProducts,
  setCategories,
  setDataToCart,
} from "./actions";

export const changeStoreReducer = createReducer(initialState, {
  [setToken]: (state, actions) => {
    state.token = actions.payload;
  },
  [setUserData]: (state, actions) => {
    state.userData = actions.payload;
  },
  [setIsLoading]: (state, actions) => {
    state.isLoading = actions.payload;
  },
  [setProducts]: (state, actions) => {
    state.products = actions.payload;
  },
  [setCategories]: (state, actions) => {
    state.categories = actions.payload;
  },
  [setDataToCart]: (state, actions) => {
    state.cart = actions.payload;
  },
});
