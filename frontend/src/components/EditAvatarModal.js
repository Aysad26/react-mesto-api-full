import React, { useRef } from "react";
import HandlerSubmit from "./HandlerSubmit";
import ModalWithForm from "./ModalWithForm";

function EditAvatarModal(props) {
  const changeAvatar = useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: changeAvatar.current.value,
    });
  }

  return (
    <ModalWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.isClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__input">
        <input
          ref={changeAvatar}
          id="link-input"
          className="modal__text modal__text_link"
          type="url"
          name="url"
          required
          placeholder="Ссылка на картинку"
          autoComplete="off"
        />
        <span id="link-input-error" className="modal__input-error"></span>
      </label>
      <HandlerSubmit
        button="Сохранить"
        onClick={props.isLoading}
      ></HandlerSubmit>
    </ModalWithForm>
  );
}

export default EditAvatarModal;
