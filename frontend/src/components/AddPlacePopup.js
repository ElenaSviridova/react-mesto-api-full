import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleNameChange(e) {
        setName(e.target.value);
      }
    
    function handleLinkChange(e) {
        setLink(e.target.value);
      }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
              name: name,
              link: link
        });
        if (name && link) {
            setName('');
            setLink('');
        }
        
    }

    return (
        <PopupWithForm title="Новое место" name="add" isOpen={isOpen} onClose={onClose} buttonText='Создать' onSubmit={handleSubmit} >
                <input name="Name" value={name} type="text" id= "author-add-input" className="popup__input popup__input_text_name" placeholder="Название" onChange={handleNameChange} />
                <span className="popup__error author-add-input-error"></span>
                <input name="Link" value={link} type="url" id= "profile-add-input" className="popup__input popup__input_text_about-yourself" placeholder="Ссылка на картинку" onChange={handleLinkChange}/>
                <span className="popup__error profile-add-input-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;