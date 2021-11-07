import React from 'react';
import Trash from '../images/Trash.svg'
import { CurrentUserContext} from '../contexts/CurrentUserContext';

function Card(props) {

  const userId = React.useContext(CurrentUserContext)
  
  const isOwn = props.dataCards.owner._id === userId._id;

  const cardDeleteButtonClassName = (
    `elements__remove ${isOwn ? 'elements__remove' : 'elements__remove_inactive'}`
  );

  const isLiked = props.dataCards.likes.some(i => i._id === userId._id);

  const cardLikeButtonClassName = (
    `elements__like ${isLiked ? 'elements__like_active' : ' '}`
  );

  function handleCardClick() {
    props.onCardClick(props.dataCards);
  }  

  function handleCardLike(){
    props.onCardLike(props.dataCards);
  }

  function handleDeleteClick (){
    props.onCardDelete(props.dataCards);
  }

  
    return(
      <li className="elements__item">
        <button className={`${cardDeleteButtonClassName}`} style={{ backgroundImage: `url(${Trash})` }} type="button" onClick ={handleDeleteClick} />
        <img className="elements__image" src={props.dataCards.link} alt={props.name} onClick={handleCardClick} />
        <div className="elements__info">
          <h2 className="elements__title">{props.dataCards.name}</h2>
          <div className="elements__like-container">
            <button className={`${cardLikeButtonClassName}`} type="button" onClick={handleCardLike}/>
            <p className="elements__like-counter">{props.dataCards.likes.length}</p>
          </div>
        </div>
      </li>
  )
}

export default Card