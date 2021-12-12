import React, { useState } from "react";
import ModalWithForm from "./ModalWithForm";
import HandlerSubmit from "./HandlerSubmit";

function AddPlaceModal(props) {
  const [name, setNameCard] = useState("");
  const [link, setLinkCard] = useState("");

  function handleSubmitCard(e) {
    e.preventDefault();
    props.postNewCard({ name, link });
  }

  function handleNameCard(evt) {
    setNameCard(evt.target.value);
  }

  function handleLinkCard(evt) {
    setLinkCard(evt.target.value);
  }

  return (
    <ModalWithForm
      name="add"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.isClose}
      onSubmit={handleSubmitCard}
    >
      <label className="modal__input">
        <input
          value={name || ""}
          onChange={handleNameCard}
          id="title-input"
          className="modal__text modal__text_place"
          type="text"
          name="title"
          required
          placeholder="Название"
          minLength="1"
          maxLength="30"
          autoComplete="off"
        />
        <span id="title-input-error" className="modal__input-error"></span>
      </label>
      <label className="modal__input">
        <input
          value={link || ""}
          onChange={handleLinkCard}
          id="link-input"
          className="modal__text modal__text_link"
          type="url"
          name="url"
          required
          placeholder="Cсылка на картинку"
          autoComplete="off"
        />
        <span id="link-input-error" className="modal__input-error"></span>
      </label>
      <HandlerSubmit button="Создать" onClick={props.isLoading}></HandlerSubmit>
    </ModalWithForm>
  );
}

export default AddPlaceModal;
