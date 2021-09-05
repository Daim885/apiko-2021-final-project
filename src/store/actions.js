import { createAction } from "@reduxjs/toolkit";

import Api from "../classApi/classApi";

import {
  getToken,
  setToken as setTokenToLocalStorage,
  removeToken,
  refreshSessionStorage,
} from "../config/utils";

export const setToken = createAction("setToken");

export const setUserData = createAction("setUserData");

export const setIsLoading = createAction("setIsLoading");

export const setProducts = createAction("setProducts");

export const setCategories = createAction("setCategories");

export const setDataToCart = createAction("setDataToCart");

export const setDataAfterLogIn = (payload) => (dispatch) => {
  setTokenToLocalStorage(payload.token);
  dispatch(setToken(payload.token));
  dispatch(setUserData(payload.account));
};

export const clearState = () => (dispatch) => {
  Api.logOut();
  removeToken();
  dispatch(setToken(null));
  dispatch(setUserData(null));
};

export const fetchUserData = () => (dispatch) => {
  const token = getToken();
  async function fetchData() {
    dispatch(setIsLoading(true));
    if (!!token) {
      const data = await Api.fetchUserData(token);
      dispatch(setUserData(data));
    }
    dispatch(setIsLoading(false));
  }
  fetchData();
};

export const changeUserData = (payload) => (dispatch) => {
  const changeData = () => {
    dispatch(setIsLoading(true));
    dispatch(setUserData(payload));
    dispatch(setIsLoading(false));
  };
  changeData();
};

export const fetchProductsByUrl = (payload) => (dispatch) => {
  const fetchData = async () => {
    dispatch(setIsLoading(true));
    const products = await Api.fetchProductsByUrl(payload);
    dispatch(setProducts(products));
    dispatch(setIsLoading(false));
  };
  fetchData();
};

export const fetchCategories = () => (dispatch) => {
  const fetchData = async () => {
    dispatch(setIsLoading(true));
    const categories = await Api.fetchCategories();
    dispatch(setCategories(categories));
    dispatch(setIsLoading(false));
  };
  fetchData();
};

export const addItemToCart = (payload, cart) => (dispatch) => {
  const newCart = cart.slice();
  if (!newCart.find((e) => e.id === payload.id)) {
    newCart.unshift(payload);
  } else {
    newCart.forEach((element, i, arr) => {
      if (element.id === payload.id) {
        arr[i] = {
          ...element,
          quantity: element.quantity + payload.quantity,
        };
      }
    });
  }
  refreshSessionStorage(newCart);
  dispatch(setDataToCart(newCart));
};

export const refreshCart = (payload) => (dispatch) => {
  refreshSessionStorage(payload);
  dispatch(setDataToCart(payload));
};
