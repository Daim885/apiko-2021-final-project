import React from "react";

import { handlerHelperText } from "../../config/utils";

import "./InputOrderForm.css";

const InputOrderForm = (props) => {
  const { register, type, name, placeholder, errors, style = {} } = props;
  return (
    <>
      <input
        {...register(name)}
        type={type}
        className="input-order"
        placeholder={placeholder}
        style={style}
      />
      {errors[name] && (
        <span className="cart-form-field-error">
          {handlerHelperText(name, errors)}
        </span>
      )}
    </>
  );
};

export default InputOrderForm;
