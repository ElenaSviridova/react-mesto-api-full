import React from 'react';
import logo from '../images/logo.svg';
import '../styles/Login.css';

function Header({email, caption, handleHeaderClick}) {

    return (
        <header className="header">
              <img src={logo} alt="Картинка логотипа" className="header__logo"/>
              <div className="header__user">
                <span className="header__email">{email}</span>
                <button type="button" className='header__button'  onClick={handleHeaderClick} >{caption}</button>
              </div>
              
        </header>
    )
};

export default Header;