import './gamePlay.scss';

const GamePlay = () => {
  console.log('start game');

  return (
    <div className="game-play">
      <div className="game-play__upper">
        <div className="circle" />
      </div>
      <div className="game-play__birds">
        тут как-то должны быть птички
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
