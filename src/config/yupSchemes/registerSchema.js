import * as yup from "yup";

import {
  regFullName,
  regEmail,
  regPhone,
  regPassword,
} from "../constants/regExpPatterns/RegExpPatterns";

export const registerSchema = yup.object().shape({
  fullName: yup.string().required().matches(regFullName, "Incorrect data"),
  email: yup.string().required().email().matches(regEmail, "Incorrect data"),
  phone: yup.string().required().matches(regPhone, "Incorrect data"),
  password: yup.string().required().matches(regPassword, "Incorrect data"),
});
