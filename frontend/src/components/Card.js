import React from 'react'
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function Card ({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext)
  
  const isOwn = card.owner === currentUser._id
  const cardDeleteButtonClassName = (
    `button ${isOwn ? 'cards__delete-button' : 'cards__delete-button_hidden'}`
  )
  
  const isLiked = card.likes.some(item => item === currentUser._id)
  const cardLikeButtonClassName = (
    `button cards__like-button ${isLiked ? 'cards__like-button-active' : ''}`
  )

  function handleClick() {
    onCardClick(card)
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <li className="cards__item">
      <button className={cardDeleteButtonClassName} type="button" aria-label="удалить карточку" onClick={handleDeleteClick} ></button>
      <img src={card.link} className="cards__image" alt={card.name} onClick={handleClick}/>
      <h2 className="cards__title">{card.name}</h2>
      <div className="cards__like-container">
        <button className={cardLikeButtonClassName} type="button" aria-label="поставить лайк" onClick={handleLikeClick} ></button>
        <span className="cards__like-counter">{card.likes.length}</span>
      </div>
    </li>
  )
}

export default Card