import React from 'react';
import { useSelector } from 'react-redux';
import WordSoundButton from '../../../wordSoundButton/wordSoundButton';
import playSound from '../../../../utils/playSound';
import { BACK_URL, GAMES } from '../../../../utils/constants';

const WordListItem = ({
  word, statistic, moveToDifficult, deleteWord, toggleWordCard, changeCurrentWorld,
}) => {
  const isAuthorized = useSelector((rootState) => rootState.control.isAuthorized);

  const showStat = (game) => (isAuthorized
    // ? (statistic[game])
    ? (Math.floor(Math.random() * 30))
    : (
      <button className="word-card__table-btn" type="button">
        <i className="fa fa-info" aria-hidden="true" />
      </button>
    )
  );

  return (
    <>
      <div className="WorldListItem__image">
        <img
          src={`${BACK_URL}/${word.image}`}
          alt={word.word}
        />
      </div>
      <span className="WorldListItem__word">
        <WordSoundButton onClick={() => playSound(`${BACK_URL}/${word.audio}`)} />
        <span
          className="word-card__word"
          onClick={() => {
            toggleWordCard();
            changeCurrentWorld(word);
          }}
        >
          {word.word}
        </span>
      </span>
      <span className="WorldListItem__transcription">
        <span className="word-card__transcription">
          {word.transcription}
        </span>
      </span>
      <span className="WorldListItem__wordTranslate">
        <span className="word-card__word-translate">
          {word.wordTranslate}
        </span>
      </span>
      <span className="WorldListItem__audiochallenge">
        {showStat(GAMES.audiochallenge)}
      </span>
      <span className="WorldListItem__wordconstructor">
        {showStat(GAMES.wordConstructor)}
      </span>
      <span className="WorldListItem__savannah">
        {showStat(GAMES.savanna)}
      </span>
      <span className="WorldListItem__sprint">
        {showStat(GAMES.sprint)}
      </span>
      <span className="WorldListItem__difficult-words">
        <button
          className="word-card__table-btn word-card__btn-difficult"
          type="button"
          onClick={moveToDifficult}
        >
          <i className="far fa-clock" />
        </button>
      </span>
      <span className="WorldListItem__delete-words">
        <button
          className="word-card__table-btn word-card__btn-delete"
          type="button"
          onClick={deleteWord}
        >
          <i className="far fa-times-circle" />
        </button>
      </span>
    </>
  );
};

export default WordListItem;
