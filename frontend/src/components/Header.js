import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import '../index.css';
import logo from '../images/logo.svg';

function Header({ email }) {

  return (
    <>
     <header className="header">
       <img
        className="logo"
        src={logo}
        alt="логотип проекта"
      />
        <div className="menu">
          <Switch>
            <Route path="/sign-in">
              <Link to="/sign-up" className="menu__item">Регистрация</Link>
            </Route>
            <Route path="/sign-up">
              <Link to="/sign-in" className="menu__item">Войти</Link>
            </Route>
            <Route path="/">
              <nav className="menu">
                <p className="menu__item">{email}</p>
                <Link to="/sign-up" className="menu__item">Выйти</Link>
              </nav>
            </Route>
          </Switch>
        </div>
      </header>
    </>
  );
}

export default Header;
