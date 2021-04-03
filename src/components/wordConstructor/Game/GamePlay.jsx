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
import errorSong from '../assets/audio/error.mp3';
import goodSong from '../assets/audio/good.mp3';
import { wordsUrl, rslangDataUrl, dataFake } from '../utils/constants';

const GamePlay = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFinish, setIsFinish] = useState(false);
  const [timer, setTimer] = useState(65);
  const [volume, setVolume] = useState(true);
  const [lives, setLives] = useState(5);
  // eslint-disable-next-line react/destructuring-assignment
  const [level, setLevel] = useState(props.location.aboutProps.level);
  const [score, setScore] = useState(100);
  const [words, setWords] = useState([]);
  const [wordId, setWordId] = useState(0); //
  const [currentWord, setCurrentWord] = useState(null);
  const [currentWordRU, setCurrentWordRU] = useState(null);
  const [currentWordLetters, setCurrentWordLetters] = useState([]);
  const [wordLetters, setWordLetters] = useState(null);
  const [goodWord, setGoodWord] = useState([]);
  const [badWord, setBadWord] = useState([]);
  const [wordErrors, setWordErrors] = useState(0);
  const [success, setSuccess] = useState(0);
  const [answerClass, setAnswerClass] = useState('');

  const intervals = [];
  const width = { width: `${success > 29 ? 100 : ((100 / 5) * (success % 6))}%` };

  // --------------------------------------------------------------------

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
    console.log('timer ', timer);
    // console.log('lives ', lives);
    console.log('intervals ', intervals);

    if (timer === 61) {
      if (volume) {
        playAudio(startSong);
      }
    }
    if (timer === 0 || lives === 0 || wordId === 79) {
      stopGame();
      // if (volume) {
      //   playAudio(finishSong);
      // }
      // intervals.forEach(clearInterval);
      // intervals.forEach((el) => {
      //   console.log('el ', el);
      //   clearTimeout(el);
      // });
      // eslint-disable-next-line max-len
      // updateUserMiniStatistic(wordConstructor, this.state.goodWord.length, this.state.bestGoodWordsScore);
    }
    if (timer > 0 && !isFinish) setTimer(timer - 1);
  };

  const checkWord = (letter) => {
    const id = wordId;
    console.log('const id = wordId ', id);
    console.log('currentWord ', currentWord);
    console.log('currentWordLetters ', currentWordLetters);
    console.log(letter);

    if (id === 1) {
      playAudio(goodSong);
      setAnswerClass(' WordConstructor__play-main_good');
      setTimeout(() => setAnswerClass(''), 200);
    } else {
      if (volume) {
        playAudio(errorSong);
      }
      setLives(lives - 1);
      setWordErrors(wordErrors + 1);
      setAnswerClass(' WordConstructor__play-main_error');
      setTimeout(() => setAnswerClass(''), 200);
    }
  };

  // --------------------------------------------------------------------
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${wordsUrl}?page=${level - 1}`);
      const data = await response.json();
      console.log('data ', data);
      await setWords(data);
      await setIsLoading(false);
      if (timer === 65) {
        if (volume) {
          playAudio(tikTakSong, true);
        }
        tick();
      }
    }
    fetchData();
    console.log('useEffect[]');
    // setWords(dataFake);
    // setIsLoading(false);
  }, []);

  useEffect(() => {
    if (words.length > 0) {
      const index = randomOf(words.length); // Случайное слово!!!
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
      setCurrentWordLetters([...currentWord]);
      console.log('wordLetters ', wordLetters);
    }
  }, [currentWord]);

  useEffect(() => {
    if (!isFinish) {
      const intervalID = setTimeout(
        () => tick(),
        1000,
      );
      intervals.push(intervalID);
    }
    // console.log('intervals ', intervals);
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
      (isFinish || lives < 1 || timer === 0) ? <GameEnd /> : (
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

          <main className={`WordConstructor__play-main${answerClass}`}>
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
