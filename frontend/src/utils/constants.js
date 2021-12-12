export const popupImage = document.querySelector('.popup_type_image');
export const popupImagePic = popupImage.querySelector('.popup__image');
export const popupCaption = popupImage.querySelector('.popup__caption');
export const list = document.querySelector('.elements__grid');
export const buttonTypeEdit = document.querySelector('.button_type_edit');
export const buttonTypeEditProfile = document.querySelector('.profile__overlay');
export const buttonTypeAdd = document.querySelector('.button_type_add');
export const formElementProfile = document.querySelector('.form_type_profile'); 
export const formElementAdd = document.querySelector('.form_type_add');
export const formElementImageProfile = document.querySelector('.form_type_edit-avatar');
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupAdd = document.querySelector('.popup_type_add');
const popupOverlayEdit = document.querySelector('.popup__overlay_edit');
const popupOverlayAdd = document.querySelector('.popup__overlay_add');
const popupOverlayImage = document.querySelector('.popup__overlay_image');
const buttonTypeCloseEdit = popupEdit.querySelector('.button_type_close');
const buttonTypeCloseAdd = popupAdd.querySelector('.button_type_close');
const buttonTypeCloseImage = popupImage.querySelector('.button_type_close');
export const name = document.querySelector('.profile__title');
export const job = document.querySelector('.profile__subtitle');
export const userImage = document.querySelector('.profile__image');
const formElement = document.querySelector('.form');
export const nameInput = document.querySelector('.form__item_type_name');
export const jobInput = document.querySelector('.form__item_type_job');
export const titleInput = document.querySelector('.form__item_type_title');
export const linkInput = document.querySelector('.form__item_type_link');
export const linkAvatarInput = document.querySelector('.form__item_type_link-avatar');

const allClasses = {
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.button_type_submit',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__input-error_active'
};

let userId = null;
let cardId = null;
let targetCard = null;