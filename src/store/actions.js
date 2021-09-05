import { createAction } from "@reduxjs/toolkit";

import Api from "../classApi/classApi";

import {
  getToken,
  setToken as setTokenToLocalStorage,
  removeToken,
} from "../config/utils/workWithLocalStorage";

export const setToken = createAction("setToken");

export const setUserData = createAction("setUserData");

export const setIsLoading = createAction("setIsLoading");

export const setProducts = createAction("setProducts");

export const setCategories = createAction("setCategories");

export const setDataAfterLogIn = (payload) => (dispatch) => {
  setTokenToLocalStorage(payload.token);
  dispatch(setToken(payload.token));
  dispatch(setUserData(payload.account));
};

export const clearState = () => (dispatch) => {
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
