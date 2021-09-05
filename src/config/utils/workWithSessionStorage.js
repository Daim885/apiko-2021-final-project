export const getCartItems = () => {
  const cartStorage = window.sessionStorage.getItem("CartItems");
  if (cartStorage === null) return [];
  return JSON.parse(cartStorage);
};

export const setCartToSessionStorage = (cart) => {
  window.sessionStorage.setItem("CartItems", JSON.stringify(cart));
};

export const removeSessionStorage = () => {
  window.localStorage.removeItem("CartItems");
};

export const refreshSessionStorage = (cart) => {
  removeSessionStorage();
  setCartToSessionStorage(cart);
};
