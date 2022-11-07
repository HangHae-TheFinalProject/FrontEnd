import React from "react";
import ModalPortal from "./ModalPortal";
import "./style.scss"

const Modal = ({ onClose, content }) => {

  return (
    <ModalPortal>
      <div className="background" onClick={onClose}>
        <div classname="content">
          {content}
        </ div>
      </div>
    </ModalPortal>
  );
};

export default Modal;