import closeIconPath from '../images/Close-Icon.svg';
function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup_image ${card && 'popup_opened'}`}>
                <div className="popup__big-picture">
                    <img src={card?.link} alt={card?.name} className="popup__picture" />
                    <h2 className="popup__caption">{card ? card.name : ''}</h2>
                    <button className="popup__close-button" onClick={onClose}>
                        <img src={closeIconPath} alt="картинка закрытия окна" className="popup__close-icon"/>
                    </button>
                </div>
        </div>
    )
};

export default ImagePopup;