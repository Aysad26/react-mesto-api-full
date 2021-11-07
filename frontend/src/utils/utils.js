const allClasses = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.button_type_submit',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__input-error_active'
};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  headers: {
    authorization: 'a161955b-22e4-44f7-ad97-c36f2565c1c8',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      userId: userData._id,
      avatar: userData.avatar
    })
    const cardSection = cardList(cards)
    cardSection.renderItems(cards);
  })
  .catch((error) => {console.error(error);})


const addNewCard = (data) => {
  const cardElement = new Card(
    data, 
    userId, 
    function handleCardClick() {popupWithImage.open(data)}, 
    function handleRemoveClick() {
      targetCard = cardElement;
      popupWithConfirm.open(data)
    },
    function handleLikeAdd(data) {
      api.setLike(data)
        .then((data) => {
          cardElement.setLikeCounter(data);
        })
        .catch((error) => {console.error(error);});
    },
    function handleLikeRemove(data) {
      api.deleteLike(data)
        .then((data) => {
          cardElement.setLikeCounter(data);
        })
        .catch((error) => {console.error(error);});
    },
    '.element__item-template'
  );
  const cardData = data;
  cardId = cardData._id; 
  return cardElement; 
}

const cardList = (data) => {
  const section = new Section({
    items: data, 
    renderer: (data) => {
      const cardElement = addNewCard(data); 
      const newCard = cardElement.generateCard(); 
      cardElement.setLikeCounter(data);
      return newCard;
      }
    }, 
  '.elements__grid');
  return section;
}

const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__image')

const popupWithImage = new PopupWithImage('.popup_type_image');

popupWithImage.setEventListeners();

const popupWithConfirm = new PopupWithConfirm('.popup_type_remove', function submitHandler() {
    popupWithConfirm.getLoadingMessage(true, 'Сохранение...');
    api.deleteCard(cardId)
      .then(() => {
        targetCard.deleteCard();
        targetCard = null;
        popupWithConfirm.close();
      })
      .catch((error) => {console.error(error);})
      .finally(() => popupWithConfirm.getLoadingMessage(false))
});

popupWithConfirm.setEventListeners()

const popupEditForm = new PopupWithForm('.popup_type_edit', 
  function submitHandler(data) {
    popupEditForm.getLoadingMessage(true, 'Сохранение...');
    api.changeUserInfo(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupEditForm.close();
    })
    .catch((error) => {console.error(error);})
    .finally(() => popupEditForm.getLoadingMessage(false))
  });

popupEditForm.setEventListeners();


const popupAddForm = new PopupWithForm('.popup_type_add', 
function submitHandler(data) {
    popupAddForm.getLoadingMessage(true, 'Сохранение...');
    api.addCard(data)
    .then((data) => {
      const cardSection = cardList(data) 
      cardSection.addItem(data);
      popupAddForm.close();
      formElementAdd.reset();
    })
    .catch((error) => {console.error(error);})
    .finally(() => popupAddForm.getLoadingMessage(false)) 
});

popupAddForm.setEventListeners()

const popupEditAvatarForm = new PopupWithForm('.popup_type_edit-profile', 
  function submitHandler(data) {
    popupEditAvatarForm.getLoadingMessage(true, 'Сохранение...');
    api.changeUserImage(data)
      .then((res) => {
        userInfo.setUserAvatar(res);
        popupEditAvatarForm.close();
      })
      .catch((error) => {console.error(error);})
      .finally(() => popupEditAvatarForm.getLoadingMessage(false))
    formElementImageProfile.reset();
  }
);

popupEditAvatarForm.setEventListeners()

function handlePopupEditProfile() {
  const userData = userInfo.getUserInfo()
  nameInput.value = userData.name
  jobInput.value = userData.job
  popupEditForm.open()
}

const profileFormValidator = new FormValidator(allClasses, formElementProfile);
profileFormValidator.enableValidation();

const profileImageFormValidator = new FormValidator(allClasses, formElementImageProfile);
profileImageFormValidator.enableValidation();

const addFormValidator = new FormValidator(allClasses, formElementAdd);
addFormValidator.enableValidation();

buttonTypeEdit.addEventListener('click', handlePopupEditProfile); 

buttonTypeAdd.addEventListener('click', () => {
  popupAddForm.open();
  addFormValidator.toggleButtonState();
});

buttonTypeEditProfile.addEventListener('click', () => {
  popupEditAvatarForm.open();
  profileImageFormValidator.toggleButtonState();
});