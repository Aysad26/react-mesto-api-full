import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let { email, password } = data;
    onLogin(email, password);
  };

  return (
    <section className="auth">
      <div className="auth__container">
        <h3 className="auth__title">Вход</h3>
        <form className="auth__form" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            className="auth__input"
            id="email"
            name="email"
            placeholder="Email"
            autoComplete="off"
            value={data.email}
          ></input>
          <input
            onChange={handleChange}
            className="auth__input"
            id="password"
            name="password"
            placeholder="Пароль"
            type="password"
            value={data.password}
          ></input>
          <button className="auth__button-submit" type="submit">
            Войти
          </button>
          <div className="auth__container-register">
            <p className="auth__register">
              Ещё не зарегистрированы?
              <Link to="sign-up" className="auth__link">
                Зарегистрироваться
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
