import React from 'react'

function PopupWithoutForm(props) {
  return (
    <div className= {`popup popup-${props.name} ${props.isOpen ? 'popup_is-opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
         {props.children}
        <button className="button popup__close" type="button" aria-label="закрыть" onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default PopupWithoutForm