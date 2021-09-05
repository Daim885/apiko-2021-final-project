import React from "react";

import { ReactComponent as CloseIcon } from "../../icons/icon_close.svg";

import "./SelectAuthorization.css";

const SelectAuthorization = (props) => {
  const { goToLogInWindow, goToRegisterWindow, closeModalWindow } = props;
  return (
    <div className="select-auth-wrapper">
      <CloseIcon
        onClick={closeModalWindow}
        className="select-auth-close-window"
      />
      <div className="select-auth__title">
        To continue please register or log in
      </div>
      <div className="buttons-container">
        <button className="button-continue-auth" onClick={goToLogInWindow}>
          <span>Continue to sign in</span>
        </button>
        <button className="button-continue-auth" onClick={goToRegisterWindow}>
          <span>Continue to register</span>
        </button>
        <button className="button-continue-guest" onClick={closeModalWindow}>
          <span>Continue as guest</span>
        </button>
      </div>
    </div>
  );
};

export default SelectAuthorization;
