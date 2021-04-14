import React from 'react';
import { Link } from 'react-router-dom';
import { GAME_NAMES, GAMES_BG_COLORS } from '../../../../utils/constants';
import './GamesList.scss';

const GamesList = () => (
  <ul className="GamesList">
    {GAME_NAMES.map((el, index) => (
      <li className="GamesList__item" key={index} style={{ backgroundColor: GAMES_BG_COLORS[index] }}>
        <Link to={{ pathname: `${el.path}` }}>{el.name}</Link>
      </li>
    ))}
  </ul>
);

export default GamesList;
