import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchCategories, isLoadingSelector } from "../../store";

import Modal from "../Modal/Modal";
import Register from "../Register/Register";
import LogIn from "../LogIn/LogIn";
import SelectAuthorization from "../SelectAuthorization/SelectAuthorization";
import Preloader from "../Preloader/Preloader";

import { ReactComponent as ApikoLogo } from "../../icons/Logofull.svg";
import { ReactComponent as HeartIcon } from "../../icons/icon_heart.svg";
import { ReactComponent as BasketIcon } from "../../icons/icon_basket.svg";

import "./Headers.css";

const GuestHeader = () => {
  const [openModal, setOpenModal] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector(isLoadingSelector);

  const openRegisterWindow = () => {
    setOpenModal("registerModal");
  };

  const openLogInWindow = () => {
    setOpenModal("logInModal");
  };

  const openSelectAuthWindow = () => {
    setOpenModal("SelectAuthModal");
  };

  const closeModalWindows = () => {
    setOpenModal("");
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) return <Preloader />;

  return (
    <header className="header">
      <div className="header-wrapper">
        <div className="header__logo">
          <Link to="/">
            <ApikoLogo />
          </Link>
        </div>

        <div className="header-content">
          <div className="header__icons">
            <HeartIcon
              fill="#ffffff"
              onClick={openSelectAuthWindow}
              className="header__icon"
            />
            <BasketIcon
              fill="#ffffff"
              onClick={openSelectAuthWindow}
              className="header__icon"
            />
          </div>

          <div className="authorization">
            <button
              className="button-authorization"
              onClick={openRegisterWindow}
            >
              <span className="text-authorization">register</span>
            </button>

            <div className="rectangle"></div>

            <button className="button-authorization" onClick={openLogInWindow}>
              <span className="text-authorization">log in</span>
            </button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={openModal === "SelectAuthModal"}
        closeModalWindow={closeModalWindows}
      >
        <SelectAuthorization
          goToLogInWindow={openLogInWindow}
          goToRegisterWindow={openRegisterWindow}
          closeModalWindow={closeModalWindows}
        />
      </Modal>
      <Modal
        isOpen={openModal === "registerModal"}
        closeModalWindow={closeModalWindows}
      >
        <Register
          closeModalWindow={closeModalWindows}
          goToLogInWindow={openLogInWindow}
        />
      </Modal>

      <Modal
        isOpen={openModal === "logInModal"}
        closeModalWindow={closeModalWindows}
      >
        <LogIn
          closeModalWindow={closeModalWindows}
          goToRegisterWindow={openRegisterWindow}
        />
      </Modal>
    </header>
  );
};
export default GuestHeader;
