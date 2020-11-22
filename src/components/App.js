import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import ConfPopup from './ConfPopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false);
  const [isConfPopupOpen, setIsConfPopupOpen] = React.useState(false);
  const [cardDelete, setCardDelete] = React.useState({});
  const [isCardSelected, setIsCardSelected] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [dataImage, setDataImage] = React.useState({});
  const setImage = (card) => {
    setDataImage(card);
    handleCardClick();
  }

  React.useEffect(() => {
    Promise.all([api.getUserInform(), api.getCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardClick() {
    setIsCardSelected(true);
  }

  function handleEditAvatarClick() {
    setAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleConfDeleteClick() {
    setIsConfPopupOpen(true);
  }

  function closeAllPopups() {
    setAvatarPopupOpen(false)
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setIsCardSelected(false);
    setDataImage({});
    setIsConfPopupOpen(false);
  }

  function handleCardDelete(card) {
    setCardDelete(card);
    handleConfDeleteClick();
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCard(card._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
      .catch((err) => {
        console.log(err);
      });;
  }

  function handleConfirmDelete(card) {
    api.deleteCard(cardDelete._id).then(() => {
      const newCards = cards.filter((c) => c._id !== cardDelete._id);
      setCards(newCards);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateUser(user) {
    api.updateProfileInfo(user.name, user.about).then((result) => {
      setCurrentUser(result);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlaceSubmit(card) {
    api.createNewCard(card.name, card.link).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(user) {
    api.updateAvatar(user.avatar)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleEscClose(e) {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  }

  function handlerOverlayClick(e) {
    if (e.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  React.useEffect(() => {
    window.addEventListener('keydown', handleEscClose);
    window.addEventListener('mousedown', handlerOverlayClick);
    return () => {
      window.removeEventListener('mousedown', handlerOverlayClick);
      window.removeEventListener('keydown', handleEscClose);
    };
  })

  return (
    <div className='page'>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main cards={cards} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} clickImages={setImage} onCardDelete={handleCardDelete} onCardLike={handleCardLike} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ConfPopup isOpen={isConfPopupOpen} onClose={closeAllPopups} onDelete={handleConfirmDelete} />
        <ImagePopup onClose={closeAllPopups} isOpen={isCardSelected} card={dataImage} />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;


