import React from 'react';
import WordListItem from './WordListItem';
import './WordList.scss';

const WordList = ({ words }) => (
  <ul className="WorldList">
    {words.map((el, index) => (
      <li className="WorldList__item" key={index}>
        <WordListItem word={el} />
      </li>
    ))}
  </ul>
);

export default WordList;
