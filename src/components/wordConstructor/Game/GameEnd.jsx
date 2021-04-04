import React from 'react';
import { Link } from 'react-router-dom';
import playAudio from '../utils/playAudio';
import { rslangDataUrl } from '../utils/constants';
import removeDuplicates from '../utils/removeDuplicates';
import imgSound from '../assets/sound.png';

// const badList = 'badList';
// const goodList = 'goodList';

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

  // const wordCard = (id, list) => {
  //   const word = list === badList ? props.badWord[id] : props.goodWord[id];
  //   props.changeWordCardStatus(word);
  // };

  return (
    <>
      <div className="WordConstructor__play">
        <main className="WordConstructor__result">
          <div className="WordConstructor__resultScore">
            { `Результат: ${score} очков` }
          </div>
          <div className="WordConstructor__resultStatistic">

            <div className="WordConstructor__resultErrors">
              <div className="WordConstructor__resultErrorsBadName">
                {`Ошибки: ${badWordsStat.length}`}
              </div>
              {badWordsStat.map((el, i) => {
                const id = i;
                return (
                  <div id={i} key={el.id} className="WordConstructor__resultWordBlock">
                    <button className="WordConstructor__resultWordAudio" type="button" id={i} onClick={() => bad(id)}>
                      <img src={imgSound} alt="" width="20px" />
                    </button>
                    <button className="WordConstructor__resultWord" type="button">{el.word}</button>
                    <span className="WordConstructor__resultWordTranslate">{` - ${el.wordTranslate}`}</span>
                  </div>
                );
              })}
            </div>

            <div className="WordConstructor__resultGood">
              <div className="WordConstructor__resultGoodName">{`Знаю: ${goodWords.length}`}</div>
              {goodWordsStat.map((el, i) => {
                const id = i;
                return (
                  <div id={i} key={el.id} className="WordConstructor__resultWordBlock">
                    <button className="WordConstructor__resultWordAudio" type="button" id={i} onClick={() => good(id)}>
                      <img src={imgSound} alt="" width="20px" />
                    </button>
                    <button className="WordConstructor__resultWord" type="button">{el.word}</button>
                    <span className="WordConstructor__resultWordTranslate">{` - ${el.wordTranslate}`}</span>
                  </div>
                );
              })}
            </div>

          </div>

          <div className="WordConstructor__resultControls">
            <Link
              className="WordConstructor__resultControlsContinue"
              to={{
                pathname: '/wordConstructor/game',
                aboutProps: {
                  level,
                // userWordList: this.state.UserWordList,
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
