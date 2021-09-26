import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import Api from "../../classApi/classApi";
import {
  tokenSelector,
  fetchProductsByUrl,
  addItemToCart as addItemToState,
  cartSelector,
} from "../../store";
import { fetchFavouriteProductUrl } from "../../config/constants";

import Modal from "../Modal/Modal";
import SingleProduct from "../SingleProduct/SingleProduct";
import SelectAuthorization from "../SelectAuthorization/SelectAuthorization";
import Register from "../Register/Register";
import LogIn from "../LogIn/LogIn";
import PopUpMessage from "../PopUpMessage/PopUpMessage";

import { ReactComponent as EmptyHeartIcon } from "../../icons/icon_empty_heart.svg";

import "./ListItem.css";

const ListItem = ({ item }) => {
  const [openModal, setOpenModal] = useState("");
  const [isFavorite, setIsFavorite] = useState(item.favorite);
  const [showMessage, setShowMessage] = useState(false);
  const isToken = !!useSelector(tokenSelector);
  const cart = useSelector(cartSelector);
  const location = useLocation();
  const dispatch = useDispatch();

  const openSingleProductWindow = () => {
    setOpenModal("singleProductModal");
  };

  const openRegisterWindow = () => {
    setOpenModal("registerModal");
  };

  const openLogInWindow = () => {
    setOpenModal("logInModal");
  };

  const closeModalWindows = () => {
    setOpenModal("");
  };

  const openSelectAuthWindow = () => {
    setOpenModal("SelectAuthModal");
  };

  const toggleFavorite = (id) => {
    if (isToken) {
      if (isFavorite) {
        setIsFavorite(false);
        Api.removeProductFromFavorite(id);
        if (location.pathname === "/favorites") {
          if (location.search)
            dispatch(
              fetchProductsByUrl(`${location.pathname}${location.search}`)
            );
          else dispatch(fetchProductsByUrl(fetchFavouriteProductUrl));
        }
      } else {
        setIsFavorite(true);
        Api.addProductToFavorite(id);
      }
    } else {
      openSelectAuthWindow();
    }
  };

  const addItemToCart = (item) => {
    setShowMessage(true);
    dispatch(addItemToState(item, cart));
    closeModalWindows();
  };

  useEffect(() => {
    setIsFavorite(item.favorite);
  }, [item]);

  return (
    <>
      {showMessage && (
        <PopUpMessage
          itemName={item.title}
          closeMessage={() => setShowMessage(false)}
        />
      )}
      <div className="list-item__container">
        <div className="list-item__like">
          <EmptyHeartIcon
            className={
              isFavorite
                ? "list-item__like-ikon isFavorite__icon"
                : "list-item__like-ikon"
            }
            onClick={() => toggleFavorite(item.id)}
          />
        </div>
        <img
          src={item.picture}
          alt={item.title}
          className="list-item__img"
          onClick={openSingleProductWindow}
        />
        <div className="list-item-descritiop">
          <span className="list-item__title" onClick={openSingleProductWindow}>
            {item.title}
          </span>
          <span className="list-item__price">${item.price}</span>
        </div>
        <Modal
          isOpen={openModal === "singleProductModal"}
          closeModalWindow={closeModalWindows}
        >
          <SingleProduct
            item={item}
            closeModalWindow={closeModalWindows}
            openSelectAuthWindow={openSelectAuthWindow}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
            addItemToCart={addItemToCart}
          />
        </Modal>
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
    </>
  );
};

export default ListItem;
