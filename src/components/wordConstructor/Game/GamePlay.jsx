/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Preloader from '../Preloader';
import GameEnd from './GameEnd';
import createObj from '../utils/createObject';
import randomOf from '../utils/randomOf';
import addRandomLetters from '../utils/addRandomLetters';
import playAudio from '../utils/playAudio';
import heart from '../assets/heart.png';
import audioOn from '../assets/audioOn.png';
import audioOff from '../assets/audioOff.png';
import cancel from '../assets/cancel.png';
import startSong from '../assets/audio/start.mp3';
import finishSong from '../assets/audio/finish.mp3';
import tikTakSong from '../assets/audio/tikTak.mp3';
import { wordsUrl, rslangDataUrl, dataFake } from '../utils/constants';

const GamePlay = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFinish, setIsFinish] = useState(false);
  const [timer, setTimer] = useState(64);
  const [volume, setVolume] = useState(true);
  const [lives, setLives] = useState(5);
  // eslint-disable-next-line react/destructuring-assignment
  const [level, setLevel] = useState(props.location.aboutProps.level);
  const [score, setScore] = useState(100);
  // const [intervals, setIntervals] = useState([]); // интервалы для тика 1сек
  const [words, setWords] = useState([]);
  // const [currentWordObj, setCurrentWordObj] = useState(null);
  const [wordId, setWordId] = useState(0);
  const [currentWord, setCurrentWord] = useState(null);
  const [currentWordRU, setCurrentWordRU] = useState(null);
  const [currentWordLetters, setCurrentWordLetters] = useState([]);
  const [wordLetters, setWordLetters] = useState(null);
  const [goodWord, setGoodWord] = useState([]);
  const [badWord, setBadWord] = useState([]);
  const [success, setSuccess] = useState(0);

  const intervals = [];
  const width = { width: `${success > 29 ? 100 : ((100 / 5) * (success % 6))}%` };

  // --------------------------------------------------------------------

  const playAudioWord = (audio = words[wordId].audio) => {
    if (volume) playAudio(`${rslangDataUrl}${audio}`);
  };

  const tick = () => {
    if (timer === 61) {
      if (volume) {
        playAudio(startSong);
      }
    }
    if (timer === 0 || lives === 0 || wordId === 79) {
      if (volume) {
        playAudio(finishSong);
      }
      intervals.forEach(clearInterval);
      // eslint-disable-next-line max-len
      // updateUserMiniStatistic(wordConstructor, this.state.goodWord.length, this.state.bestGoodWordsScore);
    }
    if (timer > 0) setTimer(timer - 1);
  };

  const stopGame = () => {
    setTimer(0);
    // setIsFinish(true);
    intervals.forEach(clearInterval);
  };

  const checkWord = (letter) => {
    console.log(letter);
  };

  // --------------------------------------------------------------------
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${wordsUrl}?page=${level - 1}`);
      const data = await response.json();
      console.log('data ', data);
      await setWords(data);
      setIsLoading(false);
    }
    fetchData();
    // setWords(dataFake);
    // setIsLoading(false);
    if (timer === 64) {
      if (volume) {
        playAudio(tikTakSong);
        tick();
      }
    }
  }, []);

  useEffect(() => {
    if (words.length > 0) {
      const index = randomOf(words.length);
      setWordId(index);
      setCurrentWord(words[index].word);
      setCurrentWordRU(words[index].wordTranslate);
      console.log('CurrentWord === ', currentWord);
    }
  }, [words]);

  useEffect(() => {
    if (currentWord) {
      const wordArr = createObj(addRandomLetters([...currentWord], level));
      // console.log('wordArr ', wordArr);
      // addRandomLetters(wordLetters, level)
      // setWordLetters(mix(wordArr));
      setWordLetters(wordArr);
      console.log('wordLetters ', wordLetters);
    }
  }, [currentWord]);

  useEffect(() => {
    const intervalID = setInterval(
      () => tick(),
      1000,
    );
    intervals.push(intervalID);
  }, [timer]);

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
      (isFinish || lives < 1) ? <GameEnd /> : (
        <div className="WordConstructor__play">
          <header className="WordConstructor__play-header">
            <div className="WordConstructor__play-headerTimer">{timer}</div>
            <div className="WordConstructor__play-headerScore">{`score: ${score}`}</div>
            <div className="WordConstructor__play-headerControls">
              <button className="WordConstructor__play-headerControlsVolume" onClick={() => setVolume(!volume)} type="button">
                {volume ? <img src={audioOn} alt="volume" width="30px" /> : <img src={audioOff} alt="volume" width="30px" /> }
              </button>
              <Link className="WordConstructor__play-headerControlsCancel" to={{ pathname: '/wordConstructor/start' }}>
                <img src={cancel} alt="cancel" width="30px" />
              </Link>
            </div>
          </header>

          <main className="WordConstructor__play-main">
            <div className="WordConstructor__play-mainLives">
              <span>{lives}</span>
              <img src={heart} alt="heart" width="12px" />
            </div>
            <div className="WordConstructor__play-mainPlayWord" onClick={() => playAudioWord()} />
            <div className="WordConstructor__play-mainWord">{currentWordRU}</div>
            <div className="WordConstructor__play-mainWordArr">
              {
                currentWord ? [...currentWord].map((el, i) => (
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
