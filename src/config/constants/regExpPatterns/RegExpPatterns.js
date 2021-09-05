export const regFullName = /^[a-zA-Z\s]+$/;
export const regEmail = /\S+@\S+/;
export const regPhone = /^(\+)([0-9]){10,14}$/;
export const regPassword =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,35}/;
export const regOffset = /offset=\d{1,4}/;
export const regSortBy = /&sortBy=\w{6,7}/;
