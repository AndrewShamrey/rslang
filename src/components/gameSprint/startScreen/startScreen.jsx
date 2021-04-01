import { useState } from 'react';
import { getWords } from '../functions';
import './startScreen.scss';

const StartScreen = ({
  setGameStarted, setGameLevel, setAllWords, page,
}) => {
  const [selectValue, setSelectValue] = useState(0);
  console.log(selectValue);

  const submitHandler = (e) => {
    e.preventDefault();
    setGameLevel(selectValue);
    getWords(selectValue, page)
      .then((data) => setAllWords(data))
      .catch((error) => console.log(error));
    setGameStarted(true);
  };

  return (
    <div className="start-screen">
      <div className="start-screen__form">
        <form className="start-screen__form_form" onSubmit={submitHandler}>
          <label htmlFor="form-submit" className="select-label">
            Выберите уровень сложности
            <select
              className="select-form"
              name="form-submit"
              value={selectValue + 1}
              onChange={(e) => setSelectValue(+e.target.value - 1)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </label>
          <button className="button-submit" type="submit" onSubmit={submitHandler}>
            Начать игру
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartScreen;
