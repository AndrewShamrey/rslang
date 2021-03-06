import { useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import StartPage from '../startPage/startPage';
import AudiochallengeGamePage from '../audiochallengeGamePage/audiochallengeGamePage';
import GameSoundButton from '../gameSoundButton/gameSoundButton';
import CloseIconButton from '../closeIconButton/closeIconButton';
import StatisticsPage from '../statisticPage/statisticsPage';
import GameSettings from '../gameSettings/gameSettings';
import getRandomNumber from '../../utils/getRandomNumber';
import { AMOUNT_OF_PAGES, GAMES } from '../../utils/constants';

import './audiochallenge.scss';

const Audiochallenge = () => {
  const [isStartPage, setIsStartPage] = useState(true);
  const [isStatisticsPage, setIsStatisticsPage] = useState(false);
  const [isSettings, setIsSettings] = useState(false);
  const [level, setLevel] = useState(0);
  const [page, setPage] = useState(null);
  const [gameResult, setGameResult] = useState({});

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
            game={GAMES.audiochallenge}
            startGame={startGame}
            changeLevel={changeLevel}
          />
        </>
        )}
        {isStatisticsPage && (
        <StatisticsPage
          game={GAMES.audiochallenge}
          gameResult={gameResult}
          showStartPage={showStartPage}
        />
        )}
        {!isStartPage && !isStatisticsPage && (
        <>
          <CloseIconButton
            additionalClassName="audiochallenge__close-btn"
            onClick={closeGame}
          />
          <AudiochallengeGamePage
            level={level}
            page={page}
            showStatistics={showStatistics}
          />
        </>
        )}
        <button type="button" className="audiochallenge__fullscreen" onClick={handleFullScreen}>
          {screenButton}
        </button>
      </main>
    </FullScreen>
  );
};

export default Audiochallenge;
