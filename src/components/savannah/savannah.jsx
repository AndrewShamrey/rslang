import { useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import StartPage from '../startPage/startPage';
import SavannahGamePage from './savannahGamePage/savannahGamePage';
import GameSoundButton from '../gameSoundButton/gameSoundButton';
import StatisticsPage from '../statisticPage/statisticsPage';
import GameSettings from './gameSettings/gameSettings';
import getRandomNumber from '../../utils/getRandomNumber';
import { AMOUNT_OF_PAGES, GAMES } from '../../utils/constants';

import './savannah.scss';

const Savannah = () => {
  const [isStartPage, setIsStartPage] = useState(true);
  const [isStatisticsPage, setIsStatisticsPage] = useState(false);
  const [isSettings, setIsSettings] = useState(false);
  const [level, setLevel] = useState(0);
  const [page, setPage] = useState(null);
  const [gameResult, setGameResult] = useState({});
  const [backgroundPosition, setBackgroundPosition] = useState(100);

  const handle = useFullScreenHandle();

  const screenButton = handle.active ? (
    <i className="fa fa-compress" />) : (<i className="fa fa-expand" />
  );

  const handleFullScreen = () => {
    if (handle.active) {
      handle.exit();
    } else {
      handle.enter();
    }
  };

  const startGame = () => {
    const randomPage = getRandomNumber(AMOUNT_OF_PAGES);
    setPage(randomPage);
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
    setLevel(target.value);
  };

  const closeGame = () => {
    setIsStartPage(true);
  };

  const toggleSettings = () => {
    setIsSettings((state) => !state);
  };

  return (
    <FullScreen handle={handle}>
      <main className="savannah" style={{ backgroundPositionY: `${backgroundPosition}%` }}>
        <GameSoundButton game={GAMES.savannah} />
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
              game={GAMES.savannah}
              startGame={startGame}
              changeLevel={changeLevel}
            />
          </>
        )}
        {isStatisticsPage && (
          <StatisticsPage
            game={GAMES.savannah}
            gameResult={gameResult}
            showStartPage={showStartPage}
          />
        )}
        {!isStartPage && !isStatisticsPage && (
          <>
            <SavannahGamePage
              level={level}
              page={page}
              showStatistics={showStatistics}
              closeGame={closeGame}
              setBackgroundPosition={setBackgroundPosition}
            />
          </>
        )}
        <button type="button" className="savannah__fullscreen" onClick={handleFullScreen}>
          {screenButton}
        </button>
      </main>
    </FullScreen>
  );
};

export default Savannah;
