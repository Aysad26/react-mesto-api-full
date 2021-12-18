import React from 'react'
import SignForm from './SignForm'

const Register = ({handleRegister}) => {
  const [data, setData] = React.useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setData({
      ...data,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const {email, password} = data
    handleRegister(email, password)
  }
  
  return (
    <SignForm 
      title = {'Регистрация'}
      buttonLabel = {'Зарегистрироваться'}
      active = {'sign__text_active'}
      onSubmit = {handleSubmit}
      children = {
        <>
          <input className="sign__input" type="email" value={data.email} name="email" onChange={handleChange} placeholder="Email" required minLength="2" maxLength="40"></input>
          <input className="sign__input" type="password" value={data.password} name="password" onChange={handleChange} placeholder="Пароль" required minLength="2" maxLength="40"></input>
        </>
      }
    />
  )
}

export default Register