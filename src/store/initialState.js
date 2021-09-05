import { getToken, getCartItems } from "../config/utils";

export const initialState = {
  token: getToken(),
  userData: null,
  isLoading: true,
  products: [],
  categories: null,
  cart: getCartItems(),
};
