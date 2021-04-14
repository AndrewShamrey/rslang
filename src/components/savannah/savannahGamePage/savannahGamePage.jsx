import {
  useState, useEffect, useCallback, useMemo,
} from 'react';
import { useSelector } from 'react-redux';
import WordList from '../../wordList/wordList';
import Preloader from '../../preloader/preloader';
import StarsList from '../starsList/starsList';
import playSound from '../../../utils/playSound';
import CloseIconButton from '../../closeIconButton/closeIconButton';
import HelperBlock from '../helperBlock/helperBlock';
import shuffleArray from '../../../utils/shuffleArray';
import WordsAPI from '../../../utils/wordsAPI';
import getRandomNumber from '../../../utils/getRandomNumber';
import error from '../../../assets/audio/error.mp3';
import correct from '../../../assets/audio/correct.mp3';
import { BACK_URL, AMOUNT_OF_PAGES } from '../../../utils/constants';
// import { SAVANNAH_GAME_PAGE } from '../../../utils/content';

import './savannahGamePage.scss';

const SavannahGamePage = ({
  level, page, showStatistics, closeGame, setBackgroundPosition,
}) => {
  const isSound = useSelector((state) => state.control.audiochallenge.isSound);
  const amountOfAnswers = useSelector((state) => state.control.audiochallenge.amountOfAnswers);
  const wordAudio = useSelector((state) => state.control.audiochallenge.wordAudio);

  const amountOfStars = 5;

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
  const [starsLeft, setStarsLeft] = useState(amountOfStars);
  const [timeoutId, setTimeoutId] = useState(null);
  const [bgStep, setBgStep] = useState(0);

  const wordsAPI = useMemo(() => new WordsAPI(), []);

  const { answers, answerId, currentWord } = gameData;

  const close = () => {
    clearTimeout(timeoutId);
    closeGame();
  };

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

  useEffect(() => {
    const {
      correctAnswers, incorrectAnswers, longestSeries,
    } = gameData;

    if (!starsLeft) {
      clearTimeout(timeoutId);
      showStatistics(correctAnswers, incorrectAnswers, longestSeries);
    }
  }, [gameData, showStatistics, starsLeft, timeoutId]);

  const nextWord = useCallback(() => {
    setIsPreloader(true);

    const {
      words, wrongAnswersData, correctAnswers, incorrectAnswers, longestSeries,
    } = gameData;
    const newCurrentWord = words[0];

    if (!newCurrentWord) {
      clearTimeout(timeoutId);
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
    if (wordAudio) {
      playSound(`${BACK_URL}${newCurrentWord.audio}`);
    }
  }, [gameData, generateWrongAnswersArray, wordAudio, timeoutId, showStatistics]);

  const getCorrectAnswer = useCallback((id, answer) => {
    const [currentSeries, longestSeries] = getAnswersSeries();

    playGameSound(correct);
    setIsQuestion(false);
    setIsCorrectAnswer(answer);

    setGameData((state) => ({
      ...state,
      correctAnswers: [...state.correctAnswers, state.currentWord],
      answerId: id,
      currentSeries,
      longestSeries,
    }));
    setBackgroundPosition((state) => state - bgStep);
    setTimeout(() => nextWord(), 1000);
  }, [getAnswersSeries, playGameSound, setBackgroundPosition, bgStep, nextWord]);

  const getIncorrectAnswer = useCallback(async (id, answer) => {
    playGameSound(error);
    setIsQuestion(false);
    setIsCorrectAnswer(answer);

    setGameData((state) => ({
      ...state,
      incorrectAnswers: [...state.incorrectAnswers, state.currentWord],
      currentSeries: 0,
      answerId: id,
    }));

    if (starsLeft > 0) {
      setStarsLeft((state) => state - 1);
    }

    setTimeout(() => nextWord(), 1000);
  }, [nextWord, playGameSound, starsLeft]);

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
  }, [isQuestion, gameData, getIncorrectAnswer, getCorrectAnswer]);

  const keyboardEvents = useCallback((event) => {
    const controls = ['1', '2', '3', '4', '5'];
    const { key } = event;

    if (controls.includes(key)) {
      getAnswerByKeyboard(event);
    }
  }, [getAnswerByKeyboard]);

  useEffect(() => {
    clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(() => getIncorrectAnswer(null, false), 5000);
    setTimeoutId(newTimeoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWord]);

  useEffect(() => {
    const startGame = async () => {
      const words = await wordsAPI.getCollectionWords(level, page);
      shuffleArray(words);

      const newCurrentWord = words[0];

      const wrongAnswersData = await getWrongAnswersData();
      const wrongAnswersArr = generateWrongAnswersArray(wrongAnswersData);
      const answersData = [...wrongAnswersArr, newCurrentWord];
      shuffleArray(answersData);

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
      setBgStep(Math.floor(100 / words.length));
      setIsPreloader(false);

      if (wordAudio) {
        playSound(`${BACK_URL}${newCurrentWord.audio}`);
      }
    };

    startGame();
  }, [generateWrongAnswersArray, getWrongAnswersData, level, page, wordAudio, wordsAPI]);

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
      <CloseIconButton
        additionalClassName="audiochallenge__close-btn"
        onClick={close}
      />
      <div className="savannah__game-wrapper game-wrapper">
        <StarsList
          amount={amountOfStars}
          starsLeft={starsLeft}
        />
        {isQuestion && <p className="savannah__current-word">{currentWord?.word}</p>}
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
      </div>
      <HelperBlock currentWord={currentWord} />
    </>
  );
};

export default SavannahGamePage;
