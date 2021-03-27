/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-shadow */
import React, { useState, useEffect, useCallback } from 'react';
import WordList from '../word-list/word-list';
import Preloader from '../preloader/preloader';
import playSound from '../utils/playSound';
import shuffleArray from '../utils/shuffleArray';
import WordsAPI from '../services/wordsAPI';
import getRandomNumber from '../utils/getRandomNumber';
import error from '../assets/audio/error.mp3';
import correct from '../assets/audio/correct.mp3';

import s from './game-page.module.css';

const wordsAPI = new WordsAPI();

const GamePage = ({
  level, page, showStatistics, closeGame,
}) => {
  const [isQuestion, setIsQuestion] = useState(true);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(true);
  const [isPreloader, setIsPreloader] = useState(true);
  const [isSound, setIsSound] = useState(true);
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
    playSound(`https://raw.githubusercontent.com/yrevtovich/rslang-data/master/${audio}`);
  }, [gameData.currentWord]);

  const switchSound = () => {
    setIsSound((state) => !state);
  };

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
    const answers = [];
    const usedNumbers = [];

    while (i < 4) { // magic numbers
      const randomNumber = getRandomNumber(wordsArr.length);

      if (!usedNumbers.includes(randomNumber)) {
        answers.push(wordsArr[randomNumber]);
        usedNumbers.push(randomNumber);
        i += 1;
      }
    }

    return answers;
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
    playSound(`https://raw.githubusercontent.com/yrevtovich/rslang-data/master/${newCurrentWord.audio}`);
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

    const { answers } = gameData;
    const { id } = answers[+key - 1]; // refactor ?
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

      const currentWord = words[0];

      const wrongAnswersData = await getWrongAnswersData();
      const wrongAnswersArr = generateWrongAnswersArray(wrongAnswersData);
      const answers = [...wrongAnswersArr, currentWord];
      shuffleArray(answers);

      setGameData(() => ({
        words: words.slice(1),
        wrongAnswersData,
        currentWord,
        answers,
        correctAnswers: [],
        incorrectAnswers: [],
        longestSeries: 0,
        currentSeries: 0,
        answerId: undefined,
      }));
      setIsPreloader(false);
      playSound(`https://raw.githubusercontent.com/yrevtovich/rslang-data/master/${currentWord.audio}`);
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
    return (
      <div className={s.page}>
        <Preloader />
      </div>
    );
  }

  return (
    <div className={s.page}>
      <button className={s.cancel} onClick={closeGame} type="button" />
      <button
        className={isSound ? s.sound : `${s.sound} ${s.soundOff}`}
        onClick={switchSound}
        type="button"
      />
      <div className={s.gameWrapper}>
        <div className={s.questionBoard}>
          <img
            className={isQuestion ? s.hidden : s.wordImg}
            src={`https://raw.githubusercontent.com/yrevtovich/rslang-data/master/${image}`}
            alt="word illustration"
          />
          <div className={s.wordData}>
            <button
              className={isQuestion ? `${s.wordSound} ${s.wordSoundQuestion}` : s.wordSound}
              onClick={playWordSound}
              type="button"
            />
            <p className={isQuestion ? s.hidden : s.translation}>{wordTranslate}</p>
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
          className={isQuestion ? s.pass : s.next}
          onClick={isQuestion ? pass : nextWord}
          type="button"
        >
          {isQuestion ? 'Pass' : 'Next word'}
        </button>
      </div>
    </div>
  );
};

export default GamePage;
