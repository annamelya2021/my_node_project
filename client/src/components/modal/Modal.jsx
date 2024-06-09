import React from "react";
import "./Modal.css";

const Modal = ({ children, onClose }) => {
  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-body" onClick={handleStopPropagation}>
        <div className="modal-header">
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
