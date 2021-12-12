import React from "react";
import logo from "../images/logo.png";
import { Link, Route } from "react-router-dom";

function Header({ loggedIn, userEmail, onSignOut }) {
  return (
    <header className="header page__header section">
      <img src={logo} alt="Логотип" className="header__logo" />
      <div className="header__section">
        {loggedIn && (
          <Route exact path="/">
            <p className="header__email">{userEmail}</p>
            <Link
              to="/sign-in"
              className="header__button-logout"
              onClick={onSignOut}
            >
              Выйти
            </Link>
          </Route>
        )}
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">
            Вход
          </Link>
        </Route>
      </div>
    </header>
  );
}

export default Header;
