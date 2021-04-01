import { useState, useEffect } from 'react';
import GameTimer from './timer';
import { getWords, getRandomNumber, shuffleArray } from './functions';
import StartScreen from './startScreen/startScreen';
import GamePlay from './gamePlay/gamePlay';
import './gameSprint.scss';

const GameSprint = ({ page = getRandomNumber(), level = 0, cleanStart = true }) => {
  const [isGameStarted, setGameStarted] = useState(false);
  const [isGameFinished, setGameFinished] = useState(false);
  const [gameLevel, setGameLevel] = useState(level);
  const [allWords, setAllWords] = useState([]);
  const [workingWords, setWorkingWords] = useState([]);

  console.log(page, gameLevel);

  useEffect(() => {
    if (isGameStarted) {
      getWords(gameLevel, page)
        .then((data) => setAllWords(data))
        .catch((error) => console.log(error));
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameStarted]);

  console.log(allWords);

  useEffect(() => {
    // для создания рабочего массива слов. если не перезагружать страницу, 
    // при внесении изменений массив рабочих слов множится
    // слово, перевод, верный ли сет
    if (isGameStarted && allWords) {
      // Берем половину для верных
      allWords.filter((word, ind) => ind < (allWords.length / 2))
        .forEach((wordSet) => {
          const { word } = wordSet;
          const translation = wordSet.wordTranslate;
          setWorkingWords((words) => [...words, { word, translation, isTrue: true }]);
        });
      // Берем половину для неверных
      allWords.filter((word, ind) => ind >= (allWords.length / 2))
        .forEach((wordSet, ind) => {
          const { word } = wordSet;
          const translation = allWords[ind].wordTranslate;
          setWorkingWords((words) => [...words, { word, translation, isTrue: false }]);
        });
      // and shuffle
      setWorkingWords((words) => shuffleArray(words));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameStarted, allWords]);
  console.log('workingWords: ', workingWords);

  return (
    <div className="game-sprint">
      {isGameStarted && !isGameFinished && (
        <GameTimer setGameFinished={setGameFinished} />
      )}
      {!isGameStarted && !isGameFinished && (
        <StartScreen
          setGameStarted={setGameStarted}
          setGameLevel={setGameLevel}
        />
      )}
      {isGameStarted && !isGameFinished && <GamePlay />}
      {isGameFinished && <div>Finish screen</div>}
    </div>
  );
};

export default GameSprint;
