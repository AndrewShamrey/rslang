import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setVocabluarySettings } from '../../actions/control';
import Backdrop from '../backdrop/backdrop';
import CloseIconButton from '../closeIconButton/closeIconButton';
import Switcher from '../switcher/switcher';
import { VOCABLUARY_SETTINGS } from '../../utils/content';

import './vocabluarySettings.scss';

const VocabluarySettings = ({ close = () => {} }) => {
  const settings = useSelector((state) => state.control.vocabluary.settings);
  const { displayAdditionalButtons, displayTranslations } = settings;

  const [isTranslations, setIsTranslations] = useState(displayTranslations);
  const [isButtons, setIsButtons] = useState(displayAdditionalButtons);

  const dispatch = useDispatch();

  const toggleTranslationSettings = () => {
    setIsTranslations((state) => !state);
  };

  const toggleButtonsDisplaySettings = () => {
    setIsButtons((state) => !state);
  };

  const save = () => {
    dispatch(setVocabluarySettings({
      displayAdditionalButtons: isButtons,
      displayTranslations: isTranslations,
    }));
    close();
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <Backdrop>
      <div className="vocabluary-settings">
        <CloseIconButton
          additionalClassName="vocabluary-settings__close-btn"
          onClick={close}
        />
        <ul className="vocabluary-settings__list">
          <li className="vocabluary-settings__list-item">
            <Switcher
              isChecked={isTranslations}
              onChange={toggleTranslationSettings}
              id="isTranslations"
            />
            <p>{VOCABLUARY_SETTINGS.translations}</p>
          </li>
          <li className="vocabluary-settings__list-item">
            <Switcher
              isChecked={isButtons}
              onChange={toggleButtonsDisplaySettings}
              id="isButtons"
            />
            <p>{VOCABLUARY_SETTINGS.buttons}</p>
          </li>
        </ul>
        <div className="vocabluary-settings__actions">
          <button
            className="vocabluary-settings__button vocabluary-settings__button_cancel"
            type="button"
            onClick={close}
          >
            {VOCABLUARY_SETTINGS.cancel}
          </button>
          <button
            className="vocabluary-settings__button vocabluary-settings__button_save"
            type="button"
            onClick={save}
          >
            {VOCABLUARY_SETTINGS.save}
          </button>
        </div>
      </div>
    </Backdrop>
  );
};

export default VocabluarySettings;
