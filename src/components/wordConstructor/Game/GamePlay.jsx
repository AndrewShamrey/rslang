/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Preloader from '../Preloader';
import GameEnd from './GameEnd';
import createObj from '../utils/createObject';
import randomOf from '../utils/randomOf';
import mix from '../utils/mix';
import heart from '../assets/heart.png';

const GamePlay = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFinish, setIsFinish] = useState(false);
  const [lives, setLives] = useState(5);
  const [score, setScore] = useState(0);
  const [words, setWords] = useState([]);
  // const [currentWordObj, setCurrentWordObj] = useState(null);
  const [currentWord, setCurrentWord] = useState(null);
  const [currentWordRU, setCurrentWordRU] = useState(null);
  const [wordLetters, setWordLetters] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://react-learnwords-example.herokuapp.com/words');
      const data = await response.json();
      console.log('data ', data);
      await setWords(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (words.length > 0) {
      const index = randomOf(words.length);
      setCurrentWord(words[index].word);
      setCurrentWordRU(words[index].wordTranslate);
      console.log('CurrentWord === ', currentWord);
    }
  }, [words]);

  useEffect(() => {
    if (currentWord) {
      const wordArr = createObj([...currentWord]);
      // console.log('wordArr ', wordArr);
      setWordLetters(mix(wordArr));
      console.log('wordLetters ', wordLetters);
    }
  }, [currentWord]);

  return (
    // eslint-disable-next-line no-nested-ternary
    isLoading ? <Preloader /> : (
      (isFinish || lives < 1) ? <GameEnd /> : (
        <div className="WordConstructor__play">
          <header className="WordConstructor__play-header">
            <div className="WordConstructor__play-headerTimer">timer</div>
            <div className="WordConstructor__play-headerScore">{`score: ${score}`}</div>
            <div className="WordConstructor__play-headerControls">controls</div>
          </header>

          <main className="WordConstructor__play-main">
            <div className="WordConstructor__play-mainLives">
              <span>{lives}</span>
              <img src={heart} alt="heart" width="12px" />
            </div>
            <div className="WordConstructor__play-mainPlayWord" />
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
                wordLetters ? wordLetters.map((el, i) => (
                  <div key={i} className="WordConstructor__play-mainLetter">
                    {el.a}
                    {el.n > 1 ? <div className="WordConstructor__play-mainLetterNum">{el.n}</div> : ''}
                  </div>
                )) : ''
              }
            </div>
            <div className="WordConstructor__play-mainSuccess">
              <span>Уровень 1</span>
              <div className="WordConstructor__play-mainSuccessWidth" />
            </div>
          </main>
          {/* <ul>
            {words.map((el, index) => <li key={index}>{el.word}</li>)}
          </ul> */}
        </div>
      )
    )
  );
};

export default GamePlay;
