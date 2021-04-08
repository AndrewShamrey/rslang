/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Preloader from './components/Preloader';
import Header from './components/Header';
import GameEnd from './GameEnd';
import createObj from '../utils/createObject';
import getRandomNumber from '../../../utils/getRandomNumber';
import addRandomLetters from '../utils/addRandomLetters';
import playAudio from '../utils/playAudio';
import heart from '../assets/heart.png';
import startSong from '../../../assets/audio/start.mp3';
import finishSong from '../../../assets/audio/finish.mp3';
import tikTakSong from '../../../assets/audio/tikTak.mp3';
import errorSong from '../../../assets/audio/error.mp3';
import goodSong from '../../../assets/audio/piu.mp3';
import { wordsUrl, rslangDataUrl } from '../utils/constants';

const GamePlay = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFinish, setIsFinish] = useState(false);
  const [timer, setTimer] = useState(65);
  const [volume, setVolume] = useState(true);
  const [livesByDefault, setLivesByDefault] = useState(5);
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
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isTranscription, setIsTranscription] = useState(true);

  const intervals = [];
  const width = { width: `${success > 59 ? 100 : ((100 / 5) * (success % 6))}%` };

  const playAudioWord = (audio = words[wordId].audio) => {
    if (volume) playAudio(`${rslangDataUrl}${audio}`);
  };

  const stopGame = () => {
    setIsFinish(true);
    setTimer(0);
    if (volume) {
      playAudio(finishSong);
    }
    intervals.forEach(clearInterval);
    intervals.forEach(clearTimeout);
  };

  const tick = () => {
    if (timer === 61) {
      if (volume) {
        playAudio(startSong);
      }
    }
    if (timer === 60) {
      if (volume) {
        if (isAutoPlay) {
          setTimeout(() => {
            playAudioWord();
          }, 1000);
        }
      }
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

  const checkWord = (letter) => {
    const id = wordId;

    if (letter === currentWord[guessWordIndex]) {
      if (volume) playAudio(goodSong);
      setGuessLetters(guessLetters.map((el, i) => {
        if (i === guessWordIndex) return letter;
        return el;
      }));

      setAnswerClass(' WordConstructor__play-main_good');
      setTimeout(() => setAnswerClass(''), 200);

      setGuessWordIndex(guessWordIndex + 1);
      if (guessWordIndex + 1 === currentWordLetters.length) {
        setScore(score + 10);
        const i = arrayOfIndices.indexOf(id);
        if (i > -1) {
          setArrayOfIndices([...arrayOfIndices.slice(0, i), ...arrayOfIndices.slice(i + 1)]);
        }
        setGoodWords([...goodWords, words[wordId]]);
        changeWord();
        setSuccess(success + 1);
        if (success > 1 && (success % 6) === 5) {
          if (level < 6) setLevel(level + 1);
        }
      } else {
        setScore(score + 1);
      }
      const index = wordLetters.findIndex((el) => el.a === letter);
      const wordLettersCopy = [...wordLetters];

      if (wordLetters[index].n === 1) {
        wordLettersCopy.splice(index, 1);
        setWordLetters(wordLettersCopy);
      } else if (wordLetters[index].n > 1) {
        const newElement = wordLetters.find((el) => el.a === letter);
        newElement.n -= 1;
        wordLettersCopy.splice(index, 1, newElement);
        setWordLetters(wordLettersCopy);
      }
    } else {
      if (volume) {
        playAudio(errorSong);
      }
      setLives(lives - 1);
      setBadWords([...badWords, words[wordId]]);
      setWordErrors(wordErrors + 1);
      setAnswerClass(' WordConstructor__play-main_error');
      setTimeout(() => setAnswerClass(''), 200);
    }
  };

  const newGame = () => {
    if (volume) {
      playAudio(tikTakSong, true);
    }
    setTimer(65);
    setIsFinish(false);
    setLives(livesByDefault);
    setGuessWordIndex(0);
    setGuessLetters(currentWordLetters.map(() => ''));
    const wordArr = createObj(addRandomLetters([...currentWord], level));
    setWordLetters(wordArr);
  };

  async function fetchData() {
    const url = `${wordsUrl}?page=${getRandomNumber(29)}&group=${level - 1}`;
    const results = await Promise.all([
      fetch(url).then((d) => d.json()),
      fetch(url).then((d) => d.json()),
      fetch(url).then((d) => d.json()),
    ]);
    const data = await results.reduce((acc, cur) => {
      acc = [...acc, ...cur];
      return acc;
    });
    setArrayOfIndices(data.map((el, i) => i));
    await setWords(data);
    await setIsLoading(false);
    if (timer === 65) {
      if (volume) {
        playAudio(tikTakSong, true);
      }
      tick();
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (words.length > 0) {
      const index = getRandomNumber(words.length);
      setWordId(index);
      setCurrentWord(words[index].word);
      setCurrentWordRU(words[index].wordTranslate);
      setCurrentWordTranscription(words[index].transcription);
    }
  }, [words]);

  useEffect(() => {
    if (currentWord) {
      const wordArr = createObj(addRandomLetters([...currentWord], level));
      setWordLetters(wordArr);
      setCurrentWordLetters([...currentWord]);
    }
    if (volume && isAutoPlay && timer < 60) {
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
  }, [timer]);

  useEffect(() => {
    if (lives < 1) {
      stopGame();
    }
  }, [lives]);

  if (timer > 60) {
    return (
      isLoading ? <Preloader /> : (
        <div className="WordConstructor__play">
          <div className="WordConstructor__play-startTimer">
            {timer % 60}
          </div>
        </div>
      )
    );
  }
  return (
    // eslint-disable-next-line no-nested-ternary
    isLoading ? <Preloader /> : (
      (isFinish || lives < 1 || timer === 0)
        ? (
          <GameEnd
            score={score}
            level={level}
            newGame={() => { newGame(); }}
            badWords={badWords}
            goodWords={goodWords}
          />
        ) : (
          <div className="WordConstructor__play">
            <Header
              timer={timer}
              volume={volume}
              score={score}
              setVolume={setVolume}
              isTranscription={isTranscription}
              setIsTranscription={setIsTranscription}
              isAutoPlay={isAutoPlay}
              setIsAutoPlay={setIsAutoPlay}
              livesByDefault={livesByDefault}
              setLivesByDefault={setLivesByDefault}
            />
            <main className={`WordConstructor__play-main${answerClass}`}>
              <div className="WordConstructor__play-mainLives">
                <span>{lives}</span>
                <img src={heart} alt="heart" width="12px" />
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
    )
  );
};

export default GamePlay;
