/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Preloader from '../Preloader';

const GameStart = (props) => {
  const [isUpload, setIsUpload] = useState(true);
  const [level, setLevel] = useState(1);

  return isUpload ? (
    <div className="WordConstructor__start">
      <h2 className="WordConstructor__start-title">Word Constructor</h2>
      <label className="WordConstructor__start-select-title">
        Уровень сложности
        <select
          className="WordConstructor__start-select"
          onChange={(e) => {
            setLevel(e.target.value);
          }}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
        </select>
      </label>

      <Link
        className="WordConstructor__start-button"
        to={{
          pathname: '/wordConstructor/game',
          aboutProps: {
            level,
            // UserWordList: this.state.UserWordList,
          },
        }}
        role="button"
      >
        Начать игру
      </Link>
    </div>
  ) : <Preloader type="green" />;
};

export default GameStart;
