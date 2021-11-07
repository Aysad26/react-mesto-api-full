import PopupWithForm from './PopupWithForm';
import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup (props){
    const [name , setName ] = React.useState('')
    const [description , setDescription ] = React.useState('')

    const currentUser = React.useContext(CurrentUserContext);
    React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);


    function handleNameChange(e) {
        setName(e.target.value);
    }
    
    function handleAboutChange(e) {
        setDescription(e.target.value);
    }

      
    function handleSubmit(e) {
      e.preventDefault();
      props.onUpdateUser({
        name,
        about: description,
      });
    }
    
    return(
        <PopupWithForm  name ="popup_profile "  title ="Редактировать профиль" submitText="Сохранить" onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose}>
          <fieldset className="form__input-container">
            <div className="form__item-container">
              <input
                onChange={handleNameChange}
                value={name || ''}
                type="text"
                className="form__item form__item_type_name"
                name="name"
                id="name-input"
                placeholder="Ваше имя"
                minLength={2}
                maxLength={40}
                required
              />
              <span className="form__input-error name-input-error" />
            </div>
            <div className="form__item-container">
              <input
                onChange={handleAboutChange}
                value={description || ''}
                type="text"
                className="form__item form__item_type_job"
                id="job-input"
                name="job"
                placeholder="Вид деятельности"
                minLength={2}
                maxLength={200}
                required
              />
              <span className="form__input-error job-input-error" />
            </div>
          </fieldset>
        </PopupWithForm>
    )
}
export default EditProfilePopup;


