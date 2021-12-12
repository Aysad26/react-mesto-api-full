import React from "react";

function InfoTooltip({ onClose, isOpen, image, message }) {
  return (
    <section className={`modal modal_tooltip ${isOpen && "modal_opened"}`}>
      <div className="modal__container">
        <img className="modal__tooltip" src={image} alt="Статус" />
        <h2 className="modal__tooltip-message">{message}</h2>
        <button
          className="modal__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}

export default InfoTooltip;
