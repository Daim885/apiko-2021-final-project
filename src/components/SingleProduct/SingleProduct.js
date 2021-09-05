import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { tokenSelector } from "../../store";

import { ReactComponent as CloseIcon } from "../../icons/icon_close.svg";
import { ReactComponent as DoneIcon } from "../../icons/icon_done.svg";

import "./SingleProduct.css";

const SingleProduct = (props) => {
  const {
    closeModalWindow,
    openSelectAuthWindow,
    item,
    isFavorite,
    toggleFavorite,
    addItemToCart,
  } = props;
  const [countProduct, setCountProduct] = useState(1);
  const isToken = !!useSelector(tokenSelector);
  const history = useHistory();

  const substractProduct = () => {
    setCountProduct(countProduct - 1);
  };

  const plusProduct = () => {
    setCountProduct(countProduct + 1);
  };

  const addItemToCartInState = () => {
    addItemToCart({ ...item, quantity: countProduct });
  };
  const buyNowItem = () => {
    addItemToCartInState();
    history.push("/cart");
  };

  return (
    <div className="item-wrapper">
      {closeModalWindow && (
        <CloseIcon onClick={closeModalWindow} className="item-close-window" />
      )}
      <div className="item-container">
        <div className="item-img-wrapper">
          <img src={item.picture} alt={item.title} className="item-img" />
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
            onClick={isToken ? addItemToCartInState : openSelectAuthWindow}
            className=" button-wrapper button-add"
          >
            <span className="button-add__text">ADD TO CART</span>
          </button>
          <button
            onClick={
              isToken ? () => toggleFavorite(item.id) : openSelectAuthWindow
            }
            className={
              "button-wrapper" +
              (isFavorite ? " button-buy-now" : " button-add")
            }
          >
            {isFavorite ? (
              <span
                className={
                  isFavorite ? "button-buy-now__text" : "button-add__text"
                }
              >
                ADDED TO FAVORITES
                <DoneIcon style={{ marginLeft: 14 }} />
              </span>
            ) : (
              <span className="button-add__text">ADD TO FAVORITES</span>
            )}
          </button>
        </div>
        <button
          onClick={isToken ? buyNowItem : openSelectAuthWindow}
          className="button-wrapper button-buy-now"
        >
          <span className="button-buy-now__text">Buy now</span>
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
