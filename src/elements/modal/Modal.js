import React from "react";
import ModalPortal from "./ModalPortal";
import "./style.scss"

const Modal = ({ onClose, content }) => {

  return (
    <ModalPortal>
      <div className="background" onClick={onClose}>
        <div classname="content" onClick={(event)=>{event.stopPropagation()}}>
          {content}
        </ div>
      </div>
    </ModalPortal>
  );
};

export default Modal;