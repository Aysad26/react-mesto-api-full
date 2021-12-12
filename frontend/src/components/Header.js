import React from 'react'
import logo from '../images/logo-vect.svg'
import {Link, useLocation} from 'react-router-dom'

function Header(props) {
  const location = useLocation()

  return (
    <header className="header page__section">
      <img className="header__logo" src={logo} alt="Место Россия" />
      <div className="header__link-container">
        {props.loggedIn && 
          (
            <>
              <p className="header__user-email">{props.email}</p>
              <button className="header__logout" onClick={props.handleLogout}>Выйти</button>
            </>
          )
        }
        {!props.loggedIn && 
          ( 
            <>
              {location.pathname === '/signin' && 
                (
                  <Link to='/signup' className="header__link">Регистрация</Link>
                )
              }
              {location.pathname === '/signup' && 
                (
                  <Link to='/signin' className="header__link">Войти</Link>
                )
              }
            </>
          )
        }
      </div> 
    </header>
  )
}

export default Header