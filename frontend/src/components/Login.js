import React from 'react';

function Login({ onLogin }) {

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
    e.preventDefault()
    const { email, password } = inputValue;
    if (!email || !password) {
      return;
    }
    onLogin(email, password);
  }

  return (
    <div className="main">
      <div className="form-section">
        <h2 className="form-section__heading">Вход</h2>
        <form className="form" name="profile-form" onSubmit={handleSubmit}>
          <fieldset className="form__input-container">
            <input 
              type="email" 
              className="form__item form__item_dark form__item_type_email" 
              onChange={handleInputChange} 
              name="email" 
              value={inputValue.email}
              placeholder="Email" 
              autoComplete="off" 
              required 
            />
            <input 
              type="password" 
              className="form__item form__item_dark form__item_type_password"
              onChange={handleInputChange}  
              name="password" 
              value={inputValue.password}
              placeholder="Пароль" 
              autoComplete="off" 
              required 
            />
          </fieldset>
          <button className="button button_type_submit button_theme_dark" type="submit">Войти</button>
        </form>
      </div>  
    </div>
  );
}

export default Login;