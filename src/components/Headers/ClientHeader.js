import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  clearState,
  fetchCategories,
  fetchUserData,
  userDataSelector,
  isLoadingSelector,
  cartSelector,
} from "../../store";

import { initialsUser, createGreeting } from "../../config/utils";

import Preloader from "../Preloader/Preloader";

import { ReactComponent as ApikoLogo } from "../../icons/Logofull.svg";
import { ReactComponent as HeartIcon } from "../../icons/icon_heart.svg";
import { ReactComponent as BasketIcon } from "../../icons/icon_basket.svg";
import { ReactComponent as ArrowIcon } from "../../icons/icon_down_arrow.svg";

import "./Headers.css";

const ClientHeader = () => {
  const userData = useSelector(userDataSelector);
  const isLoadint = useSelector(isLoadingSelector);
  const amountCartItems = useSelector(cartSelector).reduce(
    (acc, e) => acc + e.quantity,
    0
  );
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchCategories());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fullName = userData?.fullName;
  const greeting = createGreeting(fullName);
  const initials = initialsUser(fullName);

  const logOut = () => {
    dispatch(clearState());
    history.push("/");
  };

  if (isLoadint) return <Preloader />;

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
              className="header__icon"
              onClick={() => history.push("/favorites")}
            />
            <div className="cart__icon">
              <BasketIcon
                fill="#ffffff"
                className="header__icon"
                onClick={() => history.push("/cart")}
              />
              {amountCartItems !== 0 && (
                <div
                  className="circle-cart-items"
                  onClick={() => history.push("/cart")}
                >
                  {amountCartItems}
                </div>
              )}
            </div>
          </div>
          <div className="authorization client">
            <span className="greeting">{greeting}</span>
            <div className="circle-auth">
              <span className="circle-auth__text">{initials}</span>
            </div>
            <div className="arrow-open-popup">
              <ArrowIcon fill="#fff" />
            </div>
            <div className="popup-background">
              <div className="popup-menu">
                <div className="popup-menu__user-info">
                  <span className="popup-menu__fullName">{fullName}</span>
                  <span className="popup-menu__email">{userData?.email}</span>
                </div>
                <div className="line" />
                <div className="popup-menu__actions">
                  <Link to="/settings" className="popup-menu__link-settings">
                    Settings
                  </Link>
                  <span className="popup-menu__log-out" onClick={logOut}>
                    Log Out
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ClientHeader;
