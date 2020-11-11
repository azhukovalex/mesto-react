import React from 'react';

export default function PopupWithForm(props) {
  return (
    <div className={(props.isOpen ? "popup popup_opened" : "popup")} id={props.name}>
      <div className="popup__container">
        <button className="button button_type_close" type="button" id="close-button" aria-label="Закрыть" onClick={props.onClose}></button>
        <form className="popup__form" id={props.form} name="form-info">
          <h3 className="popup__title">{props.title}</h3>
          {props.children}
          <button className="button button_type_save" id="buttonSaveCard" type="submit">{props.onSubmit}</button>
          
        </form>
      </div>
    </div>
  )
}
