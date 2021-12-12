import PopupWithForm from './PopupWithForm';
import React from 'react';

function DeleteSubmitPopup(props){
  
  function handleSubmit(e) {
    e.preventDefault();
    props.onCardDelete(props.card)
  }
    
    return(
        <PopupWithForm  
          name="popup_submit-delete"  
          title = "Вы уверены" 
          submitText="да" 
          onSubmit={handleSubmit} 
          isOpen={props.isOpen} 
          onClose={props.onClose}>
        </PopupWithForm>
    )
}
export default DeleteSubmitPopup;


