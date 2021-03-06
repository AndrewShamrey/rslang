import React from 'react';
import WordListHeadItem from './WordListHeadItem';
import WordListItem from './WordListItem';
import './WordList.scss';

const WordList = ({ words, toggleWordCard, changeCurrentWorld }) => (
  <ul className="WorldList">
    <WordListHeadItem />
    {words.map((el, index) => (
      <li className="WorldList__item" key={index + 1}>
        <WordListItem
          word={el}
          toggleWordCard={() => toggleWordCard()}
          changeCurrentWorld={changeCurrentWorld}
        />
      </li>
    ))}
  </ul>
);

export default WordList;
