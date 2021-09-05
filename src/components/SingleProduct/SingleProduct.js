import React, { useState } from "react";
import { useSelector } from "react-redux";

import { tokenSelector } from "../../store";

import Modal from "../Modal/Modal";
import Register from "../Register/Register";
import LogIn from "../LogIn/LogIn";
import SelectAuthorization from "../SelectAuthorization/SelectAuthorization";

import { ReactComponent as CloseIcon } from "../../icons/icon_close.svg";

import "./SingleProduct.css";

const SingleProduct = (props) => {
  const { closeModalWindow, item } = props;
  const [countProduct, setCountProduct] = useState(1);
  const [openModal, setOpenModal] = useState("");
  const isToken = !!useSelector(tokenSelector);

  const substractProduct = () => {
    setCountProduct(countProduct - 1);
  };

  const plusProduct = () => {
    setCountProduct(countProduct + 1);
  };

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

  return (
    <div className="item-wrapper">
      {closeModalWindow && (
        <CloseIcon onClick={closeModalWindow} className="item-close-window" />
      )}
      <div className="item-container">
        <div className="item-img-wrapper">
          <img src={item.picture} className="item-img" />
        </div>
        <div className="item-description">
          <span className="item-description__title">{item.title}</span>
          <span className="item-description__description">
            {item.description}
          </span>
          <div className="item-description-price">
            <span className="item-description-price__text">Price</span>
            <span className="item-description-price__price">${item.price}</span>
          </div>
          <div className="item-description-amount-block">
            <button
              className="item-description-count-button"
              disabled={countProduct === 1}
              onClick={substractProduct}
            >
              -
            </button>
            <span className="item-description-amount">{countProduct}</span>
            <button
              className="item-description-count-button"
              onClick={plusProduct}
            >
              +
            </button>
          </div>
          <div className="item-description__totaly">
            <div>
              <span className="totaly__text">Items:</span>
              <span className="totaly__amount">{countProduct}</span>
            </div>
            <div>
              <span className="totaly__text">Total:</span>
              <span className="totaly__amount">
                $ {countProduct * item.price}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="button-container">
        <div className="button-container__left">
          <button
            onClick={isToken ? null : openSelectAuthWindow}
            className=" button-wrapper button-add"
          >
            <span className="button-add__text">ADD TO CART</span>
          </button>
          <button
            onClick={isToken ? null : openSelectAuthWindow}
            className="button-wrapper button-add"
          >
            <span className="button-add__text">ADD TO FAVORITES</span>
          </button>
        </div>
        <button className="button-wrapper button-buy-now">
          <span className="button-buy-now__text">Buy now</span>
        </button>
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
    </div>
  );
};

export default SingleProduct;
