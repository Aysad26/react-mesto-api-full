import React from 'react'
import { Link } from 'react-router-dom'

const SignForm = ({...props}) => {
  return (
    <div className="sign">
      <h2 className="sign__title">{props.title}</h2>
      <form className="sign__form" onSubmit = {props.onSubmit} >
        <fieldset className="form__fieldset">
          {props.children}
          <button className="button sign__button" type="submit">{props.buttonLabel}</button>
        </fieldset>
      </form>
      <p className={`sign__text ${props.active}`}>Уже зарегистрированы? <Link to="/signin" className="sign__link">Войти</Link> </p>
    </div>
  )
}

export default SignForm