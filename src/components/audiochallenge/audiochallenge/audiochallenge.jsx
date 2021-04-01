/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';
import StartPage from '../start-page/start-page';
import GamePage from '../game-page/game-page';
import GameSoundButton from '../gameSoundButton/gameSoundButton';
import CloseIconButton from '../closeIconButton/closeIconButton';
import StatisticsPage from '../statistic-page/statistics-page';
import GameSettings from '../gameSettings/gameSettings';
import getRandomNumber from '../utils/getRandomNumber';

import './audiochallenge.scss';

const Audiocall = () => {
  const [isStartPage, setIsStartPage] = useState(true);
  const [isStatisticsPage, setIsStatisticsPage] = useState(false);
  const [isSettings, setIsSettings] = useState(false);
  const [level, setLevel] = useState(0);
  const [page, setPage] = useState(null);
  const [gameResult, setGameResult] = useState({});

  const startGame = () => {
    if (!page) {
      const randomPage = getRandomNumber(10); // refactor ??
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

  const toggleSettings = () => {
    setIsSettings((state) => !state);
  };

  return (
    <main className="audiochallenge">
      <GameSoundButton game="audiochallenge" />
      {isStartPage && (
        <>
          <button
            className="settings-btn"
            type="button"
            onClick={toggleSettings}
          >
            <i className="fas fa-cog" />
          </button>
          {isSettings && <GameSettings close={toggleSettings} />}
          <StartPage
            startGame={startGame}
            changeLevel={changeLevel}
          />
        </>
      )}
      {isStatisticsPage && (
        <StatisticsPage
          gameResult={gameResult}
          level={level}
          showStartPage={showStartPage}
        />
      )}
      {!isStartPage && !isStatisticsPage && (
        <>
          <CloseIconButton
            additionalClassName="audiochallenge__close-btn"
            onClick={closeGame}
          />
          <GamePage
            level={level}
            page={page}
            showStatistics={showStatistics}
          />
        </>
      )}
    </main>
  );
};

export default Audiocall;
