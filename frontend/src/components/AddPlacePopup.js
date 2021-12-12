import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup (props){

  const [inputValue, setInputValue] = React.useState({ name: '', link: '', });
  
  React.useEffect(() => {
    setInputValue({ name: '', link: '' });
  }, [props.isOpen])

  function handleInputChange(event) {
    const { name, value } = event.target;
    setInputValue({
        ...inputValue,
        [name]: value,
    });
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    props.onAddPlace({
        name: inputValue.name,
        link: inputValue.link,
    });
}

    return(
        <PopupWithForm name ="popup_add-cards "  title ="Новое место" submitText={'Загрузить фото'} onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose}>
            <fieldset className="form__input-container">
            <div className="form__item-container">
              <input
                type="text"
                className="form__item form__item_type_title"
                id="title-input"
                name="name"
                onChange={handleInputChange}
                value={inputValue.name}
                placeholder="Название"
                minLength={2}
                maxLength={30}
                required
              />
              <span className="form__input-error title-input-error" />
            </div>
            <div className="form__item-container">
              <input
                type="url"
                className="form__item form__item_type_link"
                id="link-input"
                name="link"
                onChange={handleInputChange}
                value={inputValue.link}
                placeholder="Ссылка на картинку"
                required
              />
              <span className="form__input-error link-input-error" />
            </div>
          </fieldset>
        </PopupWithForm> 
    )
}
export default AddPlacePopup ;