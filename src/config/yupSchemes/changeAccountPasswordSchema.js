import * as yup from "yup";

import { regPassword } from "../constants";

export const changeAccountPasswordSchema = yup.object().shape({
  password: yup.string().required().matches(regPassword, "Incorrect data"),
  newPassword: yup.string().required().matches(regPassword, "Incorrect data"),
  newPasswordConfirm: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});
