import { useState } from 'react';
import { getWords, getPagesURLs } from '../helpers/functions';
import { START_PAGE } from '../../../utils/content';
import './startScreen.scss';

const StartScreen = ({
  setGameStarted, setAllWords, page, setWordsCount, level, isNoSelect,
}) => {
  // console.log(page, level, isNoSelect);
  const [selectValue, setSelectValue] = useState(level);
  const { sprint } = START_PAGE;

  // console.log('level: ', selectValue);

  const submitHandler = (e) => {
    e.preventDefault();
    const pagesForGame = getPagesURLs(selectValue, page, isNoSelect);
    const { pages, pagesCount } = pagesForGame;
    if (pagesCount) setWordsCount(pagesCount);

    // console.log('pagesForGame ', pagesForGame);

    getWords(pages)
      .then((data) => setAllWords(data))
      .catch((error) => console.log(error));
    setGameStarted(true);
  };

  return (
    <div className="start-screen">
      <div className="start-screen__form">
        <h2>
          {sprint.title}
        </h2>
        <p>
          {sprint.descrLine1}
        </p>
        <p>
          {sprint.descrLine2}
        </p>
        <form className="start-screen__form_form" onSubmit={submitHandler}>
          {!isNoSelect && (
            <label htmlFor="form-submit" className="select-label">
              {sprint.selectLabel}
              <select
                className="select-form"
                name="form-submit"
                value={selectValue + 1}
                onChange={(e) => setSelectValue(+e.target.value - 1)}
              >
                <option value="1">
                  {`${START_PAGE.level} 1`}
                </option>
                <option value="2">
                  {`${START_PAGE.level} 2`}
                </option>
                <option value="3">
                  {`${START_PAGE.level} 3`}
                </option>
                <option value="4">
                  {`${START_PAGE.level} 4`}
                </option>
                <option value="5">
                  {`${START_PAGE.level} 5`}
                </option>
                <option value="6">
                  {`${START_PAGE.level} 6`}
                </option>
              </select>
            </label>
          )}
          <button className="button-submit" type="submit" onSubmit={submitHandler}>
            {sprint.start}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartScreen;
