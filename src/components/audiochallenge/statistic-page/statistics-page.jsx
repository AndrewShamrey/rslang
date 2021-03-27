/* eslint-disable jsx-a11y/control-has-associated-label */
import s from './statistics-page.module.css';
// import { Link } from 'react-router-dom';
import playSound from '../utils/playSound';

const List = ({ words, playAudio }) => {
  const wordList = words.map((item) => (
    <li className={s.wordBlock} key={item.id} id={item.id}>
      <p className={s.wordBlockItem}>{item.word}</p>
      <p className={s.wordBlockItem}>{item.wordTranslate}</p>
      <button
        className={s.soundBtn}
        data-audio={item.audio}
        onClick={playAudio}
        type="button"
      />
    </li>
  ));

  return <ul className={s.answersList}>{wordList}</ul>;
};

const StatisticsPage = ({ gameResult, level, showStartPage }) => {
  const playAudio = ({ target }) => {
    const { audio } = target.dataset;
    playSound(`https://raw.githubusercontent.com/yrevtovich/rslang-data/master/${audio}`);
  };

  const { correctAnswers, incorrectAnswers, longestSeries } = gameResult;

  return (
    <div className={s.page}>
      <div className={s.results}>
        <p className={s.header}>Results</p>
        <p className={s.info}>
          Level:
          {level}
          , Amount of words:
          {correctAnswers.length + incorrectAnswers.length}
          , Longest series:
          {longestSeries}
        </p>

        <div className={s.answers}>
          <div className={s.answersBlock}>
            <p className={s.answersTitle}>
              Correct:
              {correctAnswers.length}
            </p>
            <List words={correctAnswers} playAudio={playAudio} />
          </div>

          <div className={s.answersBlock}>
            <p className={s.answersTitle}>
              Incorrect:
              {incorrectAnswers.length}
            </p>
            <List words={incorrectAnswers} playAudio={playAudio} />
          </div>
        </div>

        <div className={s.buttons}>
          <button className={s.btn} onClick={showStartPage} type="button">Play again</button>
          {/* <Link to="/">
              <button className={s.btn} >Return</button>
            </Link> */}
        </div>
      </div>

    </div>
  );
};

export default StatisticsPage;
