import React, { useRef } from "react";

import { handlerHelperText } from "../../config/utils/handlerHelperText";

import { ReactComponent as OpenEye } from "../../icons/icon_show_eye.svg";
import { ReactComponent as CloseEye } from "../../icons/icon_hidden_eye.svg";

import "./InputField.css";

const InputField = (props) => {
  const { register, type, name, placeholder, errors, helperText } = props;

  const refInput = useRef(null);

  const clickOnEye = () => {
    if (refInput.current?.type === "password") refInput.current.type = "text";
    else refInput.current.type = "password";
  };
  return (
    <div style={errors[name] ? { marginBottom: 5 } : null}>
      <label className="input">
        <input
          {...register(name)}
          type={type}
          name={name}
          ref={refInput}
          className={errors[name] ? "input__field wrongInput" : "input__field"}
          placeholder=" "
        />
        <span className="input__label">{placeholder}</span>

        {name === "password" && (
          <span onClick={clickOnEye} className="button-eye">
            {refInput.current === null ||
            refInput.current?.value.length === 0 ? (
              <OpenEye />
            ) : (
              <CloseEye />
            )}
          </span>
        )}
      </label>
      {(errors[name] || helperText) && (
        <span className={errors[name] ? "helperText wrongText" : "helperText"}>
          {handlerHelperText(name, errors, refInput, helperText)}
        </span>
      )}
    </div>
  );
};

export default InputField;
