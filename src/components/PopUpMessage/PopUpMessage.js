import React, { useEffect } from "react";

import { ReactComponent as CloseIcon } from "../../icons/icon_close.svg";

import "./PopUpMessage.css";

const PopUpMessage = (props) => {
  const { itemName = "", closeMessage, message } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      closeMessage();
    }, 3000);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="banner-message">
      <span className="message__message-text">
        {!message && (
          <>
            The <span className="message-item-name">{itemName}</span> is
            successfully added to cart
          </>
        )}
        <span className="message-item-name">{message}</span>
      </span>
      <CloseIcon onClick={closeMessage} className="message-close-icon" />
    </div>
  );
};

export default PopUpMessage;
