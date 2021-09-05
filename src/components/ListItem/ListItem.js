import React, { useState } from "react";

import Modal from "../Modal/Modal";
import SingleProduct from "../SingleProduct/SingleProduct";

import { ReactComponent as EmptyHeartIcon } from "../../icons/icon_empty_heart.svg";

import "./ListItem.css";

const ListItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="list-item__container">
      <div className="list-item__like">
        <EmptyHeartIcon className="list-item__like-ikon" />
      </div>
      <img src={item.picture} className="list-item__img" onClick={openModal} />
      <div className="list-item-descritiop">
        <span className="list-item__title" onClick={openModal}>
          {item.title}
        </span>
        <span className="list-item__price">${item.price}</span>
      </div>

      <Modal isOpen={isOpen} closeModalWindow={closeModal}>
        <SingleProduct item={item} closeModalWindow={closeModal} />
      </Modal>
    </div>
  );
};

export default ListItem;
