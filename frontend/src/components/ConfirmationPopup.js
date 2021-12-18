import React from 'react'
import PopupWithForm from './PopupWithForm'

function ConfirmationPopup ({...rest}) {
  return (
    <PopupWithForm 
      name={'confirm-delete'}
      title={'Вы уверены?'}
      buttonLabel={'Да'}
      withSubmit = {true}
      //onClose = {onClose}
      {...rest}
    />
  )
}

export default ConfirmationPopup