import React from 'react';
import './wordList.scss';

const WordList = ({
  words, getAnswer, isQuestion, currentWordId, answerId,
}) => (
  <ul className="word-list">
    {words.map((item, index) => {
      const { id, wordTranslate } = item;
      let classNames = 'word-list__item';

      if (!isQuestion) {
        classNames += ' word-list__item_inactive';

        if (id === currentWordId && id === answerId) {
          classNames += ' word-list__item_correct_selected';
        } else if (id === currentWordId) {
          classNames += ' word-list__item_correct';
        } else if (id === answerId) {
          classNames += ' word-list__item_incorrect';
        }
      }

      return (
        <li key={id}>
          <button
            className={classNames}
            onClick={getAnswer}
            id={id}
            disabled={!isQuestion}
            type="button"
          >
            <span className="word-list__number">{`${index + 1}. `}</span>
            {wordTranslate}
          </button>
        </li>
      );
    })}
  </ul>
);

export default WordList;
