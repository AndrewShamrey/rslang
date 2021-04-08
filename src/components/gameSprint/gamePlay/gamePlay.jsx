import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import GameSoundButton from '../../gameSoundButton/gameSoundButton';
import CloseIconButton from '../../closeIconButton/closeIconButton';
import playSound from '../../../utils/playSound';
import error from '../../../assets/audio/error.mp3';
import correct from '../../../assets/audio/correct.mp3';
import { shuffleArray } from '../helpers/functions';
import './gamePlay.scss';

const BASE_POINTS = 20;

const GamePlay = ({
  setGameFinished, isGameStarted, allWords, closeGame,
}) => {
  const [workingWords, setWorkingWords] = useState([]);
  const [stringOfRights, setStringOfRights] = useState(0);
  const [maxStringOfRights, setMaxStringOfRights] = useState(0); // самая длинная серия
  const [rightAnswers, setRightAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [answerPoints, setAnswerPoints] = useState(BASE_POINTS);
  const [score, setScore] = useState(0);
  const isSound = useSelector((state) => state.control.sprint.isSound);

  let circles = '';
  if (stringOfRights < 16) {
    if (stringOfRights % 4 === 0) {
      circles = (
        <div className="circles-line">
          <i className="far fa-circle circle" />
          <i className="far fa-circle circle" />
          <i className="far fa-circle circle" />
        </div>
      );
    } else if ((stringOfRights - 1) % 4 === 0) {
      circles = (
        <div className="circles-line">
          <i className="far fa-check-circle circle" />
          <i className="far fa-circle circle" />
          <i className="far fa-circle circle" />
        </div>
      );
    } else if (stringOfRights % 2 === 0) {
      circles = (
        <div className="circles-line">
          <i className="far fa-check-circle circle" />
          <i className="far fa-check-circle circle" />
          <i className="far fa-circle circle" />
        </div>
      );
    } else {
      circles = (
        <div className="circles-line">
          <i className="far fa-check-circle circle" />
          <i className="far fa-check-circle circle" />
          <i className="far fa-check-circle circle" />
        </div>
      );
    }
  }

  useEffect(() => {
    console.log('allWords in the useEffect on gamePlay', allWords);
    // для создания рабочего массива слов. если не перезагружать страницу,
    // при внесении изменений массив рабочих слов множится
    // слово, перевод, верный ли сет
    if (isGameStarted && allWords.length && !workingWords.length) {
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
  }, [allWords]);

  useEffect(() => {
    console.log('start game');
  }, []);
  console.log('words for the game', workingWords);
  // console.log('rightAnswers: ', rightAnswers);
  // console.log('wrongAnswers: ', wrongAnswers);

  const handleAnswer = (e) => {
    const { value } = e.target;
    // console.log(value);
    // console.log(workingWords[0].isTrue.toString());
    if (value === workingWords[0].isTrue.toString()) {
      if (isSound) playSound(correct);
      setScore((points) => points + answerPoints);

      if (stringOfRights === 4 || stringOfRights === 8 || stringOfRights === 12) {
        setAnswerPoints((points) => points + BASE_POINTS);
      }
      setStringOfRights((answer) => answer + 1);
      if (maxStringOfRights < stringOfRights) setMaxStringOfRights(stringOfRights);
      setRightAnswers((answers) => [...answers, workingWords[0]]);
    } else {
      if (isSound) playSound(error);
      setStringOfRights(0);
      setAnswerPoints(BASE_POINTS);
      setWrongAnswers((answers) => [...answers, workingWords[0]]);
    }
    if (workingWords.length > 1) {
      setWorkingWords((words) => words.slice(1));
    } else {
      setGameFinished(true);
    }
  };

  return (
    <>
      <div className="game-controls">
        <GameSoundButton game="sprint" />
        <div className="game-controls__score">
          {score}
        </div>
        <CloseIconButton
          additionalClassName="game-controls__close-btn"
          onClick={closeGame}
        />
      </div>
      <main className="game-play">
        <div className="game-play__upper">
          <div className="game-play__upper_circles">
            {stringOfRights < 16 && (circles)}
            {stringOfRights >= 16 && (
              <div className="circles-line">
                <i className="circle fas fa-check-circle" />
              </div>
            )}
          </div>
          <p>
            {`+${answerPoints} баллов`}
          </p>
        </div>
        <div className="game-play__birds">
          <div className="line" />
          {stringOfRights >= 0 && (
            <div className="bird bird-1" />
          )}
          {stringOfRights >= 4 && (
            <div className="bird bird-2" />
          )}
          {stringOfRights >= 8 && (
            <div className="bird bird-3" />
          )}
          {stringOfRights >= 12 && (
            <div className="bird bird-4" />
          )}
        </div>
        {workingWords.length && (
          <div className="game-play__word">
            {workingWords[0].word}
          </div>
        )}
        {workingWords.length && (
          <div className="game-play__translation">
            {workingWords[0].translation}
          </div>
        )}
        <div className="game-play__buttons">
          <button value="true" type="button" className="right" onClick={handleAnswer}>
            Верно
          </button>
          <button value="false" type="button" className="wrong" onClick={handleAnswer}>
            Неверно
          </button>
        </div>
      </main>
    </>
  );
};

export default GamePlay;
