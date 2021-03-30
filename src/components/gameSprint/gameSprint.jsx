import { useState, useEffect } from 'react';
import GameTimer from './timer';
import { getWords, getRandomNumber } from './functions';
import './gameSprint.scss';

const GameSprint = () => {
  const [isGameStarted, setGameStarted] = useState(true);
  const [isGameFinished, setGameFinished] = useState(false);
  const [allWords, setAllWords] = useState([]);
  useEffect(() => {
    getWords(2)
      .then((data) => setAllWords((words) => [...words, ...data]));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(allWords);

  return (
    <div>
      {isGameStarted && !isGameFinished && <GameTimer />}
      {!isGameStarted && !isGameFinished && <div>Starting screen with settings</div>}
      {isGameStarted && !isGameFinished && <div>there will be the game</div>}
      {isGameFinished && <div>Finish screen</div>}
    </div>
  );
};

export default GameSprint;
