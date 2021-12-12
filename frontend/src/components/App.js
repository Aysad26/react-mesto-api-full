import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import React from 'react'
import api from '../utils/api'
import * as auth from '../utils/auth'
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ConfirmationPopup from './ConfirmationPopup'
import Login from './Login'
import Register from './Register'
import ProtectedRoute from './ProtectedRoute'
import InfoTooltip from './InfoTooltip'
import { Route, Switch, useHistory } from 'react-router-dom'
import accept from '../images/accepted.png'
import decline from '../images/declined.png'

const App = () => {
  const [currentUser, setCurrentUser] = React.useState({})
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = React.useState(false)
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})
  const [cardToDelete, setCardToDelete] = React.useState({})
  const [cards, setCards] = React.useState([])
  const [email, setEmail] = React.useState('')
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [message, setMessage] = React.useState({
    text: '',
    image: ''
  })
  const history = useHistory()

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt')
    if (!jwt) { return }

    if (jwt) {
      auth.checkToken(jwt)
        .then(res => {
          if(res) {
            setLoggedIn(true)
            setEmail(res.email)
            history.push('/')
          }
        })
        .catch(err => {
          console.log(`Ошибка - ${err}`)
        })
    }
    return;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn])

  React.useEffect(() => {
    if (loggedIn)  {
      Promise.all([api.getCards(), api.getUserInfo()])
      .then(([cardsObj, userData]) => {
        setCards(cardsObj)
        setCurrentUser(userData)
      })
      .catch((err) => console.log(err))
    }
  }, [loggedIn])

  function handleCardLike(card) {
    const isLiked = card.likes.some(id => id === currentUser._id)
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards(state => state.map(c => c._id === card._id ? newCard : c))
    })
    .catch((err) => console.log(err))
  }

  function handleCardDeleteSubmit(e) {
    e.preventDefault()
    api.deleteCard(cardToDelete._id)
    .then(() => {
      setCards(state => state.filter(c => c._id !== cardToDelete._id))
      closeAllPopups()
    })
    .catch((err) => console.log(err))
  }
  
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setConfirmationPopupOpen(false)
    setInfoTooltipOpen(false)
    setSelectedCard({})
  }

  function handleUpdateUser (inputValues) {
    api.setUserInfo(inputValues)
    .then((userData) => {
      setCurrentUser(userData)
      closeAllPopups()
    })
    .catch((err) => console.log(`Ошибка - ${err}`))
  }

  function handleUpdateAvatar (inputValue) {
    api.setUserAvatar(inputValue)
    .then(data => {
      setCurrentUser(data)
      closeAllPopups()
    })
    .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit (place) {
    api.loadCard(place)
    .then(data => {
      setCards([data, ...cards])
      closeAllPopups()
    })
    .catch(err => console.log(err))
  }

  function handleCardDelete (card) {
    setConfirmationPopupOpen(true)
    setCardToDelete(card)
  }

  const handleLogin = (email, password) => {
    auth.login(email, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token)
        setEmail(email)
        setLoggedIn(true)
        history.push('/')
      })
      .catch(err => {
        console.log(`Ошибка - ${err}`)
        setMessage({
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
          image: decline
        })
        setInfoTooltipOpen(true)
      })
  }
  
  const handleRegister = (email, password) => {
    auth.register(email, password)
      .then((data) => {
        if (data) {
          localStorage.setItem('jwt', data.jwt)
          setEmail(data.email)
        }
        history.push('/signin')
        setMessage({
          text: 'Вы успешно зарегистрировались!',
          image: accept
        })
        setInfoTooltipOpen(true)
      })
      .catch(err => {
        console.log(`Ошибка - ${err}`)
        setMessage({
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
          image: decline
        })
        setInfoTooltipOpen(true)
      })
  }

  const handleLogout = () => {
    localStorage.removeItem('jwt')
    setEmail('')
    setLoggedIn(false)
    history.push('/signin')
  }

  return (
    <div className="page">
      <div className="page__container">
        <CurrentUserContext.Provider value = {currentUser}>
          <Header 
            loggedIn = {loggedIn}
            email = {email}
            handleLogout = {handleLogout}
          />
          <Switch>
            <Route path="/signup">
              <Register 
                handleRegister = {handleRegister}
              />
            </Route>
            <Route path="/signin">
              <Login 
                handleLogin = {handleLogin}
              />
            </Route>
                        
            <ProtectedRoute 
              exact path="/"
              loggedIn = {loggedIn} 
              component = {Main} 
              onEditProfile = {handleEditProfileClick}
              onAddPlace = {handleAddPlaceClick}
              onEditAvatar = {handleEditAvatarClick}
              onCardClick = {handleCardClick}
              cards = {cards}
              onCardLike = {handleCardLike}
              onCardDelete = {handleCardDelete}
            /> 

            <Route path="*">
              <Login 
                handleLogin = {handleLogin}
              />
            </Route>
          </Switch>
          <Footer />
          
          <EditProfilePopup 
            isOpen = {isEditProfilePopupOpen} 
            onClose = {closeAllPopups}
            onUpdateUser = {handleUpdateUser} 
          />

          <EditAvatarPopup 
            isOpen = {isEditAvatarPopupOpen} 
            onClose = {closeAllPopups} 
            onUpdateAvatar = {handleUpdateAvatar}
          />

          <AddPlacePopup 
            isOpen = {isAddPlacePopupOpen}
            onClose = {closeAllPopups}
            onAddPlace = {handleAddPlaceSubmit}
          />

          <ConfirmationPopup 
            isOpen = {isConfirmationPopupOpen}
            onClose = {closeAllPopups}
            onSubmit = {handleCardDeleteSubmit}
          />
          
          <ImagePopup 
            card={selectedCard} 
            onClose={closeAllPopups}
          />

          <InfoTooltip 
            isOpen = {isInfoTooltipOpen}
            onClose = {closeAllPopups}
            message = {message}
          />
        </CurrentUserContext.Provider>        
      </div>
    </div>
  );
}

export default App;