import React from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup({onUpdateAvatar,...rest}) {
  const avatarUrl = React.useRef('')

  React.useEffect(() => {
    avatarUrl.current.value = ''
  }, [rest.isOpen])

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateAvatar({
      avatar: avatarUrl.current.value
    })
  }

  return (
    <PopupWithForm 
      name={'avatar-update'}
      title={'Обновить аватар'}
      buttonLabel={'Сохранить'}
      onSubmit = {handleSubmit}
      {...rest}
    >
      <input ref={avatarUrl} className="form__input" type="url" id="input-avatar-link" aria-label="ссылка" placeholder="Ссылка на аватар пользователя" name="link" required />
      <span className="input-avatar-link-error form__input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup