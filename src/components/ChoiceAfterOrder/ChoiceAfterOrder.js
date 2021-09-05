import React from "react";
import { useHistory } from "react-router-dom";

import { ReactComponent as CloseIcon } from "../../icons/icon_close.svg";

import "./ChoiceAfterOrder.css";

const ChoiceAfterOrder = (props) => {
  const { closeModalWindow } = props;
  const history = useHistory();

  const goToHome = () => {
    closeModalWindow();
    history.push("/");
  };

  const viewOrderHistory = () => {
    closeModalWindow();
    history.push("/orders");
  };

  return (
    <div className="choice-wrapper">
      <CloseIcon onClick={closeModalWindow} className="choice-close-window" />
      <div className="choice-content">
        <div className="choice-title">Thank you for your purchase</div>
        <span className="choise-subtitle">
          We will send you a notification when your order arrives to you
        </span>
        <button
          className="choise-continue-button choice-button-wrapper"
          onClick={goToHome}
        >
          Continue shopping
        </button>
        <button
          className="choise-view-button choice-button-wrapper"
          onClick={viewOrderHistory}
        >
          View order history
        </button>
      </div>
    </div>
  );
};

export default ChoiceAfterOrder;
