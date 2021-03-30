import { useState, useEffect } from 'react';
import GameTimer from './timer';
import { getWords } from './functions';
import './gameSprint.scss';

const GameSprint = () => {
  const [isGameStarted, setGameStarted] = useState(true);
  const [isGameFinished, setGameFinished] = useState(false);
  const [allWords, setAllWords] = useState([]);
  const [workingWords, setWorkingWords] = useState([]);
  useEffect(() => {
    // надо как-то тянуть сразу 60 слов?..
    getWords(2)
      .then((data) => setAllWords((words) => [...words, ...data]));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(allWords);
  useEffect(() => {
    // для создания рабочего массива слов
    // слово, перевод, верный ли сет
    allWords.forEach((wordSet) => {
      const { word } = wordSet;
      const translation = wordSet.wordTranslate;
      setWorkingWords((words) => [...words, { word, translation, isTrue: true }]);
    });
  }, [allWords]);
  console.log(workingWords);

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
