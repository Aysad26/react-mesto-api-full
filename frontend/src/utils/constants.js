/* import elbrus2 from '../images/elbrus2.jpg'
import uralMnts from '../images/ural-mnts.jpg'
import elbrus3 from '../images/elbrus3.jpg'
import ufa from '../images/ufa.jpg'

export const initialCards = [
  {name: 'Гора Эльбрус', link: elbrus2},
  {name: 'Уральские горы', link: uralMnts},
  {name: 'Уфа', link: ufa},
  {name: 'Карачаево-Черкессия', link: elbrus3},
  {name: 'Памятник Салавату Юлаеву', link: ufa},
  {name: 'Уральские горы', link: uralMnts}
]; */

export const defaultFormConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save',
  inactiveButtonClass: 'form__save_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

export const editProfileButton = document.querySelector('#profile-edit');
export const editAvatarButton = document.querySelector('.profile__avatar-edit');
export const addButton = document.querySelector('.profile__add-button');
export const popupEdit = document.querySelector('.popup-edit');
export const popupAdd = document.querySelector('.popup-add');
export const popupAvatarUpdate = document.querySelector('.popup-avatar-update');
export const inputName = document.querySelector('#input-name');
export const inputJob = document.querySelector('#input-job');
export const inputPlaceName = document.querySelector('#input-place-name');
export const inputImageLink = document.querySelector('#input-image-link');
export const formEditElement = document.querySelector('.edit-form');
export const formAddElement = document.querySelector('.add-form');
export const templateCard = document.querySelector('.template-card');
export const cardsContainer = document.querySelector('.cards__list');