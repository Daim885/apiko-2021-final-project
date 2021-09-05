export const dateFormatting = (strDate) => {
  const date = new Date(strDate);
  return (
    (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
    "." +
    (date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) +
    "." +
    date.getFullYear()
  );
};
