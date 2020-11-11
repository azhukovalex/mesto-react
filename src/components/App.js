import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';





function App() {
   
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false); 
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false); 
    const [isEditAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false); 
    const [selectedCard, setSelectedCard] = React.useState(null);


    const [dataImage, setDataImage] = React.useState({});
    const setImage = (card) => {
      setDataImage(card);
      handleCardClick();
    }


  function handleCardClick() {
    setSelectedCard(true);
    
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

  function closeAllPopups() {
    setAvatarPopupOpen(false)
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(false);
   }


  return (
    <div className='page'>
       <Header/>
       <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} clickImages={setImage}/> 
<PopupWithForm 
      title='Редактировать профиль'
      onSubmit='Сохранить'
      form='name-form'
      isOpen={isEditProfilePopupOpen} 
      onClose={closeAllPopups}> 
      <input className="popup__form-input" type="text" id="input-name" required placeholder="Имя" name="name" minLength="2" maxLength="40"/>
      <span className="popup__span-error" id="input-name-error"/>
      <input className="popup__form-input" type="text" id="input-profession" required placeholder="Профессия" name="about" minLength="2" maxLength="200"/>
      <span className="popup__span-error" id="input-profession-error"/>
</PopupWithForm> 
<PopupWithForm 
      title='Новое место'
      onSubmit='Создать'
      form='place-form'
      isOpen={isAddPlacePopupOpen} 
      onClose={closeAllPopups}> 
      <input className="popup__form-input" type="text" id="input-place" required placeholder="Название" name="name" minLength="1" maxLength="30"/>
      <span className="popup__span-error" id="input-place-error"/>
      <input className="popup__form-input" type="url" id="input-link" required placeholder="Ссылка на картинку" name="link"/>
      <span className="popup__span-error popup__place-span-error" id="input-link-error"/>
</PopupWithForm> 
<PopupWithForm 
      title='Обновить аватар'
      onSubmit='Сохранить'
      form='form-avatar'
      isOpen={isEditAvatarPopupOpen} 
      onClose={closeAllPopups}> 
      <input className="popup__form-input" type="url" id="avatar-link" aria-label="Ссылка на картинку" placeholder="Ссылка на картинку" name="link" required />
      <span className="popup__span-error" id="avatar-link-error" />
      <span className="popup__span-error" id="input-profession-error" />
</PopupWithForm> 
<PopupWithForm 
      title='Вы уверены?'
      onSubmit='Да'
      form='delete-place'/> 
<ImagePopup onClose={closeAllPopups} isOpen={selectedCard} card={dataImage}/>
<Footer/> 
    </div>
  );
}

export default App;


