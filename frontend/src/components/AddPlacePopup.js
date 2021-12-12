import React from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup({onAddPlace, isOpen,...rest}) {
  const [name, setName] = React.useState('')
  const [link, setLink] = React.useState('')

  React.useEffect(() => {
    setName('')
    setLink('')
  },[isOpen])

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleLinkChange(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onAddPlace({
      name: name,
      link: link
    })
  }

  return (
    <PopupWithForm 
      name={'add'}
      title={'Новое место'}
      buttonLabel = {'Создать'}
      onSubmit = {handleSubmit}
      {...rest}
      isOpen = {isOpen}
      withSubmit = {true}
      >
        <input className="form__input" type="text" id="input-place-name" aria-label="Название" placeholder="Название" name="place" minLength="2" maxLength="30" required value={name || ''} onChange={handleNameChange}/>
        <span className="input-place-name-error form__input-error"></span>
        <input className="form__input" type="url" id="input-image-link" aria-label="ссылка" placeholder="Ссылка на картинку" name="link" required value={link || ''} onChange={handleLinkChange}/>
        <span className="input-image-link-error form__input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup