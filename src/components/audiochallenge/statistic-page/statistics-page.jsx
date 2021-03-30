/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';
import StatisticsList from '../statisticsList/statisticsList';

import s from './statistics-page.module.css';

const StatisticsPage = ({ gameResult, level, showStartPage }) => {
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
            <StatisticsList words={correctAnswers} />
          </div>

          <div className={s.answersBlock}>
            <p className={s.answersTitle}>
              Incorrect:
              {incorrectAnswers.length}
            </p>
            <StatisticsList words={incorrectAnswers} />
          </div>
        </div>

        <div className={s.buttons}>
          <button className={s.btn} onClick={showStartPage} type="button">Play again</button>
          <Link to="/" className={s.btn}>
            Return
          </Link>
        </div>
      </div>

    </div>
  );
};

export default StatisticsPage;
