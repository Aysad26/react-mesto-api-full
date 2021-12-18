import React from 'react'
import Card from './Card'
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main>
      <section className="profile page__section">
         <div className="profile__container">
            <img className="profile__avatar" src={currentUser.avatar} alt="Кусто" />
            <button className="profile__avatar-edit" aria-label="редактировать аватар" onClick={onEditAvatar}></button>
            <div className="profile__info">  
              <div className="profile__description">
                <h1 className="profile__name">{currentUser.name}</h1>
                <button className="button profile__edit-button" type="button" id="profile-edit" aria-label="редактировать профиль" onClick={onEditProfile}></button>  
              </div>
              <p className="profile__job">{currentUser.about}</p>
            </div>
          </div>
          <button className="button profile__add-button" type="button" aria-label="добавить фото" onClick={onAddPlace}></button> 
      </section>

      <section className="cards page__section">
        <ul className="cards__list">
        {cards.map((card) => (<
          Card 
            key={card._id} 
            card={card} 
            onCardClick={onCardClick} 
            onCardLike={onCardLike} 
            onCardDelete={onCardDelete}
          />
        ) 
        )}
        </ul>
      </section>
    </main>
  )
}

export default Main