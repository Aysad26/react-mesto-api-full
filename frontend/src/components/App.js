import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ModalImage from "./ModalImage";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfileModal from "./EditProfileModal";
import EditAvatarModal from "./EditAvatarModal";
import AddPlaceModal from "./AddPlaceModal";
import ModalWithDelete from "./ModalWithDelete";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";
import ProtectedRoute from "./ProtectedRoute";
import authSuccess from "../images/success.png";
import authFail from "../images/fail.png";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditProfileModalOpen, setEditProfile] = useState(false);
  const [isEditAvatarModalOpen, setEditAvatar] = useState(false);
  const [isAddPlaceModalOpen, setAddCard] = useState(false);
  const [deletedCard, setDeletedCard] = useState(null);
  const [isModalWithDeleteOpen, setModalWithDelete] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalImageOpen, setModalImage] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [tooltipImage, setTooltipImage] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    tokenCheck();
  });

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res.email) {
            setEmail(res.email);
            setLoggedIn(true);
            history.push("/");
          }
        })
        .catch((err) => {
          if (err === 400)
            return console.log("Токен не передан или передан не в том формате");
          if (err === 401) return console.log("Переданный токен некорректен");
        });
    }
  }

  function onRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        if (res.email) {
          setIsInfoTooltipOpen(true);
          setTooltipImage(authSuccess);
          setLoggedIn(true);
          setMessage("Вы успешно зарегистрировались!");
          history.push("/sign-in");
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setTooltipImage(authFail);
        setMessage("Что-то пошло не так! Попробуйте еще раз");
        if (err === "Ошибка: 400")
          console.log(" некорректно заполнено одно из полей ");
      });
  }

  function onLogin(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setLoggedIn(true);
          setEmail(email);
          history.push("/");
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setTooltipImage(authFail);
        setMessage("Что-то пошло не так! Попробуйте ещё раз.");
        if (err === "Ошибка: 400") {
          console.log("не передано одно из полей");
        } else if (err === "Ошибка: 401") {
          console.log("Пользователь с данным email не найден");
        }
      });
  }

  function onSignOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setEmail("");
    history.push("/sign-in");
  }

  function handleEditProfileClick() {
    setEditProfile(true);
  }

  function handleEditAvatarClick() {
    setEditAvatar(true);
  }

  function handleAddPlaceClick() {
    setAddCard(true);
  }

  function handleDeleteClick(card) {
    setModalWithDelete(true);
    setDeletedCard(card);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setModalImage(true);
  }

  function closeAllModals() {
    setEditProfile(false);
    setEditAvatar(false);
    setAddCard(false);
    setModalImage(false);
    setModalWithDelete(false);
    setDeletedCard(null);
    setIsInfoTooltipOpen(false);
  }

  useEffect(() => {
  
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cards, userData]) => {
        setCurrentUser(userData);
        setCards(cards);
        // console.log(userData);
        // console.log(cards);
        
      })
      .catch((err) => console.log(err));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    if (!isLiked) {
      api
        .likeCard(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      api
        .dislikeCard(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function handleCardDelete() {
    setIsLoading(true);
    api
      .deleteCard(deletedCard._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== deletedCard._id);
        setCards(newCards);
        closeAllModals();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser(items) {
    setIsLoading(true);
    api
      .setUserInfo(items)
      .then((res) => {
        setCurrentUser(res);
        closeAllModals();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(item) {
    setIsLoading(true);
    api
      .setUserAvatar(item)
      .then((res) => {
        setCurrentUser(res);
        closeAllModals();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    setIsLoading(true);
    api
      .postNewCard(newCard)
      .then((newCard) => setCards([newCard, ...cards]))
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
        closeAllModals();
      });
  }

  function handlerEscClose(evt) {
    if (evt.key === "Escape") {
      closeAllModals();
    }
  }

  function closeByOverlay(evt) {
    if (evt.target.classList.contains("modal")) {
      closeAllModals();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handlerEscClose);
    document.addEventListener("click", closeByOverlay);
    return () => {
      document.removeEventListener("keydown", handlerEscClose);
      document.removeEventListener("click", closeByOverlay);
    };
  });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} userEmail={email} onSignOut={onSignOut} />
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <Main
              cards={cards}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteClick}
            />
          </ProtectedRoute>
          <Route path="/sign-in">
            <Login onLogin={onLogin} />
          </Route>
          <Route path="/sign-up">
            <Register onRegister={onRegister} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        {loggedIn && <Footer />}
        <section className="modals">
          <EditProfileModal
            isOpen={isEditProfileModalOpen}
            isClose={closeAllModals}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          ></EditProfileModal>
          <AddPlaceModal
            isOpen={isAddPlaceModalOpen}
            isClose={closeAllModals}
            postNewCard={handleAddPlaceSubmit}
            isLoading={isLoading}
          ></AddPlaceModal>
          <EditAvatarModal
            isOpen={isEditAvatarModalOpen}
            isClose={closeAllModals}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          ></EditAvatarModal>
          <ModalWithDelete
            isOpen={isModalWithDeleteOpen}
            isClose={closeAllModals}
            onDelete={handleCardDelete}
            card={deletedCard}
            isLoading={isLoading}
          />
          <ModalImage
            isOpen={isModalImageOpen}
            onClose={closeAllModals}
            card={selectedCard}
          />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllModals}
            image={tooltipImage}
            message={message}
            loggedIn={loggedIn}
          />
        </section>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
