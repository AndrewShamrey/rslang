import React from 'react';
import cancel from '../../assets/cancel.png';

const Settings = (props) => {
  const {
    optionsIsOpen, setOptionsIsOpen, isTranscription, setIsTranscription,
    isAutoPlay, setIsAutoPlay, livesByDefault, setLivesByDefault,
  } = props;

  return optionsIsOpen ? (
    <div className="WordConstructor__options">
      <div className="WordConstructor__optionsBox">
        <button
          className="WordConstructor__optionsClose"
          onClick={() => setOptionsIsOpen(false)}
          type="button"
        >
          <img src={cancel} alt="cancel" width="30px" />
        </button>

        <ul className="WordConstructor__optionsList">
          <li>
            <label className="WordConstructor__optionsItem" htmlFor="WordConstructor__lives">
              Количество жизней
              <input
                type="range"
                value={livesByDefault}
                min={3}
                max={7}
                id="WordConstructor__lives"
                onChange={(e) => { setLivesByDefault(e.currentTarget.value); }}
              />
              <span>{livesByDefault}</span>
            </label>
          </li>
          <li>
            <label className="WordConstructor__optionsItem" htmlFor="WordConstructor__transcription">
              Показывать транскрипцию
              <input
                className="game-settings__input"
                checked={isTranscription}
                type="checkbox"
                id="WordConstructor__transcription"
                onChange={() => setIsTranscription(!isTranscription)}
              />
            </label>
          </li>
          <li>
            <label className="WordConstructor__optionsItem" htmlFor="WordConstructor__autoplay">
              Автопроизношение слова
              <input
                className="game-settings__input"
                checked={isAutoPlay}
                type="checkbox"
                id="WordConstructor__autoplay"
                onChange={() => setIsAutoPlay(!isAutoPlay)}
              />
            </label>
          </li>
        </ul>
      </div>
    </div>

  ) : null;
};

export default Settings;
