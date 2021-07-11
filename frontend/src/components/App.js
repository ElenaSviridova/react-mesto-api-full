import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Switch, useHistory} from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute'
import * as auth from '../utils/auth.js';
import InfoToolip from './InfoToolip';



function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(null);
    const [fail, setFail] = useState(false);
    const [isModalPopupOpen, setisModalPopupOpen] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        Promise.all([api.getInitialCards(), api.getProfileInfo()])
        .then(([data, userData]) => {
            setCards(data);
            setCurrentUser(userData);
        })
        .catch(handleError)
    }, []);

    useEffect(() => {
        checkToken()
    }, [])

    useEffect(() => {
        if(loggedIn) {
            history.push('/')
        }
    }, [loggedIn])


  const history = useHistory();

  const handleError = (error) => console.error(error); 

  function handleCardDelete(card) {
        api.removeCards(card._id)
        // удаляем карточку 
        .then(() => {setCards((state) => state.filter((c) => c._id !== card._id))})
        .catch(handleError)
  }

  function handleCardLike(card) {

    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(handleError)
  }
    
    
    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null)
        
    }

    function closeModalPopup() {
        setisModalPopupOpen(false)
        if(!fail) {
            history.push('/sign-in')
        }
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }
    
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }
    
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    function handleUpdateUser({name,about}) {
        api.changeProfileInfo(name, about)
        .then(data => {
            setCurrentUser(data);
            closeAllPopups()
          })
          .catch(handleError)
    }

    function handleUpdateAvatar(link) {
        api.updateAvatar(link)
        .then(data => {
            setCurrentUser(data);
            closeAllPopups()
          })
          .catch(handleError)
    }

    function handleAddPlaceSubmit(card) {
        api.addCard(card)
        .then(newCard => {
            setCards([newCard, ...cards]);
            closeAllPopups()
          })
          .catch(handleError)
    }

    function handleLogin({email, password}) {
        auth.authorize(email, password)
        .then(data => {
            const {token} = data; 
            localStorage.setItem('token', token)
            setLoggedIn(true)
            setEmail(email)
        })
        .catch(handleError)
    }

    function handleLogout() {
        setEmail('')
        setLoggedIn(false)
        localStorage.removeItem('token')
    }

    function checkToken() {
        const token = localStorage.getItem('token')
        if (token) {
            auth.getContent(token)
            .then(res => {
                setEmail(res.data.email)
                setLoggedIn(true)
            })
            .catch(handleError)
        }
    }


    function handleRegister({email, password}) {
        auth.register(email, password)
        .then(() => {
            setisModalPopupOpen(true)
        })
        .catch((err) => {
            console.error(err)
            setisModalPopupOpen(true)
            setFail(true)
        });
    }

    const navigateToEnter = () => history.push('/sign-in');
    const navigateToRegister = () => history.push('/sign-up');
    
  return (
      <CurrentUserContext.Provider value= {currentUser}>   
       <div className="page">
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <InfoToolip onClose={closeModalPopup} isOpen={isModalPopupOpen} fail={fail}/>
          <Switch>        
          <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} cards={cards} handleLogout={handleLogout} email={email}/>
          <Route path="/sign-up">
                <Header email={""} handleHeaderClick={navigateToEnter} caption='Войти'/>
                <Register handleRegister={handleRegister}/>
            </Route>
            <Route path="/sign-in"> 
                <Header email={""} handleHeaderClick={navigateToRegister} caption='Регистрация'/> 
                <Login handleLogin={handleLogin} />
            </Route>
                
            
          </Switch>
          <Footer />  
        </div>
       </CurrentUserContext.Provider>
  );
}

export default App;
