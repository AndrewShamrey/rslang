import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setWordConstructorSettings } from '../../../../actions/control';
import cancel from '../../assets/cancel.png';

const Settings = ({ optionsIsOpen, setOptionsIsOpen }) => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.control.wordConstructor.settings);
  const {
    isTranscription, isAutoPlay, livesByDefault, winLevelWordCount,
  } = settings;

  const changeSettings = (newSettings) => {
    dispatch(setWordConstructorSettings(newSettings));
  };

  return optionsIsOpen ? (
    <div className="WordConstructor__options">
      <div className="WordConstructor__optionsBox">
        <button
          className="WordConstructor__optionsClose"
          onClick={() => setOptionsIsOpen(false)}
          type="button"
        >
          <img className="WordConstructor__optionsCloseBtn" src={cancel} alt="cancel" />
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
                onChange={(e) => changeSettings(
                  { ...settings, livesByDefault: e.currentTarget.value },
                )}
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
                onChange={() => changeSettings(
                  { ...settings, isTranscription: !isTranscription },
                )}
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
                onChange={() => changeSettings(
                  { ...settings, isAutoPlay: !isAutoPlay },
                )}
              />
            </label>
          </li>
          <li>
            <label className="WordConstructor__optionsItem" htmlFor="WordConstructor__winLevelWordCount">
              <span>Количество слов для перехода на следующий уровень</span>
              <input
                type="range"
                value={winLevelWordCount}
                min={5}
                max={10}
                id="WordConstructor__winLevelWordCount"
                onChange={(e) => changeSettings(
                  { ...settings, winLevelWordCount: e.currentTarget.value },
                )}
              />
              <span>{winLevelWordCount}</span>
            </label>
          </li>
        </ul>
      </div>
    </div>

  ) : null;
};

export default Settings;
