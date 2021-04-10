import { useState, useEffect } from 'react';
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
  const [gameResult, setGameResult] = useState({
    correctAnswers: [],
    incorrectAnswers: [],
    longestSeries: 0,
  });

  useEffect(() => {
    if (page && level) {
      console.log(page, level);
      setGamePage(page);
      setGameLevel(level);
      setIsNoSelect(true);
    }
  }, [level, page]);
  // console.log(allWords);
  console.log('gameResult: ', gameResult);

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
  };

  return (
    <div className="game-sprint">
      {isGameStarted && !isGameFinished && isGameReady && (
        <GameTimer setGameFinished={setGameFinished} />
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
    </div>
  );
};

export default GameSprint;
