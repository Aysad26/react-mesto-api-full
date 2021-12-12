import React, { useState, useContext, useEffect } from "react";
import ModalWithForm from "./ModalWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import HandlerSubmit from "./HandlerSubmit";

function EditProfileModal(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeDescription(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <ModalWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.isClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__input">
        <input
          value={name || ""}
          onChange={handleChangeName}
          id="name-input"
          className="modal__text modal__text_name"
          type="text"
          name="fullName"
          required
          placeholder="Введите имя"
          minLength="2"
          maxLength="40"
          autoComplete="off"
        />
        <span id="name-input-error" className="modal__input-error"></span>
      </label>
      <label className="modal__input">
        <input
          value={description || ""}
          onChange={handleChangeDescription}
          id="job-input"
          className="modal__text modal__text_job"
          type="text"
          name="about"
          required
          placeholder="Введите описание"
          minLength="2"
          maxLength="200"
          autoComplete="off"
        />
        <span id="job-input-error" className="modal__input-error"></span>
      </label>

      <HandlerSubmit
        button="Сохранить"
        onClick={props.isLoading}
      ></HandlerSubmit>
    </ModalWithForm>
  );
}

export default EditProfileModal;
