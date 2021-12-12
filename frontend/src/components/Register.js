import React from 'react';
import { Link } from 'react-router-dom'; 

function Register({ onRegister }) {

  const [inputValue, setInputValue] = React.useState({
    email: '',
    password: ''
  });
  
  function handleInputChange(e) {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  }


  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = inputValue;
    onRegister(email, password);
  }

  return (
    <div className="main">
      <div className="form-section">
        <h2 className="form-section__heading">Регистрация</h2>
        <form className="form" name="profile-form" onSubmit={handleSubmit}>
          <fieldset className="form__input-container">
            <input 
              type="email" 
              className="form__item form__item_dark form__item_type_email" 
              onChange={handleInputChange} 
              name="email" 
              placeholder="Email" 
              value={inputValue.email}
              autoComplete="off" 
              required 
            />
            <input 
              type="password" 
              className="form__item form__item_dark form__item_type_password"
              onChange={handleInputChange}  
              name="password" 
              placeholder="Пароль" 
              autoComplete="off" 
              value={inputValue.password}
              required 
            />
          </fieldset>
          <button className="button button_type_submit button_theme_dark" type="submit">Зарегистрироваться</button>
          <p className="form-section__paragraph">Уже зарегистрированы? <Link to="/sign-in" className="form-section__link">Войти</Link></p>
        </form>
      </div>  
    </div>
  );
}

export default Register;