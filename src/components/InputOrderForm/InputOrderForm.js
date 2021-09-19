import React, { useState } from "react";

import { handlerHelperText } from "../../config/utils";

import { ReactComponent as OpenEye } from "../../icons/icon_show_eye.svg";
import { ReactComponent as CloseEye } from "../../icons/icon_hidden_eye.svg";

import "./InputOrderForm.css";

const InputOrderForm = (props) => {
  const {
    register,
    type,
    name,
    placeholder,
    errors,
    clearErrors,
    helperText,
    style = {},
  } = props;

  const [newType, setNewType] = useState(type);
  const [lengthInputValue, setLengthInputValue] = useState(0);

  const customRegister = register(name);

  const onChangeInput = (e) => {
    if (errors[name]?.type === "incorectData")
      clearErrors(["email", "password"]);
    if (name === "password") setLengthInputValue(e.target.value.length);
  };

  const changeType = () => {
    if (newType === "password") setNewType("text");
    else setNewType("password");
  };

  return (
    <>
      <label className="input-label">
        <input
          {...customRegister}
          type={newType}
          className={errors[name] ? "input-order wrongInput" : "input-order"}
          placeholder={placeholder}
          style={style}
          onChange={(e) => {
            customRegister.onChange(e);
            onChangeInput(e);
          }}
        />
        {name === "password" && (
          <span onClick={changeType} className="button-eye">
            {lengthInputValue === 0 || newType === "text" ? (
              <OpenEye />
            ) : (
              <CloseEye />
            )}
          </span>
        )}
      </label>

      {(errors[name] || helperText) && (
        <span className={errors[name] ? "helperText wrongText" : "helperText"}>
          {handlerHelperText(name, errors, helperText)}
        </span>
      )}
    </>
  );
};

export default InputOrderForm;
