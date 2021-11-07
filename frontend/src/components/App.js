import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import api from '../utils/Api';
import '../index.css';
import '../App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteSubmitPopup from './DeleteSubmitPopup';
import Register from './Register';
import Login from './Login';
import * as auth from '../utils/auth';
import ProtectedRoute from './ProtectedRoute';
import IhfoTooltip from './InfoTooltip';


function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  
  function handleEditAvatarClick (){
    setIsEditAvatarPopupOpen(true)
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);

  function handleEditProfileClick (){
     setIsEditProfilePopupOpen (true)
  }

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  function handleAddPlaceClick (){
    setIsAddPlacePopupOpen(true)
  }

  const [deleteSubmitPopup, setDeleteSubmitPopup] = React.useState(false);

  const [deleteCard, setDeleteCard] = React.useState({});

  function handleDeleteSubmitPopup (card){
    setDeleteCard(card)
    setDeleteSubmitPopup(true)
  }

  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false); 

  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  const [loggedIn, setLoggedIn] = useState(false);

  const [email, setEmail] = useState('');

  const [isSuccessful, setIsSuccessful] = useState(false);

  const [message, setMessage] = useState('');

  const history = useHistory();

 
  function handleCardClick(dataCards) { 
    setSelectedCard(dataCards); 
    setImagePopupOpen(true); 
  } 

 function closeAllPopups(){
    setIsEditProfilePopupOpen (false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setSelectedCard({});
    setDeleteSubmitPopup(false);
    setInfoTooltipPopupOpen(false);
  }

  React.useEffect(() => {
    const handleEsc = (event) => {
      const btnEscape = 27;
       if (event.keyCode === btnEscape) {
        closeAllPopups()
      }
    };

    if (isEditProfilePopupOpen|| isEditAvatarPopupOpen || isAddPlacePopupOpen  || isImagePopupOpen|| isInfoTooltipPopupOpen ) {
 
      window.addEventListener('keydown', handleEsc);
    };

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
    
  }, [isEditProfilePopupOpen, isEditAvatarPopupOpen, isAddPlacePopupOpen, isImagePopupOpen, isInfoTooltipPopupOpen]);

  const [currentUser,setCurrentUser] = React.useState({});

  const [userInfoGet, setUserInfoGet] = React.useState(false);

  const [currentCards,setCurrentCards] = React.useState([])

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userInfo, cardList]) => {
        setCurrentUser(userInfo);
        setCurrentCards(cardList);
        setUserInfoGet(true);
      })
      .catch((err) => console.log(err));
  }, []);

  
  function handleUpdateUser (e){
    api.changeUserInfo(e)
    .then((res)=>{
      setCurrentUser(res)
      closeAllPopups()
    })
    .catch(res=>{
      console.log(`Ошибка:${res}`)
    })
  }

  function handleUpdateAvatar(e){
    api.changeUserImage(e)
    .then((res)=>{
      setCurrentUser(res)
      closeAllPopups()
    })
    .catch(res=>{
      console.log(`Ошибка:${res}`)
    })
  }

  
 //Функция лайка карточки
 function handleCardLike(card) {
  //Проверяем, есть ли уже лайк 
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  // Отправляем запрос в API и получаем обновлённые данные 
  api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
    // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
    const newCards = currentCards.map((c) => c._id === card._id ? newCard : c);
    // Обновляем стейт
    setCurrentCards(newCards);
  })
    .catch(err => console.log(err));
}

 
  //Функция удаления карточки
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCurrentCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

   //Функция добавления карточки
   function handleAddPlaceSubmit(e){
    api.addCard(e)
    .then( newCard =>{
      setCurrentCards([newCard, ...currentCards]);
      closeAllPopups();
    })
    .catch(newCard=>{
      console.log(`Error:${newCard}`)
    })
   }

   //Регистрация
   function handleRegisterSubmit(email, password) {
    auth.register(email, password)
      .then((data) => {
        if (data) {
          history.push('/sign-in');
          setInfoTooltipPopupOpen(true);
          setIsSuccessful(true);
          setMessage('Вы успешно зарегистрировались!');
        }
      })
      .catch((res) => {
        setMessage('Что-то пошло не так! Попробуйте ещё раз');
        setInfoTooltipPopupOpen(true);
        setIsSuccessful(false);
        console.log(`Ошибка:${res}`)
      })
  }
  
  //Авторизация
  function handleLoginSubmit(email, password) {
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          setEmail(email)
          setLoggedIn(true);
          localStorage.setItem('token', data.token)
          history.push('/')
        }
      })
      .catch((err) => {
        setMessage('Что-то пошло не так! Попробуйте ещё раз');
        setInfoTooltipPopupOpen(true);
        setIsSuccessful(false);
        if (err === 400) {
          return console.log('не передано одно из полей');
        }
        if (err === 401) {
          return console.log('пользователь с email не найден');
        }
      })
  }
  
  //Проверка токена
  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token)
        .then((data) => {
          setEmail(data.data.email)
          setLoggedIn(true)
          history.push('/')
        })
        .catch((err) => {
          if (err === 401) {
            return console.log('Токен не передан или передан не в том формате');
          }
        })
    }
  }
  
  //Разлогинивание
  function onSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false)
    history.push('/sign-in')
  }

 React.useEffect(() => {
    tokenCheck();
  }, []);

   return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header
            email={email}
            onClick={onSignOut}
            loggedIn={loggedIn}
          />
          <Switch>
            <ProtectedRoute exact path='/' loggedIn={loggedIn}>
              <Main
                loader={userInfoGet}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddCard ={handleAddPlaceClick}
                onCardClick={handleCardClick}
                cards = {currentCards} 
                onCardLike ={handleCardLike}
                onCardDelete ={handleDeleteSubmitPopup}
              />
              <Footer />
            </ProtectedRoute>
            <Route path="/sign-up">
              <Register
                onRegister={handleRegisterSubmit}
              />
            </Route>
            <Route path="/sign-in">
              <Login
                onLogin={handleLoginSubmit}
              />
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
          <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
          <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}/>
          <DeleteSubmitPopup card={deleteCard} isOpen={deleteSubmitPopup} onClose={closeAllPopups} onCardDelete={handleCardDelete}/>
          <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen}/>
          <IhfoTooltip onClose={closeAllPopups} isOpen={isInfoTooltipPopupOpen}  message={message} isSuccess={isSuccessful} />
        </div>
      </CurrentUserContext.Provider>
    </div>
    );
  }
  
  export default App;
