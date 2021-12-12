import React from "react";
import ModalWithForm from "./ModalWithForm";

function ModalWithDelete(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onDelete();
  }

  return (
    <ModalWithForm
      name="delete"
      title="Вы уверены?"
      isOpen={props.isOpen}
      onClose={props.isClose}
      onSubmit={handleSubmit}
    >
      <button
        className="modal__submit-button modal__submit-button_delete"
        type="submit"
      >
        {props.isLoading ? "Удаление..." : "Да"}
      </button>
    </ModalWithForm>
  );
}

export default ModalWithDelete;
