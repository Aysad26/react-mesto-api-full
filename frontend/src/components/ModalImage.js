import React from "react";

function ModalImage({ isOpen, card, onClose }) {
  return (
    <div className={`modal modal_image ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <img className="modal__image" src={card && card.link} alt={card && card.name}/>
        <p className="modal__caption">{card && card.name}</p>
        <button
          className="modal__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ModalImage;
