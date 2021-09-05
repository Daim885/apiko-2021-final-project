import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { cartSelector, refreshCart } from "../../store";

import { ReactComponent as BasketTreshIcon } from "../../icons/icon_basket_tresh.svg";

import "./CartItem.css";

const CartItem = (props) => {
  const { item, removeItemFromCart } = props;
  const [itemQuantity, setItemQuantity] = useState(item?.quantity);
  const cart = useSelector(cartSelector);
  const dispatch = useDispatch();

  const substractItem = () => {
    const newQuantity = itemQuantity - 1;
    setItemQuantity(newQuantity);
    refreshQuantityInStore(newQuantity);
  };

  const plusItem = () => {
    const newQuantity = itemQuantity + 1;
    setItemQuantity(newQuantity);
    refreshQuantityInStore(newQuantity);
  };

  const refreshQuantityInStore = (itemQuantity) => {
    const newCart = cart.slice();
    newCart.map((e) => {
      if (e.id === item.id) {
        return { ...e, quantity: itemQuantity };
      } else return e;
    });
    dispatch(refreshCart(newCart));
  };

  return (
    <>
      <div className="cart-item">
        <div className="cart-item-data">
          <div className="cart-item-img">
            <img
              src={item.picture}
              alt={item.title}
              className="cart-item-img__img"
            />
          </div>
          <div className="cart-item-description">
            <span className="cart-item__name">{item.title}</span>
            <div className="cart-buttons">
              <button
                className="cart-item-button-tresh"
                onClick={() => removeItemFromCart(item.id)}
              >
                <BasketTreshIcon />
              </button>
              <button
                className="cart-item-count-button"
                disabled={itemQuantity === 1}
                onClick={substractItem}
              >
                -
              </button>
              <span className="cart-item-amount">{itemQuantity}</span>
              <button className="cart-item-count-button" onClick={plusItem}>
                +
              </button>
            </div>
          </div>
        </div>
        <div className="cart-item-price">
          <div>
            <span className="cart-item-price__text">Price:</span>
            <span className="cart-item-price__price">${item.price}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
