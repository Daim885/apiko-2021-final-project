import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Api from "../../classApi/classApi";
import { orderSchema } from "../../config/yupSchemes";
import { cartSelector, userDataSelector, refreshCart } from "../../store";

import CustomInput from "../../components/CustomInput/CustomInput";
import CartItem from "../../components/CartItem/CartItem";
import Modal from "../../components/Modal/Modal";
import ChoiceAfterOrder from "../../components/ChoiceAfterOrder/ChoiceAfterOrder";

import "./CartPage.css";

const CartPage = () => {
  const cart = useSelector(cartSelector);
  const userData = useSelector(userDataSelector);
  const [countries, setCounties] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(orderSchema),
  });

  const inputStyle = { marginBottom: 25 };

  const onSubmit = (shipment) => {
    const items = cart.map((item) => {
      return { productId: item.id, quantity: item.quantity };
    });
    const orderData = {
      items,
      shipment,
    };
    Api.createOrder(orderData);
    setShowCompleteModal(true);
  };

  const removeItemFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    dispatch(refreshCart(newCart));
  };

  const closeModalWindows = () => {
    setShowCompleteModal(false);
    dispatch(refreshCart([]));
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await Api.getCountries();
      setCounties(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    reset({
      fullName: userData?.fullName,
      phone: userData?.phone,
      country: userData?.country,
      city: userData?.city,
      address: userData?.address,
    });
  }, [userData, reset]);

  return (
    <>
      <span className="cart-title">My cart</span>
      <div className="cart">
        <div className="cart-list">
          {!cart.length ? (
            <span className="cart-message-no-items">
              There are no items in a cart
            </span>
          ) : (
            <div>
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  removeItemFromCart={removeItemFromCart}
                />
              ))}
            </div>
          )}
        </div>
        <form className="cart-form" onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            register={register}
            name="fullName"
            placeholder="Full Name"
            errors={errors}
            style={inputStyle}
          />
          <CustomInput
            register={register}
            name="phone"
            placeholder="Phone"
            errors={errors}
            style={inputStyle}
          />
          <select
            {...register("country")}
            value={userData?.country}
            className="select-field-order"
            style={inputStyle}
          >
            <option hidden value="">
              Choose Country
            </option>
            {countries?.map((countryItem) => (
              <option key={countryItem} value={countryItem}>
                {countryItem}
              </option>
            ))}
          </select>
          <CustomInput
            register={register}
            name="city"
            placeholder="City"
            errors={errors}
            style={inputStyle}
          />
          <CustomInput
            register={register}
            name="address"
            placeholder="Address"
            errors={errors}
            style={inputStyle}
          />
          <div className="cart-totally">
            <div>
              <span className="cart-totally__name">Items </span>
              <span className="cart-totally__name">Total</span>
            </div>
            <div>
              <span className="cart-totally__value">
                {cart.reduce((acc, e) => acc + e.quantity, 0)}
              </span>
              <span className="cart-totally__value">
                $ {cart.reduce((acc, e) => acc + e.quantity * e.price, 0)}
              </span>
            </div>
          </div>
          <button
            type="submit"
            disabled={!isValid || !cart.length}
            className="cart-form-button-submit cart-button-wrapper"
          >
            <span className="button__text-wrapper cart-form-button-submit__text">
              Confirms the purchase
            </span>
          </button>
          <button
            className="cart-form-button-continue cart-button-wrapper"
            onClick={() => history.push("/")}
          >
            <span className="button__text-wrapper cart-form-button-continue__text">
              Continue shopping
            </span>
          </button>
        </form>
        <Modal isOpen={showCompleteModal} closeModalWindow={closeModalWindows}>
          <ChoiceAfterOrder closeModalWindow={closeModalWindows} />
        </Modal>
      </div>
    </>
  );
};

export default CartPage;
