import React from 'react'
import PopupWithoutForm from './PopupWithoutForm'

const InfoTooltip = ({message, ...rest}) => {
  return (
    <PopupWithoutForm
      name = {'auth'}
      {...rest}
    >
      <img src={message.image} alt="Статус авторизации" className="popup__tooltip-image" />
      <p className="popup__tooltip-text">{message.text}</p>
    </PopupWithoutForm>    
  )
}

export default InfoTooltip