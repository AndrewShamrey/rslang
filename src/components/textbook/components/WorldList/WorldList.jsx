import React from 'react';
import WorldListItem from './WorldListItem';
import './WorldList.scss';

const WorldList = ({ words }) => (
  <ul className="WorldList">
    {words.map((el, index) => (
      <li className="WorldList__item" key={index}>
        <WorldListItem word={el} />
      </li>
    ))}
  </ul>
);

export default WorldList;
