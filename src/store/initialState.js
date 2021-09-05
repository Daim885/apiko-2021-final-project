import { getToken } from "../config/utils/workWithLocalStorage";

export const initialState = {
  token: getToken(),
  userData: null,
  isLoading: true,
  products: [],
  categories: null,
};
