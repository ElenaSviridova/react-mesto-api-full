import React from 'react';
import '../styles/Login.css';
import closeIconPath from '../images/Close-Icon.svg';
import failIconPath from '../images/wrong-icon.svg';
import sucsessIconPath from '../images/sucsess-icon.svg'

function InfoToolip({onClose, isOpen, fail}) {
    return (
        <div className={`popup ${isOpen && 'popup_opened'}`}>
            <div className="popup__container" >
                <button type="button" className="popup__close-button" onClick={onClose}>
                    <img src={closeIconPath} alt="картинка закрытия окна" className="popup__close-icon"/>
                </button>
                <img className="infoToolip__img" src={fail ? failIconPath : sucsessIconPath} alt={fail ? 'иконка ошибки' : 'иконка подтверждения'} />
                <h2 className= "infoToolip__caption">{fail ? 'Что-то пошло не так!Попробуйте ещё раз.' : 'Вы успешно зарегистрировались!'}</h2>
            </div>
        </div>
    )

}

export default InfoToolip