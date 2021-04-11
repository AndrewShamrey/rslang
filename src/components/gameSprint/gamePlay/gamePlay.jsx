import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import GameSoundButton from '../../gameSoundButton/gameSoundButton';
import CloseIconButton from '../../closeIconButton/closeIconButton';
import Preloader from '../../preloader/preloader';
import ShowBirds from './gameBirds/gameBirds';
import ShowCircles from './showCircles/showCircles';
import playSound from '../../../utils/playSound';
import error from '../../../assets/audio/error.mp3';
import correct from '../../../assets/audio/correct.mp3';
import pass from '../../../assets/audio/pass.mp3';
import { shuffleArray } from '../helpers/functions';
import { GAMES } from '../../../utils/constants';
import { SPRINT_GAME } from '../../../utils/content';
import './gamePlay.scss';

const BASE_POINTS = 20;
const ADDED_TIME = 5;

const GamePlay = ({
  setGameFinished, allWords, closeGame, setGameResult, isGameReady, setIsGameReady,
  gameScore, setGameScore, maxStringOfRights, setMaxStringOfRights, wordsCount, setAddTime,
}) => {
  const [workingWords, setWorkingWords] = useState([]);
  const [stringOfRights, setStringOfRights] = useState(0);
  const [answerPoints, setAnswerPoints] = useState(BASE_POINTS);
  const isSound = useSelector((state) => state.control.sprint.isSound);

  useEffect(() => {
    if (workingWords.length === wordsCount) {
      setIsGameReady(true);
    }
  }, [workingWords, setIsGameReady, wordsCount]);

  useEffect(() => {
    if (maxStringOfRights < stringOfRights) {
      // console.log('increase long series +1');
      setMaxStringOfRights((strike) => strike + 1);
      // setGameResult((state) => ({
      //   ...state,
      //   longestSeries: maxStringOfRights,
      // }));
    }
  }, [stringOfRights, maxStringOfRights, setMaxStringOfRights]);

  useEffect(() => {
    if (stringOfRights === 4 || stringOfRights === 8 || stringOfRights === 12) {
      setAnswerPoints((points) => points + BASE_POINTS);
      if (isSound) playSound(pass);
    }
    if (stringOfRights === 16) {
      if (isSound) playSound(pass);
      setAddTime(ADDED_TIME);
    }
  }, [isSound, setAddTime, stringOfRights]);

  const rightAnswerHandler = useCallback(() => {
    // console.log('answered right');
    setGameScore((points) => points + answerPoints);
    setStringOfRights((answer) => answer + 1);
    if (isSound) playSound(correct);

    setGameResult((state) => ({
      ...state,
      correctAnswers: [...state.correctAnswers, workingWords[0].obj],
    }));
  }, [setGameScore, isSound, setGameResult, answerPoints, workingWords]);

  const wrongAnswerHandler = useCallback(() => {
    // console.log('answered wrong');
    if (isSound) playSound(error);
    setStringOfRights(0);
    setAnswerPoints(BASE_POINTS);
    setGameResult((state) => ({
      ...state,
      incorrectAnswers: [...state.incorrectAnswers, workingWords[0].obj],
    }));
  }, [isSound, setGameResult, workingWords]);

  useEffect(() => {
    if (allWords.length) {
      // console.log('making words');

      const newWords = allWords.map((item, ind) => {
        let playWord;
        if (ind < (allWords.length / 2)) {
          const { word } = item;
          const translation = item.wordTranslate;
          playWord = {
            obj: item, word, translation, isTrue: 'true',
          };
        } else {
          const { word } = item;
          const translation = allWords[ind - (allWords.length / 2)].wordTranslate;
          playWord = {
            obj: item, word, translation, isTrue: 'false',
          };
        }
        return playWord;
      });

      setWorkingWords(shuffleArray(newWords));
      // console.log('words collected', workingWords);
    }
  }, [allWords]);

  const handleAnswer = useCallback(({ target }) => {
    const { value } = target;
    // console.log(value);
    // console.log(workingWords[0].isTrue);
    if (value === workingWords[0].isTrue) {
      rightAnswerHandler();
    } else {
      wrongAnswerHandler();
    }
    if (workingWords.length > 1) {
      setWorkingWords((words) => words.slice(1));
    } else {
      setGameFinished(true);
    }
  }, [rightAnswerHandler, wrongAnswerHandler, workingWords, setGameFinished]);

  const keyboardEvents = useCallback((event) => {
    const { key } = event;

    if (key === 'ArrowLeft') {
      handleAnswer({ target: { value: 'true' } });
    }

    if (key === 'ArrowRight') {
      handleAnswer({ target: { value: 'false' } });
    }
  }, [handleAnswer]);

  useEffect(() => {
    document.addEventListener('keydown', keyboardEvents);

    return () => {
      document.removeEventListener('keydown', keyboardEvents);
    };
  }, [keyboardEvents]);

  return (
    <>
      <div className="game-controls">
        <GameSoundButton
          game={GAMES.sprint}
        />
        <div className="game-controls__score">
          {gameScore}
        </div>
        <CloseIconButton
          additionalClassName="game-controls__close-btn"
          onClick={closeGame}
        />
      </div>
      {!isGameReady && (<Preloader />)}
      {isGameReady && (
        <main className="game-play">
          <div className="game-play__upper">
            <ShowCircles stringOfRights={stringOfRights} />
            <p className="game-play__upper_text">
              {`+${answerPoints} ${SPRINT_GAME.points}`}
            </p>
          </div>
          <ShowBirds
            stringOfRights={stringOfRights}
          />
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
            <div className="game-play__buttons_block">
              <button value="true" type="button" className="answer-button right" onClick={handleAnswer}>
                {SPRINT_GAME.right}
              </button>
              <i className="fas fa-arrow-left" />
            </div>
            <div className="game-play__buttons_block">
              <button value="false" type="button" className="answer-button wrong" onClick={handleAnswer}>
                {SPRINT_GAME.wrong}
              </button>
              <i className="fas fa-arrow-right" />
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default GamePlay;
