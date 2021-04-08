import React from 'react';
import { Link } from 'react-router-dom';
import WordList from './components/WordList';
import { rslangDataUrl } from '../utils/constants';
import removeDuplicates from '../utils/removeDuplicates';
import playAudio from '../utils/playAudio';

const GameEnd = (props) => {
  const playAudioWord = (audio) => {
    playAudio(`${rslangDataUrl}${audio}`);
  };

  const {
    score, level, newGame, badWords, goodWords,
  } = props;

  const goodWordsStat = removeDuplicates(goodWords, 'id');
  const badWordsStat = removeDuplicates(badWords, 'id');

  const bad = (id) => {
    playAudioWord(badWords[id].audio);
  };
  const good = (id) => {
    playAudioWord(goodWords[id].audio);
  };

  return (
    <>
      <div className="WordConstructor__play">
        <main className="WordConstructor__result">
          <div className="WordConstructor__resultScore">
            { `Результат: ${score} очков` }
          </div>
          <div className="WordConstructor__resultStatistic">
            <WordList words={badWordsStat} playWord={bad} status="Errors" />
            <WordList words={goodWordsStat} playWord={good} status="Good" />
          </div>

          <div className="WordConstructor__resultControls">
            <Link
              className="WordConstructor__resultControlsContinue"
              to={{
                pathname: '/wordConstructor/game',
                aboutProps: {
                  level,
                },
              }}
              onClick={newGame}
            >
              Продолжить тренеровку
            </Link>
            <Link className="WordConstructor__resultControlsCancel" to={{ pathname: '/wordConstructor/start' }}>
              Стартовая страница
            </Link>
          </div>
        </main>
      </div>

    </>
  );
};

export default GameEnd;
