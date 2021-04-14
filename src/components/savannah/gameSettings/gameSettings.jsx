import { useDispatch, useSelector } from 'react-redux';
import { setSavannahSettings } from '../../../actions/control';
import CloseIconButton from '../../closeIconButton/closeIconButton';
import Backdrop from '../../backdrop/backdrop';
import './gameSettings.scss';

const GameSettings = ({ close }) => {
  const {
    amountOfAnswers,
    wordAudio,
    meaningQuestion,
    exampleQuestion,
  } = useSelector((state) => state.control.savannah);

  const dispatch = useDispatch();

  const rangeInputOnChangeHandler = ({ target }) => {
    const { id, value } = target;
    dispatch(setSavannahSettings({ [id]: value }));
  };

  const checkboxInputOnChangeHandler = ({ target }) => {
    const { id, checked } = target;
    dispatch(setSavannahSettings({ [id]: checked }));
  };

  return (
    <Backdrop>
      <div className="game-settings">
        <CloseIconButton
          additionalClassName="game-settings__close-btn"
          onClick={close}
        />
        <ul>
          <li className="game-settings__item">
            <label htmlFor="amountOfAnswers">
              Количество вариантов ответов
              <input
                className="game-settings__input"
                value={amountOfAnswers}
                type="range"
                min={3}
                max={5}
                id="amountOfAnswers"
                onChange={rangeInputOnChangeHandler}
              />
              <span>{amountOfAnswers}</span>
            </label>
          </li>
          <li className="game-settings__item">
            Показывать подсказки:
            <ul>
              <li className="game-settings__item">
                <label htmlFor="wordAudio">
                  проигрывание аудио файла слова при начале его падения
                  <input
                    className="game-settings__input"
                    checked={wordAudio}
                    type="checkbox"
                    id="wordAudio"
                    onChange={checkboxInputOnChangeHandler}
                  />
                </label>
              </li>
              <li className="game-settings__item">
                <label htmlFor="meaningQuestion">
                  описание значения слова
                  <input
                    className="game-settings__input"
                    checked={meaningQuestion}
                    type="checkbox"
                    id="meaningQuestion"
                    onChange={checkboxInputOnChangeHandler}
                  />
                </label>
              </li>
              <li className="game-settings__item">
                <label htmlFor="exampleQuestion">
                  пример использования слова
                  <input
                    className="game-settings__input"
                    checked={exampleQuestion}
                    type="checkbox"
                    id="exampleQuestion"
                    onChange={checkboxInputOnChangeHandler}
                  />
                </label>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </Backdrop>
  );
};

export default GameSettings;
