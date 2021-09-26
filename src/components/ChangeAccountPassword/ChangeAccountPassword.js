import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Api from "../../classApi/classApi";
import { changeAccountPasswordSchema } from "../../config/yupSchemes";
import { messageChangePassword } from "../../config/constants";

import PopUpMessage from "../PopUpMessage/PopUpMessage";
import CustomInput from "../CustomInput/CustomInput";

import "./ChangeAccountPassword.css";

const ChangeAccountPassword = () => {
  const [showMessage, setShowMessage] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(changeAccountPasswordSchema),
  });

  const onSubmit = async (data) => {
    const changePasswordData = {
      oldPassword: data.oldPassword,
      password: data.newPassword,
    };
    try {
      const response = await Api.changeAccountPassword(changePasswordData);
      if (response.ok) {
        setShowMessage(true);
        reset();
      } else if (response.status === 401) {
        setError("oldPassword", {
          type: "WRONG_PASSWORD",
          message: "WRONG_PASSWORD",
        });
      }
    } catch (e) {
      console.log(`Error in onSubmit: ${e}`);
    }
  };

  const inputStyle = { marginTop: 20, width: 380 };

  return (
    <>
      <span className="account-change__text">Change password</span>
      {showMessage && (
        <PopUpMessage
          closeMessage={() => setShowMessage(false)}
          message={messageChangePassword}
        />
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="account-change-password-form"
      >
        <CustomInput
          register={register}
          name="oldPassword"
          type="password"
          placeholder="Current password"
          errors={errors}
          style={inputStyle}
        />
        <CustomInput
          register={register}
          name="newPassword"
          type="password"
          placeholder="New password"
          errors={errors}
          style={inputStyle}
        />
        <CustomInput
          register={register}
          name="newPasswordConfirm"
          type="password"
          placeholder="Confirm password"
          errors={errors}
          style={inputStyle}
        />
        <button
          type="submit"
          className="account-change-password-form__button"
          disabled={!isValid}
        >
          Change password
        </button>
      </form>
    </>
  );
};

export default ChangeAccountPassword;
