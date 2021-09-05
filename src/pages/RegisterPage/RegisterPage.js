import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { tokenSelector } from "../../store";

import Register from "../../components/Register/Register";

import "./RegisterPage.css";

const RegisterPage = () => {
  const history = useHistory();
  const isToken = !!useSelector(tokenSelector);

  const goToLoginPage = () => {
    history.push("/login");
  };

  if (isToken) history.push("/");

  return (
    <div className="register-page">
      <Register goToLogInWindow={goToLoginPage} />
    </div>
  );
};

export default RegisterPage;
