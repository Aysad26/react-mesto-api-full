import React from 'react'

function PopupWithForm(props) {
  return (
    <div className= {`popup popup-${props.name} ${props.isOpen ? 'popup_is-opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        
        <form className="form" name={`${props.name}-form`} onSubmit = {props.onSubmit} >
          <fieldset className="form__fieldset">
            {props.children}
            <button className="button form__save" type="submit" aria-label="сохранить">{props.buttonLabel}</button>
          </fieldset>
        </form>
        <button className="button popup__close" type="button" aria-label="закрыть" onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default PopupWithForm