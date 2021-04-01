import { useState } from 'react';
import './gamePlay.scss';

const GamePlay = () => {
  const [stringOfRights, setStringOfRights] = useState(0);
  console.log('start game');

  return (
    <div className="game-play">
      <div className="game-play__upper">
        <div className="circle" />
      </div>
      <div className="game-play__birds">
        <div className="line" />
        {stringOfRights >= 0 && (
          <div className="bird bird-1" />
        )}
        {stringOfRights >= 3 && (
          <div className="bird bird-2" />
        )}
        {stringOfRights >= 6 && (
          <div className="bird bird-3" />
        )}
        {stringOfRights >= 9 && (
          <div className="bird bird-4" />
        )}
      </div>
      <div className="game-play__word">
        слово
      </div>
      <div className="game-play__translation">
        перевод
      </div>
      <div className="game-play__buttons">
        <button type="button" className="right">
          Верно
        </button>
        <button type="button" className="wrong">
          Неверно
        </button>
      </div>
    </div>
  );
};

export default GamePlay;
