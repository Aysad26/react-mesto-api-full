import React from 'react';
import error from '../images/error.svg';
import success from '../images/success.svg';

function InfoTooltip({ isOpen, onClose, isSuccess, message }) {
  return (
    <div className={`popup  ${isOpen ? "popup_opened":""}`}  isOpen={isOpen} onClose={onClose}>
      <div className="popup__window popup__window_message">
        <button 
          type="button" 
          className="button button_type_close"  
          onClick={onClose} 
        />
        <img className="popup__icon" src={isSuccess ? success : error} alt="информационная иконка" />
        <p className="popup__heading popup__heading_message">{message}</p>
      </div>
      <div className="popup__overlay popup__overlay_edit" onClick={onClose} />
    </div>
  );
}

export default InfoTooltip;