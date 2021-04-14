import React from 'react';

const WordListItem = ({ word, statistic }) => (
  <>
    <div className="WorldListItem__image" />
    <span className="WorldListItem__word">{word.word}</span>
    <span className="WorldListItem__transcription">{word.transcription}</span>
    <span className="WorldListItem__wordTranslate">{word.wordTranslate}</span>
    <span className="WorldListItem__audiochallenge">{word.statistic}</span>
    <span className="WorldListItem__wordconstructor">{word.statistic}</span>
    <span className="WorldListItem__savannah">{word.statistic}</span>
    <span className="WorldListItem__sprint">{word.statistic}</span>
    <span className="WorldListItem__difficult-words">Сложные!</span>
    <span className="WorldListItem__delete-words">Удалить!</span>
  </>
);

export default WordListItem;
