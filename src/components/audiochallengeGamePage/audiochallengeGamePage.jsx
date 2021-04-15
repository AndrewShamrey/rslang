import {
  useState, useEffect, useCallback, useMemo,
} from 'react';
import { useSelector } from 'react-redux';
import WordList from '../wordList/wordList';
import Preloader from '../preloader/preloader';
import QuestionBlock from '../questionBlock/questionBlock';
import playSound from '../../utils/playSound';
import shuffleArray from '../../utils/shuffleArray';
import WordsAPI from '../../utils/wordsAPI';
import getRandomNumber from '../../utils/getRandomNumber';
import error from '../../assets/audio/error.mp3';
import correct from '../../assets/audio/correct.mp3';
import { BACK_URL, AMOUNT_OF_PAGES } from '../../utils/constants';
import { AUDIOCHALLENGE_GAME_PAGE } from '../../utils/content';

import './audiochallengeGamePage.scss';

const AudiochallengeGamePage = ({ level, page, showStatistics }) => {
  const isSound = useSelector((state) => state.control.audiochallenge.isSound);
  const amountOfAnswers = useSelector((state) => state.control.audiochallenge.amountOfAnswers);

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

  const wordsAPI = useMemo(() => new WordsAPI(), []);

  const { answers, answerId, currentWord } = gameData;

  const playGameSound = useCallback((sound) => {
    if (isSound) {
      playSound(sound);
    }
  }, [isSound]);

  const getWrongAnswersData = useCallback(async () => {
    let i = 0;
    const pages = [];
    const usedPagesNumbers = [page];

    while (i < 2) {
      const randomPage = getRandomNumber(AMOUNT_OF_PAGES);

      if (!usedPagesNumbers.includes(randomPage)) {
        pages.push(wordsAPI.getCollectionWords(level, randomPage));
        usedPagesNumbers.push(randomPage);
        i += 1;
      }
    }

    const responseArr = await Promise.all(pages);

    return responseArr.flat();
  }, [level, page, wordsAPI]);

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

  const pass = useCallback((e) => {
    e?.target?.blur();
    getIncorrectAnswer(null, false);
  }, [getIncorrectAnswer]);

  const generateWrongAnswersArray = useCallback((wordsArr) => {
    let i = 0;
    const answersArr = [];
    const usedNumbers = [];

    while (i < (amountOfAnswers - 1)) {
      const randomNumber = getRandomNumber(wordsArr.length);

      if (!usedNumbers.includes(randomNumber)) {
        answersArr.push(wordsArr[randomNumber]);
        usedNumbers.push(randomNumber);
        i += 1;
      }
    }

    return answersArr;
  }, [amountOfAnswers]);

  const nextWord = useCallback((e) => {
    e?.target?.blur();
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
    const answersArr = shuffleArray([...wrongAnswersArr, newCurrentWord]);

    setGameData((state) => ({
      ...state,
      currentWord: newCurrentWord,
      words: words.slice(1),
      answers: answersArr,
    }));
    setIsQuestion(true);
    setIsPreloader(false);
    playSound(`${BACK_URL}/${newCurrentWord.audio}`);
  }, [gameData, showStatistics, generateWrongAnswersArray]);

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
    const { id } = answersData[+key - 1];
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
      let words = await wordsAPI.getCollectionWords(level, page);
      words = shuffleArray(words);

      const newCurrentWord = words[0];

      const wrongAnswersData = await getWrongAnswersData();
      const wrongAnswersArr = generateWrongAnswersArray(wrongAnswersData);
      const answersData = shuffleArray([...wrongAnswersArr, newCurrentWord]);

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
      playSound(`${BACK_URL}/${newCurrentWord.audio}`);
    };

    startGame();
  }, [generateWrongAnswersArray, getWrongAnswersData, level, page, wordsAPI]);

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
      <div className="game-wrapper">
        <QuestionBlock
          currentWord={currentWord}
          isQuestion={isQuestion}
        />

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
          {isQuestion ? AUDIOCHALLENGE_GAME_PAGE.pass : AUDIOCHALLENGE_GAME_PAGE.nextWord }
        </button>
      </div>
    </>
  );
};

export default AudiochallengeGamePage;
