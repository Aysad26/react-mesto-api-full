import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup ({onUpdateUser, ...rest}) {
  const [name, setName] = React.useState()
  const [description, setDescription] = React.useState()
  const currentUser = React.useContext(CurrentUserContext)

  React.useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, rest.isOpen])

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleDesciptionChange (e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateUser({
      name: name,
      about: description,
    })
  }

  return (
    <PopupWithForm 
      name={'edit'}
      title={'Редактировать профиль'}
      buttonLabel={'Сохранить'}
      onSubmit = {handleSubmit}
      {...rest}
    >
      <input className="form__input" type="text" id="input-name" aria-label="имя" minLength="2" maxLength="40" required value={name || ''} onChange={handleNameChange}/>
      <span className="input-name-error form__input-error"></span>
      <input className="form__input" type="text" id="input-job" aria-label="работа" minLength="2" maxLength="200" required value={description || ''} onChange={handleDesciptionChange}/>
      <span className="input-job-error form__input-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup