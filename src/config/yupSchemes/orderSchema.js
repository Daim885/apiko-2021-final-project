import * as yup from "yup";
import { regFullName, regPhone } from "../constants";

export const orderSchema = yup.object().shape({
  fullName: yup.string().required().matches(regFullName, "Incorrect data"),
  phone: yup.string().required().matches(regPhone, "Incorrect data"),
  country: yup.string().required(),
  city: yup.string().required(),
  address: yup.string().required(),
});
