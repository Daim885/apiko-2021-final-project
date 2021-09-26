import { passwordHelperText } from "../constants";

export const handlerHelperText = (name, errors, helperText) => {
  const typeError = errors[name]?.type;
  switch (typeError) {
    case "required":
      return "Required info is missing";
    case "matches": {
      if (name === "password") return passwordHelperText;
      else return "Incorrect data";
    }
    case "email":
      return "Incorrect data";
    case "emailUsed":
      return "Such email is already used";
    case "incorectData":
      return "Email or password incorrect";
    case "INVALID_COUNTRY":
      return "Invalid country";
    case "WRONG_PASSWORD":
      return "Wrong password";
    case "oneOf":
      return "Passwords don’t match";
    default: {
      return helperText;
    }
  }
};
