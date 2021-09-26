import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { registerSchema } from "../../config/yupSchemes";
import Api from "../../classApi/classApi";
import { passwordHelperText } from "../../config/constants/constants";
import { setDataAfterLogIn } from "../../store";

import InputOrderForm from "../InputOrderForm/InputOrderForm";

import { ReactComponent as CloseIcon } from "../../icons/icon_close.svg";

import "./Register.css";

const Register = (props) => {
  const { closeModalWindow, goToLogInWindow } = props;

  const dispatch = useDispatch();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(registerSchema),
  });

  const inputStyle = { width: 362 };

  const onSubmit = async (data) => {
    try {
      const registerResponse = await Api.register(data);
      if (!registerResponse.ok) {
        if (registerResponse.status === 409) {
          setError("email", {
            type: "emailUsed",
            message: "Such email is already used",
          });
          throw new Error("Such email is already used");
        }
      } else {
        if (registerResponse.status === 200) {
          const registerData = await registerResponse.json();
          dispatch(setDataAfterLogIn(registerData));
          history.push("/");
        }
      }
    } catch (e) {
      console.log(`Error in register: ${e}`);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-block">
        {closeModalWindow && (
          <CloseIcon
            onClick={closeModalWindow}
            className="register-close-window"
          />
        )}
        <div className="register-title">Register</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="register-fields">
            <InputOrderForm
              register={register}
              type="text"
              name="fullName"
              placeholder="Full Name"
              errors={errors}
              style={inputStyle}
            />
            <InputOrderForm
              register={register}
              type="email"
              name="email"
              placeholder="Email"
              errors={errors}
              style={inputStyle}
            />
            <InputOrderForm
              register={register}
              type="tel"
              name="phone"
              placeholder="Phone number"
              errors={errors}
              style={inputStyle}
            />
            <InputOrderForm
              register={register}
              type="password"
              name="password"
              placeholder="Password"
              errors={errors}
              helperText={passwordHelperText}
              style={inputStyle}
            />
          </div>
          <button
            type="submit"
            className={
              isValid
                ? "register-button"
                : "register-button disabled-button-form"
            }
            disabled={!isDirty || !isValid}
          >
            Register
          </button>
        </form>
      </div>
      <div className="go-to-login-block">
        <div className="go-to-login-block__content">
          <span className="go-to-login-block__text">
            I already have an account,{" "}
          </span>
          <button onClick={goToLogInWindow} className="button-go-to-login">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
