import React from 'react';
import s from './word-list.module.css';

const WordList = ({
  words, getAnswer, isQuestion, currentWordId, answerId,
}) => (
  <ul className={s.wordList}>
    {words.map((item, index) => {
      const { id, wordTranslate } = item;
      let classNames = s.wordItem;

      if (!isQuestion) {
        classNames = s.wordItemInactive;

        if (id === currentWordId && id === answerId) {
          classNames += ` ${s.correctSelected}`;
        } else if (id === currentWordId) {
          classNames += ` ${s.correct}`;
        } else if (id === answerId) {
          classNames += ` ${s.incorrect}`;
        }
      }

      return (
        <li key={id}>
          <button className={classNames} onClick={getAnswer} id={id} type="button">
            <span className={s.wordNumber}>{`${index + 1}. `}</span>
            {wordTranslate}
          </button>
        </li>
      );
    })}
  </ul>
);

export default WordList;
