import React from 'react';
import editButtonPath from '../images/edit-button.svg';
import addButtonPath from '../images/plus.svg';
import Card from '../components/Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';


function Main({onEditProfile, onAddPlace , onEditAvatar, onCardClick, onCardLike, onCardDelete, cards, handleLogout, email}) {

  const currentUser = React.useContext(CurrentUserContext);

    return (
      <>
        <Header email={email} handleHeaderClick={handleLogout} caption='Выйти'/>
        <main className="main">
              <section className="profile">
                      <div className="profile__avatar">
                          <img src={currentUser.avatar} alt="Картинка профиля" className="profile__avatar-image"/>
                          <img onClick={onEditAvatar} src={editButtonPath} alt="Картинка при наведении" className="profile__avatar-hover"/>
                      </div>
                      <div className="profile__info">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button onClick={onEditProfile} type="button" className="profile__edit-button">
                          <img src={editButtonPath} alt="картинка добавить текст" className="profile__edit-button-image"/>
                        </button>
                        <p className="profile__subtitle">{currentUser.about}</p>
                      </div> 
                      <button onClick={onAddPlace} type="button" className="profile__add-button">
                          <img src={addButtonPath} alt="иконка кнопки" className="profile__add-button-image"/>
                      </button>       
              </section>
              <section className="elements">
                  {cards.map((card) => (<Card key={card._id} onCardClick={onCardClick} card={card} onCardLike={onCardLike} onCardDelete={onCardDelete}/>))} 
              </section>
        </main>
      </>  
    )
};

export default Main;