import React from 'react';

const WordListHeadItem = () => (
  <li className="WorldList__item WorldList__item_head" key={0}>
    <div className="WorldListItem__image">
      <span>Картинка</span>
    </div>
    <span className="WorldListItem__word">Слово</span>
    <span className="WorldListItem__transcription">Транскрипция</span>
    <span className="WorldListItem__wordTranslate">Перевод</span>
    <span className="WorldListItem__audiochallenge">Аудиовызов</span>
    <span className="WorldListItem__wordconstructor">Конструктор слов</span>
    <span className="WorldListItem__savannah">Саванна</span>
    <span className="WorldListItem__sprint">Спринт</span>
    <span className="WorldListItem__difficult-words">Сложные</span>
    <span className="WorldListItem__delete-words">Удалить</span>
  </li>
);

export default WordListHeadItem;
