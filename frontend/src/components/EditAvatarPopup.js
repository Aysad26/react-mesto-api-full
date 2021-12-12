import PopupWithForm from './PopupWithForm';
import React from 'react';

function EditAvatarPopup(props){
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(
      avatarRef.current.value
    );
  }
    
    return(
        <PopupWithForm  name="popup_avatar"  title = "Сменить аватар" submitText="Сохранить" onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose}>
          <fieldset className="form__input-container">
            <div className="form__item-container">
              <input
                type="url"
                className="form__item form__item_type_link-avatar"
                id="link-input-avatar"
                name="avatar"
                ref={avatarRef} 
                placeholder="Ссылка на картинку"
                required
              />
              <span className="form__input-error link-input-avatar-error" />
            </div>
          </fieldset>
        </PopupWithForm>
    )
}
export default EditAvatarPopup;


