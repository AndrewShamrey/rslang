import { useDispatch, useSelector } from 'react-redux';
import { setAudiochallengeSettings } from '../../../actions/control';
import CloseIconButton from '../closeIconButton/closeIconButton';
import Backdrop from '../backdrop/backdrop';
import './gameSettings.scss';

const GameSettings = ({ close }) => {
  const {
    amountOfAnswers,
    transcriptionQuestion,
    meaningQuestion,
    exampleQuestion,
    transcriptionAnswer,
    meaningAnswer,
    meaningTranslateAnswer,
    exampleAnswer,
    exampleTranslateAnswer,
  } = useSelector((state) => state.control.audiochallenge);

  const dispatch = useDispatch();

  const rangeInputOnChangeHandler = ({ target }) => {
    const { id, value } = target;
    dispatch(setAudiochallengeSettings({ [id]: value }));
  };

  const checkboxInputOnChangeHandler = ({ target }) => {
    const { id, checked } = target;
    dispatch(setAudiochallengeSettings({ [id]: checked }));
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
                <label htmlFor="transcriptionQuestion">
                  транскрипция
                  <input
                    className="game-settings__input"
                    checked={transcriptionQuestion}
                    type="checkbox"
                    id="transcriptionQuestion"
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
          <li className="game-settings__item">
            Показывать дополнительную информацию о слове после того, как был дан ответ:
            <ul>
              <li className="game-settings__item">
                <label htmlFor="transcriptionAnswer">
                  транскрипция
                  <input
                    className="game-settings__input"
                    checked={transcriptionAnswer}
                    type="checkbox"
                    id="transcriptionAnswer"
                    onChange={checkboxInputOnChangeHandler}
                  />
                </label>
              </li>
              <li className="game-settings__item">
                <label htmlFor="meaningAnswer">
                  описание значения слова
                  <input
                    className="game-settings__input"
                    checked={meaningAnswer}
                    type="checkbox"
                    id="meaningAnswer"
                    onChange={checkboxInputOnChangeHandler}
                  />
                </label>
              </li>
              <li className="game-settings__item">
                <label htmlFor="meaningTranslateAnswer">
                  перевод описания значения слова
                  <input
                    className="game-settings__input"
                    checked={meaningTranslateAnswer}
                    type="checkbox"
                    id="meaningTranslateAnswer"
                    onChange={checkboxInputOnChangeHandler}
                  />
                </label>
              </li>
              <li className="game-settings__item">
                <label htmlFor="exampleAnswer">
                  пример использования слова
                  <input
                    className="game-settings__input"
                    checked={exampleAnswer}
                    type="checkbox"
                    id="exampleAnswer"
                    onChange={checkboxInputOnChangeHandler}
                  />
                </label>
              </li>
              <li className="game-settings__item">
                <label htmlFor="exampleTranslateAnswer">
                  перевод примера использования слова
                  <input
                    className="game-settings__input"
                    checked={exampleTranslateAnswer}
                    type="checkbox"
                    id="exampleTranslateAnswer"
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
