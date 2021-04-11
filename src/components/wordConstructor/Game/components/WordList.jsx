import React from 'react';
import imgSound from '../../assets/voice-recognition.png';

const WordList = (props) => {
  const { words, playWord, status } = props;

  return (
    <div className={`WordConstructor__result${status}`}>
      <div className="WordConstructor__resultTitle">
        {`${status === 'Errors' ? 'Ошибки' : 'Знаю'}: ${words.length}`}
      </div>
      {words.map((el, i) => {
        const id = i;
        return (
          <div id={i} key={el.id} className="WordConstructor__resultWordBlock">
            <button className="WordConstructor__resultWordAudio" type="button" id={i} onClick={() => playWord(id)}>
              <img className="WordConstructor__resultWordAudioBtn" src={imgSound} alt="sound" />
            </button>
            <button className="WordConstructor__resultWord" type="button">{el.word}</button>
            <span className="WordConstructor__resultWordTranslate">{` - ${el.wordTranslate}`}</span>
          </div>
        );
      })}
    </div>
  );
};
export default WordList;
