import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = React.useContext(CurrentUserContext);
    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        if(currentUser.about && currentUser.name) {
            setName(currentUser.name);
            setDescription(currentUser.about);
          }
    }, [currentUser, isOpen]); 

    function handleNameChange(e) {
        setName(e.target.value);
      }
    
    function handleDescriptionChange(e) {
        setDescription(e.target.value);
      }

    function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm title="Редактировать профиль" name="edit" isOpen={isOpen}  onClose={onClose} buttonText='Сохранить' onSubmit={handleSubmit} >
                <input name='Author' value={name} type="text" id= "author-input" className="popup__input popup__input_text_name" placeholder='Автор' onChange={handleNameChange}/>
                <span className="popup__error author-input-error"></span>
                <input name='Profile' value={description} type="text" id= "profile-input" className="popup__input popup__input_text_about-yourself" placeholder='О себе' onChange={handleDescriptionChange}/>
                <span className="popup__error profile-input-error"></span> 
          </PopupWithForm>
    )
}

export default EditProfilePopup;