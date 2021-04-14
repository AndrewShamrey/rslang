import React from 'react';
import WordSoundButton from '../../../wordSoundButton/wordSoundButton';
import playSound from '../../../../utils/playSound';
import { BACK_URL } from '../../../../utils/constants';

const WordListItem = ({
  word, statistic, moveToDifficult, deleteWord,
}) => (
  <>
    <div className="WorldListItem__image">
      <img
        src={`${BACK_URL}/${word.image}`}
        alt={word.word}
      />
    </div>
    <span className="WorldListItem__word">
      <WordSoundButton onClick={() => playSound(`${BACK_URL}/${word.audio}`)} />
      <span className="word-card__word">
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
      {/* <i className="fas fa-check" /> */}
      {word.statistic || 3}
    </span>
    <span className="WorldListItem__wordconstructor">
      {word.statistic || 4}
    </span>
    <span className="WorldListItem__savannah">
      {word.statistic || 36}
    </span>
    <span className="WorldListItem__sprint">
      {word.statistic || 113}
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

export default WordListItem;
