import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);
    
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;
    
    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
    `element__delete ${isOwn ? 'element_visible' : ''}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `element__like ${isLiked ? 'element__like_active' : ''}`
        );

    function handleClick() {
        onCardClick(card);
      } 

    function handleLikeClick() {
        onCardLike(card);
    }  

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <article className="element">
            <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <img className="element__image" alt={card ? card.name : ''} src={card.link} onClick={handleClick}/>
            <div className="element__caption">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__sign">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} ></button>
                    <p className="element__like-numbers">{card.likes.length}</p>
                </div>
            </div>
        </article>     
    )
}
export default Card