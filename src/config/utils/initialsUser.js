export const initialsUser = (fullName) => {
  return fullName
    ?.split(" ")
    .map((word) => word[0])
    .join("");
};
