import React from 'react'

function ImagePopup(props) {
  return(
    <div className={props.card.name ? "popup popup-image popup_is-opened" : "popup popup-image"} >
          <div className="popup-image__container">
            <figure className="popup-image__figure">
              <img alt={props.card.name} src={props.card.link} className="popup-image__photo" />
              <figcaption className="popup-image__figcaption">{props.card.name}</figcaption>
            </figure>
            <button className="button popup__close" type="button" aria-label="закрыть" onClick={props.onClose}></button>
          </div>
    </div>
  )
}

export default ImagePopup