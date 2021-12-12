import '../index.css';
import React from 'react';
import editIcon from '../images/edit-icon.svg';
import addIcon from '../images/add-icon.svg';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';


function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
  <main className="main">
    <section className="profile">
      <div className="profile__info">
        <div className="profile__avatar">
          <button type="button" className="profile__overlay" onClick={props.onEditAvatar}>
            <img
              className="profile__icon"
              src={editIcon}
              alt="иконка редактирования профиля"
            />
          </button>
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt="Фото профиля"
          />
        </div>
        <div>
          <div className="profile__container">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="button button_type_edit" onClick={props.onEditProfile} type="button" />
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
      </div>
      <button type="button" className="button button_type_add" onClick={props.onAddCard} >
        <img
          className="button__add-icon"
          src={addIcon}
          alt="Иконка добавить"
        />
      </button>
    </section>
    <section className="elements">
      <ul className="elements__grid">
        {Array.from(props.cards).map((item) => (
            <Card 
              key={item._id} 
              dataCards = {item} 
              onCardClick={props.onCardClick}
              onCardLike ={props.onCardLike}
              onCardDelete ={props.onCardDelete}
            />
          ))}
      </ul>
    </section>
  </main>
  );
}

export default Main;