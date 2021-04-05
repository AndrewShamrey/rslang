import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import saveShortTermStatistics from '../../utils/saveShortTermStatistics';
import { RESULT_PAGE } from '../../utils/content';
import StatisticsList from '../statisticsList/statisticsList';

import './statisticsPage.scss';
import '../../sass/defaultComponentsStyles.scss';

const StatisticsPage = ({ gameResult, showStartPage, game }) => {
  const { correctAnswers, incorrectAnswers, longestSeries } = gameResult;

  useEffect(() => {
    saveShortTermStatistics(game, gameResult);
  }, [game, gameResult]);

  return (
    <div className="statistics-page__results">
      <p className="statistics-page__header">{RESULT_PAGE.title}</p>
      <p className="statistics-page__info">
        {`
          ${RESULT_PAGE.amountOfWords}: ${correctAnswers.length + incorrectAnswers.length},
          ${RESULT_PAGE.longestSeries}: ${longestSeries}
        `}
      </p>

      <div className="statistics-page__answers">
        <div className="statistics-page__answers-block">
          <p className="statistics-page__answers-title">
            {`${RESULT_PAGE.correct}: ${correctAnswers.length}`}
          </p>
          <StatisticsList words={correctAnswers} />
        </div>

        <div className="statistics-page__answersBlock">
          <p className="statistics-page__answers-title">
            {`${RESULT_PAGE.incorrect}: ${incorrectAnswers.length}`}
          </p>
          <StatisticsList words={incorrectAnswers} />
        </div>
      </div>

      <div className="statistics-page__buttons">
        <button
          className="statistics-page__btn"
          onClick={showStartPage}
          type="button"
        >
          {RESULT_PAGE.playAgain}
        </button>
        <Link to="/" className="statistics-page__btn">
          {RESULT_PAGE.return}
        </Link>
      </div>
    </div>
  );
};

export default StatisticsPage;
