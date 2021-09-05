import * as yup from "yup";

import {
  regEmail,
  regPassword,
} from "../constants/regExpPatterns/RegExpPatterns";

export const logInSchema = yup.object().shape({
  email: yup.string().required().email().matches(regEmail, "Incorrect data"),
  password: yup.string().required().matches(regPassword, "Incorrect data"),
});
