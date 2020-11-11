import React from 'react';
export default function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }  
  return (
    <li className="card" key={props.card._id}>
      <button className="button button_type_delete" type="button" aria-label="Удалить"></button>
      <img className="card__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <div className="card__description">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like">
          <button className="button button_type_like" type="button" aria-label="Лайкнуть"></button>
          <div className="card__like-counter">{props.card.likes.length}</div>
        </div>
      </div>
    </li>
  )
}

