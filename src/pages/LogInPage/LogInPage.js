import React from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

import { tokenSelector } from "../../store";

import LogIn from "../../components/LogIn/LogIn";

import "./LogInPage.css";

const LoginPage = () => {
  const history = useHistory();
  const isToken = !!useSelector(tokenSelector);

  const goToRegisterPage = () => {
    history.push("/register");
  };

  if (isToken) history.push("/");

  return (
    <div className="login-page">
      <LogIn goToRegisterWindow={goToRegisterPage} />
    </div>
  );
};

export default LoginPage;
