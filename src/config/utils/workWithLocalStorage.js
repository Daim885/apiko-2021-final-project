export const getToken = () => {
  const tokenStorage = window.localStorage.getItem("token");
  if (tokenStorage === null) return null;
  return JSON.parse(tokenStorage);
};

export const setToken = (token) => {
  window.localStorage.setItem("token", JSON.stringify(token));
};

export const removeToken = () => {
  window.localStorage.removeItem("token");
};
