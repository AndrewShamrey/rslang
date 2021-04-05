/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LevelSelector from './components/LevelSelector';

const GameStart = (props) => {
  const [level, setLevel] = useState(1);

  return (
    <div className="WordConstructor__start">
      <h2 className="WordConstructor__start-title">Word Constructor</h2>
      <LevelSelector setLevel={setLevel} />
      <Link
        className="WordConstructor__start-button"
        to={{
          pathname: '/wordConstructor/game',
          aboutProps: {
            level,
          },
        }}
        role="button"
      >
        Начать игру
      </Link>
    </div>
  );
};

export default GameStart;
