import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Api from "../../classApi/classApi";
import { userDataSelector, changeUserData } from "../../store";
import { changeAccountDataSchema } from "../../config/yupSchemes";
import { messageChangeAccountData } from "../../config/constants";

import MessageAddItemToCart from "../MessageAddItemToCart/MessageAddItemToCart";
import CustomInput from "../CustomInput/CustomInput";

import "./ChangeAccountData.css";

const ChangeAccountDataForm = () => {
  const [showMessage, setShowMessage] = useState(false);
  const userData = useSelector(userDataSelector);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changeAccountDataSchema),
  });

  const inputStyle = { marginTop: 20, width: 380 };

  const defaultFormData = {
    fullName: userData?.fullName,
    email: userData?.email,
    phone: userData?.phone,
    country: userData?.country || "",
    city: userData?.city || "",
    address: userData?.address || "",
  };

  const onSubmit = async (data) => {
    try {
      const response = await Api.changeAccountData(data);
      if (response.ok) {
        const data = await response.json();
        if (response.status === 200) {
          dispatch(changeUserData(data));
        }
        setShowMessage(true);
      } else if (response.status === 409) {
        reset(defaultFormData);
        setError("country", {
          type: "INVALID_COUNTRY",
          message: "INVALID_COUNTRY",
        });
      }
    } catch (e) {
      console.log(`Error in onSubmit: ${e}`);
    }
  };

  useEffect(() => {
    reset(defaultFormData);
  }, [userData, reset]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <span className="account-change__text">Main information</span>
      {showMessage && (
        <MessageAddItemToCart
          closeMessage={() => setShowMessage(false)}
          message={messageChangeAccountData}
        />
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="account-change-information-form"
      >
        <CustomInput
          register={register}
          type="text"
          name="fullName"
          placeholder="Full Name"
          errors={errors}
          style={inputStyle}
        />
        <CustomInput
          register={register}
          type="email"
          name="email"
          placeholder="Email"
          errors={errors}
          style={inputStyle}
        />
        <CustomInput
          register={register}
          type="tel"
          name="phone"
          placeholder="Phone"
          errors={errors}
          style={inputStyle}
        />
        <CustomInput
          register={register}
          type="text"
          name="country"
          placeholder="Country"
          errors={errors}
          style={inputStyle}
        />
        <CustomInput
          register={register}
          type="text"
          name="city"
          placeholder="City"
          errors={errors}
          style={inputStyle}
        />
        <CustomInput
          register={register}
          type="text"
          name="address"
          placeholder="Address"
          errors={errors}
          style={inputStyle}
        />
        <button
          type="submit"
          className="account-change-information-form__button"
        >
          Save
        </button>
      </form>
    </>
  );
};

export default ChangeAccountDataForm;
