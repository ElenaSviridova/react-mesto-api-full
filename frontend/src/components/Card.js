import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);
    
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner === currentUser.id;

    // console.log('card.owner ', card.owner);
    // console.log('currentUser.id ', currentUser.id);
    // console.log('isOwn ', isOwn);
    // console.log('card ', card);
    // console.log('currentUser ', currentUser);

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
    `element__delete ${isOwn ? 'element_visible' : ''}`
    );


    

    console.log('currentUser.id ', currentUser.id, typeof(currentUser.id));
   
    console.log('card.likes ', card.likes);
    console.log('currentUser ', currentUser);
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i === currentUser.id);
    console.log('isLiked ', isLiked);

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