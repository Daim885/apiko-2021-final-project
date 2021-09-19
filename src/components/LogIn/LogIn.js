import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import { logInSchema } from "../../config/yupSchemes";
import Api from "../../classApi/classApi";
import { setDataAfterLogIn } from "../../store";
import { passwordHelperText } from "../../config/constants";

import InputOrderForm from "../InputOrderForm/InputOrderForm";

import { ReactComponent as CloseIcon } from "../../icons/icon_close.svg";

import "./LogIn.css";

const LogIn = (props) => {
  const { closeModalWindow, goToRegisterWindow } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(logInSchema),
    shouldFocusError: true,
  });

  const onSubmit = async (data) => {
    try {
      const logInResponse = await Api.logIn(data);
      if (!logInResponse.ok) {
        if (logInResponse.status === 401) {
          setError("email", {
            type: "incorectData",
            message: "Email or password incorrect",
          });
          setError("password", {
            type: "incorectData",
            message: "Email or password incorrect",
          });
          throw new Error("Email or password incorrect");
        }
      } else {
        if (logInResponse.status === 200) {
          const logInData = await logInResponse.json();
          dispatch(setDataAfterLogIn(logInData));
          history.push("/");
        }
      }
    } catch (e) {
      console.log(`Error in logIn. ${e}`);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-block">
        {closeModalWindow && (
          <CloseIcon
            onClick={closeModalWindow}
            className="login-close-window"
          />
        )}
        <div className="login-title">Login</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="login-fields">
            <InputOrderForm
              register={register}
              type="email"
              name="email"
              placeholder="Email"
              errors={errors}
              clearErrors={clearErrors}
              style={{ width: 362 }}
            />
            <InputOrderForm
              register={register}
              type="password"
              name="password"
              placeholder="Password"
              errors={errors}
              clearErrors={clearErrors}
              helperText={passwordHelperText}
              style={{ width: 362, marginTop: 25 }}
            />
          </div>
          <button
            type="submit"
            className={
              Object.keys(errors).length === 0
                ? "login-button"
                : "login-button disabled-button-form"
            }
            disabled={!(Object.keys(errors).length === 0)}
          >
            Login
          </button>
        </form>
      </div>
      <div className="go-to-register-block">
        <div className="go-to-register-block__content">
          <span className="go-to-register-block__text">
            I have no account,{" "}
          </span>
          <button
            onClick={goToRegisterWindow}
            className="button-go-to-register"
          >
            Register now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
