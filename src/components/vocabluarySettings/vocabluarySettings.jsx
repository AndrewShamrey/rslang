import { useState, useEffect } from 'react';

import Backdrop from '../backdrop/backdrop';
import CloseIconButton from '../closeIconButton/closeIconButton';
import Switcher from '../switcher/switcher';
import { VOCABLUARY_SETTINGS } from '../../utils/content';

import './vocabluarySettings.scss';

const VocabluarySettings = ({ close = () => {} }) => {
  const [isTranslations, setIsTranslations] = useState(false);
  const [isButtons, setIsButtons] = useState(false);

  console.log();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    // console.log(document.body.overflow);

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const cancel = () => {
    console.log('cancel');
  };

  const save = () => {
    console.log('save');
  };

  return (
    <Backdrop>
      <div className="vocabluary-settings">
        <CloseIconButton
          additionalClassName="vocabluary-settings__close-btn"
          onClick={close}
        />
        <ul className="vocabluary-settings__list">
          <li className="vocabluary-settings__list-item">
            <Switcher />
            <p>{VOCABLUARY_SETTINGS.translations}</p>
          </li>
          <li className="vocabluary-settings__list-item">
            <Switcher />
            <p>{VOCABLUARY_SETTINGS.buttons}</p>
          </li>
        </ul>
        <div className="vocabluary-settings__actions">
          <button
            className="vocabluary-settings__button"
            type="button"
            onClick={cancel}
          >
            Отмена
          </button>
          <button
            className="vocabluary-settings__button"
            type="button"
            onClick={save}
          >
            Сохранить
          </button>
        </div>
      </div>
    </Backdrop>
  );
};

export default VocabluarySettings;
