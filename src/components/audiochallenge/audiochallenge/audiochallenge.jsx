import React, { useState } from 'react';
import StartPage from '../start-page/start-page';
import GamePage from '../game-page/game-page';
import StatisticsPage from '../statistic-page/statistics-page';
import getRandomNumber from '../utils/getRandomNumber';

const Audiocall = () => {
  const [isStartPage, setIsStartPage] = useState(true);
  const [isStatisticsPage, setIsStatisticsPage] = useState(false);
  const [level, setLevel] = useState(0);
  const [page, setPage] = useState(null);
  const [gameResult, setGameResult] = useState({});

  const startGame = () => {
    if (!page) {
      const randomPage = getRandomNumber(10) + 1;
      setPage(randomPage);
    }
    setIsStartPage(false);
  };

  const showStatistics = (correctAnswers, incorrectAnswers, longestSeries) => {
    setGameResult(() => ({ correctAnswers, incorrectAnswers, longestSeries }));
    setIsStatisticsPage(() => true);
  };

  const showStartPage = () => {
    setIsStartPage(true);
    setIsStatisticsPage(false);
  };

  const changeLevel = ({ target }) => {
    setLevel({ level: target.value });
  };

  const closeGame = () => {
    setIsStartPage(true);
  };

  return (
    <>
      {isStartPage && (
        <StartPage
          startGame={startGame}
          changeLevel={changeLevel}
        />
      )}
      {isStatisticsPage && (
        <StatisticsPage
          gameResult={gameResult}
          level={level}
          showStartPage={showStartPage}
        />
      )}
      {!isStartPage && !isStatisticsPage && (
        <GamePage
          level={level}
          page={page}
          showStatistics={showStatistics}
          closeGame={closeGame}
        />
      )}
    </>
  );
};

export default Audiocall;
