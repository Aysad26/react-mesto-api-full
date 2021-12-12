import React from "react";

function ModalWithForm(props) {
  return (
    <div className={`modal modal_${props.name} ${props.isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container">
        <button
          className="modal__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <h3 className="modal__title">{props.title}</h3>
        <form
          onSubmit={props.onSubmit}
          className="modal__form"
          action="#"
          name={`${props.name}`}
          noValidate
        >
          {props.children}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
