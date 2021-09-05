import * as yup from "yup";
import { regFullName, regPhone, regEmail } from "../constants";

export const changeAccountDataSchema = yup.object().shape({
  fullName: yup.string().required().matches(regFullName, "Incorrect data"),
  email: yup.string().required().email().matches(regEmail, "Incorrect data"),
  phone: yup.string().required().matches(regPhone, "Incorrect data"),
  country: yup.string(),
  city: yup.string(),
  address: yup.string(),
});
