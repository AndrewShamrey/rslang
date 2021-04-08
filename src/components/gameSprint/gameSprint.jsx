import { useState, useEffect } from 'react';
import GameTimer from './timer';
import { getRandomNumber } from './functions';
import StartScreen from './startScreen/startScreen';
import GamePlay from './gamePlay/gamePlay';
import './gameSprint.scss';

const GameSprint = () => {
  const [isGameStarted, setGameStarted] = useState(false);
  const [isGameFinished, setGameFinished] = useState(false);
  const [allWords, setAllWords] = useState([]);

  console.log(allWords);

  // const showStatistics = (correctAnswers, incorrectAnswers, longestSeries) => {
  //   setGameResult(() => ({ correctAnswers, incorrectAnswers, longestSeries }));
  //   setIsStatisticsPage(() => true);
  // };

  const closeGame = () => {
    setGameStarted(false);
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
        />
      )}
      {isGameFinished && <div>Finish screen</div>}
    </div>
  );
};

export default GameSprint;
