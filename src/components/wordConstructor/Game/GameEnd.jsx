import React from 'react';
import StatisticsPage from '../../statisticPage/statisticsPage';
import { GAMES } from '../../../utils/constants';

const GameEnd = (props) => {
  const { score, newGame, gameResult } = props;

  const game = GAMES.wordConstructor;

  return (
    <div className="WordConstructor__play">
      <main className="WordConstructor__result">
        <StatisticsPage
          game={game}
          gameResult={gameResult}
          showStartPage={newGame}
          score={score}
        />
      </main>
    </div>
  );
};

export default GameEnd;
