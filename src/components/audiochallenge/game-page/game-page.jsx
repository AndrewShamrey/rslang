import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import WordList from '../word-list/word-list';
import Preloader from '../preloader/preloader';
import WordSoundButton from '../wordSoundButton/wordSoundButton';
import playSound from '../utils/playSound';
import shuffleArray from '../utils/shuffleArray';
import WordsAPI from '../services/wordsAPI';
import getRandomNumber from '../utils/getRandomNumber';
import error from '../assets/audio/error.mp3';
import correct from '../assets/audio/correct.mp3';
import { MEDIA_URI } from '../constants';

import './game-page.scss';

const wordsAPI = new WordsAPI();

const GamePage = ({ level, page, showStatistics }) => {
  const isSound = useSelector((state) => state.control.audiochallenge.isSound);

  const [isQuestion, setIsQuestion] = useState(true);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(true);
  const [isPreloader, setIsPreloader] = useState(true);
  const [gameData, setGameData] = useState({
    words: [],
    currentWord: '',
    turn: 0,
    answers: [],
    correctAnswers: [],
    incorrectAnswers: [],
    longestSeries: 0,
    currentSeries: 0,
    answerId: null,
  });

  const { answers, answerId, currentWord } = gameData;
  const { image, wordTranslate } = currentWord || {};

  const playWordSound = useCallback(() => {
    const { audio } = gameData?.currentWord;
    playSound(`${MEDIA_URI}${audio}`);
  }, [gameData.currentWord]);

  const playGameSound = useCallback((sound) => {
    if (!isSound) {
      return;
    }

    playSound(sound);
  }, [isSound]);

  const getWrongAnswersData = useCallback(async () => {
    let i = 0;
    const pages = [];
    const usedPagesNumbers = [page];

    while (i < 2) {
      const randomPage = getRandomNumber(30) + 1; // magic numbers

      if (!usedPagesNumbers.includes(pages)) {
        pages.push(wordsAPI.getCollectionWords(level, randomPage + 1));
        usedPagesNumbers.push(randomPage);
        i += 1;
      }
    }

    const responseArr = await Promise.all(pages);

    return responseArr.flat();
  }, [level, page]);

  const getAnswersSeries = useCallback(() => {
    const { currentSeries, longestSeries } = gameData;
    const newCurrentSeries = currentSeries + 1;

    if (newCurrentSeries > longestSeries) {
      return [newCurrentSeries, newCurrentSeries];
    }

    return [newCurrentSeries, longestSeries];
  }, [gameData]);

  const getCorrectAnswer = useCallback((id, answer) => {
    const [currentSeries, longestSeries] = getAnswersSeries();

    setGameData((state) => ({
      ...state,
      correctAnswers: [...state.correctAnswers, state.currentWord],
      answerId: id,
      currentSeries,
      longestSeries,
    }));

    playGameSound(correct);
    setIsQuestion(false);
    setIsCorrectAnswer(answer);
  }, [playGameSound, getAnswersSeries]);

  const getIncorrectAnswer = useCallback((id, answer) => {
    setGameData((state) => ({
      ...state,
      incorrectAnswers: [...state.incorrectAnswers, state.currentWord],
      currentSeries: 0,
      answerId: id,
    }));

    playGameSound(error);
    setIsQuestion(false);
    setIsCorrectAnswer(answer);
  }, [playGameSound]);

  const pass = useCallback(() => {
    getIncorrectAnswer(null, false);
  }, [getIncorrectAnswer]);

  const generateWrongAnswersArray = (wordsArr) => {
    let i = 0;
    const answersArr = [];
    const usedNumbers = [];

    while (i < 4) { // magic numbers
      const randomNumber = getRandomNumber(wordsArr.length);

      if (!usedNumbers.includes(randomNumber)) {
        answersArr.push(wordsArr[randomNumber]);
        usedNumbers.push(randomNumber);
        i += 1;
      }
    }

    return answersArr;
  };

  const nextWord = useCallback(() => {
    setIsPreloader(true);

    const {
      words, wrongAnswersData, correctAnswers, incorrectAnswers, longestSeries,
    } = gameData;
    const newCurrentWord = words[0];

    if (!newCurrentWord) {
      showStatistics(correctAnswers, incorrectAnswers, longestSeries);
      return;
    }

    const wrongAnswersArr = generateWrongAnswersArray(wrongAnswersData);
    const answersArr = [...wrongAnswersArr, newCurrentWord];
    shuffleArray(answersArr);

    setGameData((state) => ({
      ...state,
      currentWord: newCurrentWord,
      words: words.slice(1),
      answers: answersArr,
    }));
    setIsQuestion(true);
    setIsPreloader(false);
    playSound(`${MEDIA_URI}${newCurrentWord.audio}`);
  }, [gameData, showStatistics]);

  const getAnswer = ({ target }) => {
    if (!isQuestion) return;

    const { id } = target;
    const answer = id === gameData.currentWord.id;

    if (answer) {
      getCorrectAnswer(id, answer);
      return;
    }

    getIncorrectAnswer(id, answer);
  };

  const getAnswerByKeyboard = useCallback(({ key }) => {
    if (!isQuestion) return;

    const { answers: answersData } = gameData;
    const { id } = answersData[+key - 1]; // refactor ?
    const answer = id === gameData.currentWord.id;

    if (answer) {
      getCorrectAnswer(id, answer);
      return;
    }

    getIncorrectAnswer(id, answer);
  }, [getCorrectAnswer, getIncorrectAnswer, isQuestion, gameData]);

  const keyboardEvents = useCallback((event) => {
    const controls = ['1', '2', '3', '4', '5'];
    const { key } = event;

    if (key === 'Enter' && !isQuestion) {
      nextWord();
    }

    if (key === 'Enter' && isQuestion) {
      pass();
    }

    if (controls.includes(key)) {
      getAnswerByKeyboard(event);
    }
  }, [isQuestion, getAnswerByKeyboard, nextWord, pass]);

  useEffect(() => {
    const startGame = async () => {
      const words = await wordsAPI.getCollectionWords(level, page + 1);
      shuffleArray(words);

      const newCurrentWord = words[0];

      const wrongAnswersData = await getWrongAnswersData();
      const wrongAnswersArr = generateWrongAnswersArray(wrongAnswersData);
      const answersData = [...wrongAnswersArr, newCurrentWord];
      shuffleArray(answers);

      setGameData(() => ({
        words: words.slice(1),
        wrongAnswersData,
        currentWord: newCurrentWord,
        answers: answersData,
        correctAnswers: [],
        incorrectAnswers: [],
        longestSeries: 0,
        currentSeries: 0,
        answerId: undefined,
      }));
      setIsPreloader(false);
      playSound(`${MEDIA_URI}${newCurrentWord.audio}`);
    };

    startGame();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', keyboardEvents);
    return (() => {
      document.removeEventListener('keydown', keyboardEvents);
    });
  }, [gameData, isQuestion, keyboardEvents]);

  if (isPreloader) {
    return <Preloader />;
  }

  return (
    <>
      <div className="gameWrapper">
        <div className="questionBoard">
          {!isQuestion && (
            <img
              className="wordImg"
              src={`${MEDIA_URI}${image}`}
              alt="word illustration"
            />
          )}
          <div className={isQuestion ? 'word-data word-data__question' : 'word-data'}>
            <WordSoundButton onClick={playWordSound} />
            {!isQuestion && <p className="translation">{wordTranslate}</p>}
          </div>
        </div>

        {currentWord && (
          <WordList
            words={answers}
            getAnswer={getAnswer}
            isQuestion={isQuestion}
            answer={isCorrectAnswer}
            currentWordId={currentWord.id}
            answerId={answerId}
          />
        )}

        <button
          className={isQuestion ? 'pass' : 'next'}
          onClick={isQuestion ? pass : nextWord}
          type="button"
        >
          {isQuestion ? 'Pass' : 'Next word'}
        </button>
      </div>
    </>
  );
};

export default GamePage;
