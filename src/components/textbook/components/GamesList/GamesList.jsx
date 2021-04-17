import React from 'react';
import { Link } from 'react-router-dom';
import { GAME_NAMES, GAMES_BG_COLORS } from '../../../../utils/constants';
import './GamesList.scss';

const GamesList = (gamePage, level) => {
  console.log(gamePage, level);

  return (
    <ul className="GamesList">
      {GAME_NAMES.map((el, index) => (
        <li className="GamesList__item" key={index} style={{ backgroundColor: GAMES_BG_COLORS[index] }}>
          <Link to={{
            pathname: `${el.path}`,
            aboutProps: {
              page: gamePage,
              level,
            },
          }}
          >
            {el.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default GamesList;
