import { useState, useEffect } from 'react';
import GameTimer from './timer';
import { getRandomNumber } from './helpers/functions';
import StartScreen from './startScreen/startScreen';
import StatisticsPage from '../statisticPage/statisticsPage';
import GamePlay from './gamePlay/gamePlay';
import { GAMES } from '../../utils/constants';
import './gameSprint.scss';

const GameSprint = () => {
  const [isGameStarted, setGameStarted] = useState(false);
  const [isGameFinished, setGameFinished] = useState(false);
  const [allWords, setAllWords] = useState([]);
  const [gameResult, setGameResult] = useState({
    correctAnswers: [],
    incorrectAnswers: [],
    longestSeries: 0,
  });

  console.log(allWords);

  const closeGame = () => {
    setGameStarted(false);
  };

  const showStartScreen = () => {
    setGameStarted(false);
    setGameFinished(false);
    setGameResult({
      correctAnswers: [],
      incorrectAnswers: [],
      longestSeries: 0,
    });
  };

  return (
    <div className="game-sprint">
      {isGameStarted && !isGameFinished && (
        <GameTimer setGameFinished={setGameFinished} />
      )}
      {!isGameStarted && !isGameFinished && (
        <StartScreen
          setGameStarted={setGameStarted}
          setAllWords={setAllWords}
          page={getRandomNumber()}
        />
      )}
      {isGameStarted && !isGameFinished && (
        <GamePlay
          setGameFinished={setGameFinished}
          isGameStarted={isGameStarted}
          allWords={allWords}
          closeGame={closeGame}
          setGameResult={setGameResult}
        />
      )}
      {isGameFinished && (
        <StatisticsPage
          game={GAMES.sprint}
          gameResult={gameResult}
          showStartPage={showStartScreen}
        />
      )}
    </div>
  );
};

export default GameSprint;
