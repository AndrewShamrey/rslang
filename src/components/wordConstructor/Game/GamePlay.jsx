/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Preloader from './components/Preloader';
import Header from './components/Header';
import GameEnd from './GameEnd';
import createObj from '../utils/createObject';
import getRandomNumber from '../../../utils/getRandomNumber';
import addRandomLetters from '../utils/addRandomLetters';
import removeDuplicates from '../utils/removeDuplicates';
import playAudio from '../utils/playAudio';
import heart from '../assets/heart.png';
import startSong from '../../../assets/audio/start.mp3';
import finishSong from '../../../assets/audio/finish.mp3';
import tikTakSong from '../../../assets/audio/tikTak.mp3';
import errorSong from '../../../assets/audio/error.mp3';
import goodSong from '../../../assets/audio/piu.mp3';
import { MEDIA_URI, RSLANG_DATA_URL, LETTERS } from '../../../utils/constants';

const GamePlay = (props) => {
  const isSound = useSelector((state) => state.control.wordConstructor.isSound);

  const {
    isTranscription, isAutoPlay, livesByDefault, winLevelWordCount,
  } = useSelector((state) => state.control.wordConstructor.settings);

  const [isLoading, setIsLoading] = useState(true);
  const [isFinish, setIsFinish] = useState(false);
  const [timer, setTimer] = useState(65);
  const [lives, setLives] = useState(livesByDefault);
  const { location: { aboutProps: { level: propLevel } } } = props;
  const [level, setLevel] = useState(propLevel);
  const [score, setScore] = useState(0);
  const [words, setWords] = useState([]);
  const [wordId, setWordId] = useState(0);
  const [currentWord, setCurrentWord] = useState(null);
  const [currentWordRU, setCurrentWordRU] = useState(null);
  const [currentWordTranscription, setCurrentWordTranscription] = useState(null);
  const [currentWordLetters, setCurrentWordLetters] = useState([]);
  const [wordLetters, setWordLetters] = useState(null);
  const [guessLetters, setGuessLetters] = useState(null);
  const [guessWordIndex, setGuessWordIndex] = useState(0);
  const [goodWords, setGoodWords] = useState([]);
  const [badWords, setBadWords] = useState([]);
  const [wordErrors, setWordErrors] = useState(0);
  const [success, setSuccess] = useState(0);
  const [answerClass, setAnswerClass] = useState('');
  const [arrayOfIndices, setArrayOfIndices] = useState([]);
  const [longestSeries, setLongestSeries] = useState(0);
  const [isSeriesError, setIsSeriesError] = useState(false);
  const [sessionErrorWords, setSessionErrorWords] = useState([]);
  const [sessionLongestSeries, setSessionLongestSeries] = useState(0);

  const intervals = [];
  const width = { width: `${success > 59 ? 100 : ((100 / (winLevelWordCount - 1)) * (success % winLevelWordCount))}%` };

  const playAudioWord = (audio = words[wordId].audio) => {
    if (isSound && audio) playAudio(`${RSLANG_DATA_URL}${audio}`);
  };

  const stopGame = () => {
    setIsFinish(true);
    setTimer(0);
    if (isSound) {
      playAudio(finishSong);
    }
    intervals.forEach(clearInterval);
    intervals.forEach(clearTimeout);
  };

  const tick = () => {
    if (timer === 61 && isSound) {
      playAudio(startSong);
    }
    if (timer === 60 && isSound && isAutoPlay) {
      setTimeout(() => {
        playAudioWord();
      }, 1000);
    }
    if (timer === 0 || lives === 0 || wordId === 119) {
      stopGame();
    }
    if (timer > 0 && !isFinish) setTimer(timer - 1);
  };

  const changeWord = () => {
    const newID = getRandomNumber(arrayOfIndices.length);
    setWordId(arrayOfIndices[newID]);
    setCurrentWord(words[arrayOfIndices[newID]].word);
    setCurrentWordRU(words[arrayOfIndices[newID]].wordTranslate);
    setCurrentWordTranscription(words[arrayOfIndices[newID]].transcription);
    setGuessWordIndex(0);
    setGuessLetters(guessLetters.map(() => ''));
  };

  const setAndRemoveAnswerClass = (isTrueAnswer = true) => {
    if (isSound) playAudio(isTrueAnswer ? goodSong : errorSong);
    setAnswerClass(` WordConstructor__play-main_${isTrueAnswer ? 'good' : 'error'}`);
    setTimeout(() => setAnswerClass(''), 200);
  };

  const changeScore = (id) => {
    if (guessWordIndex + 1 === currentWordLetters.length) {
      setScore(score + 10);
      const i = arrayOfIndices.indexOf(id);
      if (i > -1) {
        setArrayOfIndices([...arrayOfIndices.slice(0, i), ...arrayOfIndices.slice(i + 1)]);
        if (!isSeriesError) setSessionLongestSeries(sessionLongestSeries + 1);
      }
      setGoodWords([...goodWords, words[wordId]]);
      changeWord();
      setSuccess(success + 1);
      if (success > 1 && ((success % winLevelWordCount) === (winLevelWordCount - 1))) {
        if (level < 6) setLevel(level + 1);
      }
    } else {
      setScore(score + 1);
    }
  };

  const checkLetter = (letter) => {
    const index = wordLetters.findIndex((el) => el.a === letter);
    const wordLettersCopy = [...wordLetters];

    if (wordLetters[index]) {
      if (wordLetters[index].n === 1) {
        wordLettersCopy.splice(index, 1);
        setWordLetters(wordLettersCopy);
      } else if (wordLetters[index].n > 1) {
        const newElement = wordLetters.find((el) => el.a === letter);
        newElement.n -= 1;
        wordLettersCopy.splice(index, 1, newElement);
        setWordLetters(wordLettersCopy);
      }
    }
  };

  const checkWord = useCallback((letter) => {
    const id = wordId;

    if (currentWord) {
      if (letter === currentWord[guessWordIndex]) {
        if (guessLetters) {
          const guessLettersArray = guessLetters.map((el, i) => {
            if (i === guessWordIndex) return letter;
            return el;
          });
          setGuessLetters(guessLettersArray);
        }
        setAndRemoveAnswerClass();
        setGuessWordIndex(guessWordIndex + 1);
        changeScore(id);
        checkLetter(letter);
      } else {
        setLives(lives - 1);
        setBadWords([...badWords, words[wordId]]);
        setWordErrors(wordErrors + 1);
        setAndRemoveAnswerClass(false);
        setSessionErrorWords(Array.from(new Set([...sessionErrorWords, currentWord])));
        setIsSeriesError(true);
        setSessionLongestSeries(0);
      }
    }
  }, [
    badWords,
    changeScore,
    checkLetter,
    currentWord,
    guessLetters,
    guessWordIndex, lives, sessionErrorWords, setAndRemoveAnswerClass, wordErrors, wordId, words]);

  const newGame = () => {
    intervals.forEach(clearTimeout);
    if (isSound) playAudio(tikTakSong, true);
    setTimer(65);
    setIsFinish(false);
    setLives(livesByDefault);
    setGuessWordIndex(0);
    setGuessLetters(currentWordLetters.map(() => ''));
    const wordArr = createObj(addRandomLetters([...currentWord], level));
    setWordLetters(wordArr);
    setSessionErrorWords([]);
    setIsSeriesError(false);
  };

  async function fetchData() {
    const random = getRandomNumber(29);
    const results = await Promise.all([
      fetch(`${MEDIA_URI}words?page=${random}&group=${level - 1}`).then((d) => d.json()),
      fetch(`${MEDIA_URI}words?page=${(random + 1) % 29}&group=${level - 1}`).then((d) => d.json()),
      fetch(`${MEDIA_URI}words?page=${(random + 2) % 29}&group=${level - 1}`).then((d) => d.json()),
    ]);
    const data = await results.reduce((acc, cur) => {
      acc = [...acc, ...cur];
      return acc;
    });
    setArrayOfIndices(data.map((el, i) => i));
    await setWords(data);
    await setIsLoading(false);
    if (timer === 65) {
      if (isSound) {
        playAudio(tikTakSong, true);
      }
      tick();
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const keydownHandler = useCallback((e) => {
    if (lives > 0) {
      if (LETTERS.includes(String(e.key).toLowerCase()) || e.key === ' ') {
        checkWord(e.key);
      }
    }
  }, [checkWord, lives]);

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return (() => {
      document.removeEventListener('keydown', keydownHandler);
    });
  }, [currentWord, keydownHandler]);

  useEffect(() => {
    if (sessionLongestSeries > longestSeries) setLongestSeries(sessionLongestSeries);
  }, [longestSeries, sessionLongestSeries]);

  useEffect(() => {
    if (words.length > 0) {
      const index = getRandomNumber(words.length);
      setWordId(index);
      const guard = (words[index].word === currentWord)
        ? words[(index + 1) % words.length]
        : words[index];
      setCurrentWord(guard.word);
      setCurrentWordRU(guard.wordTranslate);
      setCurrentWordTranscription(guard.transcription);
    }
  }, [words]);

  useEffect(() => {
    if (currentWord) {
      const wordArr = createObj(addRandomLetters([...currentWord], level));
      setWordLetters(wordArr);
      setCurrentWordLetters([...currentWord]);
      setIsSeriesError(false);
    }
    if (isSound && isAutoPlay && timer < 60) {
      setTimeout(() => {
        playAudioWord();
      }, 1000);
    }
  }, [currentWord]);

  useEffect(() => {
    if (currentWord) {
      const letters = new Array(currentWordLetters.length).fill('');
      setGuessLetters(letters);
    }
  }, [currentWordLetters]);

  useEffect(() => {
    if (!isFinish) {
      const intervalID = setTimeout(
        () => tick(),
        1000,
      );
      intervals.push(intervalID);
    }
  }, [intervals, isFinish, tick, timer]);

  useEffect(() => {
    if (lives < 1) {
      stopGame();
    }
  }, [lives, stopGame]);

  if (isLoading) return <Preloader />;

  if (timer > 60) {
    return (
      <div className="WordConstructor__play">
        <div className="WordConstructor__play-startTimer">
          {timer % 60}
        </div>
      </div>
    );
  }

  return (
    (isFinish || lives < 1 || timer === 0)
      ? (
        <GameEnd
          score={score}
          level={level}
          newGame={() => { newGame(); }}
          badWords={badWords}
          goodWords={goodWords.filter((el) => !sessionErrorWords.includes(el.word))}
          gameResult={{
            correctAnswers: removeDuplicates(goodWords, 'id'),
            incorrectAnswers: removeDuplicates(badWords, 'id'),
            longestSeries,
          }}
        />
      ) : (
        <div className="WordConstructor__play">
          <Header
            timer={timer}
            score={score}
          />
          <main className={`WordConstructor__play-main${answerClass}`}>
            <div className="WordConstructor__play-mainLives">
              <span>{lives}</span>
              <img className="WordConstructor__play-mainHeart" src={heart} alt="heart" />
            </div>
            <div className="WordConstructor__play-mainPlayWord" onClick={() => playAudioWord()} />
            <div className="WordConstructor__play-mainWord">{currentWordRU}</div>
            <div className="WordConstructor__play-mainWordTranscription">
              {isTranscription ? currentWordTranscription : ''}
            </div>
            <div className="WordConstructor__play-mainWordArr">
              {
                currentWord ? guessLetters.map((el, i) => (
                  <div key={i} className="WordConstructor__play-mainWordArrItem">
                    {el || ''}
                  </div>
                )) : null
              }
            </div>
            <div className="WordConstructor__play-mainWordLetters">
              {
                wordLetters ? wordLetters.map((el, i) => {
                  const letter = el.a;
                  return (
                    <div key={i} className="WordConstructor__play-mainLetter" onClick={() => checkWord(letter)}>
                      {el.a}
                      {el.n > 1 ? <div className="WordConstructor__play-mainLetterNum">{el.n}</div> : ''}
                    </div>
                  );
                }) : ''
              }
            </div>
            <div className="WordConstructor__play-mainLevel">{`Уровень ${level}`}</div>
            <div className="WordConstructor__play-mainSuccess">
              <div className="WordConstructor__play-mainSuccessWidth" style={width} />
            </div>
          </main>
        </div>
      )
  );
};

export default GamePlay;
