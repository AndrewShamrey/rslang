import { useState, useEffect } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import GameTimer from './timer';
import { getRandomNumber } from './helpers/functions';
import StartScreen from './startScreen/startScreen';
import StatisticsPage from '../statisticPage/statisticsPage';
import GamePlay from './gamePlay/gamePlay';
import { GAMES } from '../../utils/constants';
import './gameSprint.scss';

const WORDS_COUNT_DEFAULT = 60;

const GameSprint = ({ page, level }) => {
  const [gamePage, setGamePage] = useState(getRandomNumber());
  const [gameLevel, setGameLevel] = useState(0);
  const [isNoSelect, setIsNoSelect] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);
  const [isGameFinished, setGameFinished] = useState(false);
  const [isGameReady, setIsGameReady] = useState(false);
  const [allWords, setAllWords] = useState([]);
  const [gameScore, setGameScore] = useState(0);
  const [maxStringOfRights, setMaxStringOfRights] = useState(0);
  const [wordsCount, setWordsCount] = useState(WORDS_COUNT_DEFAULT);
  const [addTime, setAddTime] = useState(0);
  const [gameResult, setGameResult] = useState({
    correctAnswers: [],
    incorrectAnswers: [],
    longestSeries: 0,
  });

  const handle = useFullScreenHandle();

  const HandleFullScreen = () => {
    if (handle.active) {
      handle.exit();
    } else {
      handle.enter();
    }
  };

  const screenButton = handle.active ? (<i className="fa fa-compress" />) : (<i className="fa fa-expand" />);

  useEffect(() => {
    if (page && level) {
      setGamePage(page);
      setGameLevel(level);
      setIsNoSelect(true);
    }
  }, [isNoSelect, level, page]);

  const showStartScreen = () => {
    setGameStarted(false);
    setGameFinished(false);
    setGameResult({
      correctAnswers: [],
      incorrectAnswers: [],
      longestSeries: 0,
    });
    setGameScore(0);
    setMaxStringOfRights(0);
    setAllWords([]);
    setGameScore(0);
    setIsGameReady(false);
    setWordsCount(WORDS_COUNT_DEFAULT);
    setAddTime(0);
    setIsNoSelect(false);
    setGamePage(getRandomNumber());
    setGameLevel(0);
  };

  return (
    <>
      <FullScreen handle={handle}>
        <div className="game-sprint">
          {isGameStarted && !isGameFinished && isGameReady && (
            <GameTimer
              setGameFinished={setGameFinished}
              addTime={addTime}
            />
          )}
          {!isGameStarted && !isGameFinished && (
            <StartScreen
              setGameStarted={setGameStarted}
              setAllWords={setAllWords}
              page={gamePage}
              level={gameLevel}
              isNoSelect={isNoSelect}
              setWordsCount={setWordsCount}
            />
          )}
          {isGameStarted && !isGameFinished && (
            <GamePlay
              setGameFinished={setGameFinished}
              isGameStarted={isGameStarted}
              allWords={allWords}
              closeGame={showStartScreen}
              setGameResult={setGameResult}
              isGameReady={isGameReady}
              setIsGameReady={setIsGameReady}
              gameScore={gameScore}
              setGameScore={setGameScore}
              maxStringOfRights={maxStringOfRights}
              setMaxStringOfRights={setMaxStringOfRights}
              wordsCount={wordsCount}
              setAddTime={setAddTime}
            />
          )}
          {isGameFinished && (
            <StatisticsPage
              game={GAMES.sprint}
              gameResult={({
                correctAnswers: gameResult.correctAnswers,
                incorrectAnswers: gameResult.incorrectAnswers,
                longestSeries: maxStringOfRights,
              })}
              showStartPage={showStartScreen}
              score={gameScore}
            />
          )}
          <button type="button" className="game-sprint__fullscreen" onClick={HandleFullScreen}>
            {screenButton}
          </button>
        </div>
      </FullScreen>
    </>
  );
};

export default GameSprint;
