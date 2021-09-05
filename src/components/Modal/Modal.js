import React from "react";
import { createPortal } from "react-dom";

import "./Modal.css";

const Modal = (props) => {
  const { isOpen, closeModalWindow, children } = props;
  return (
    isOpen &&
    createPortal(
      <div className="modal-background" onClick={closeModalWindow}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>,
      document.getElementById("modal")
    )
  );
};

export default Modal;
