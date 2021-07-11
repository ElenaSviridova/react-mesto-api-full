import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup({isOpen, onClose}) {
    
    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <PopupWithForm title='Вы уверены?' name="delete-card" isOpen={isOpen} onClose={onClose} buttonText='Да' onSubmit={handleSubmit} >
        </PopupWithForm>
    )
}

export default ConfirmDeletePopup;