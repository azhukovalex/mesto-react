import React from 'react';
import Card from './Card';
import api from '../utils/Api.js';


export default function Main(props) {
  const [cards, setCards] = React.useState([]);
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('#');
  

  

  React.useEffect(() => {
    function userInfo(user) {
      setUserName(user.name);
      setUserDescription(user.about);
      setUserAvatar(user.avatar);
    }
  

    Promise.all([api.getUserInform(), api.getCards()])
      .then(([user, cards]) => {
        userInfo(user);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });

    }, []);

    return (
      <main className="main">
        <section className="profile">
          <div className="profile__author">
            <div className="profile__avatar">
              <img className="profile__image" src={userAvatar} alt={userName} name="avatar"/>
              <button className="button button_type_avatar"  onClick={props.onEditAvatar}></button>
            </div>
            <div className="profile__info">
              <div className="profile__text">
                <h1 className="profile__title">{userName}</h1>
                <button className="button button_type_edit" type="button" id="close-edit" aria-label="Редактировать" onClick={props.onEditProfile}></button>
              </div>
    <p className="profile__subtitle">{userDescription}</p>
            </div>
          </div>
          <button className="button button_type_add" type="button" aria-label="Добавить фото" onClick={props.onAddPlace}></button>
        </section>

        <div className="cards">
          <ul className="card-list main__card-list">
            {cards && cards.map((card) => (
              <Card key={card._id} card={card} onCardClick={props.clickImages}/> 
            ))}
          </ul>
        </div>
      </main>
    )
  }

