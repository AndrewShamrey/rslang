import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import saveShortTermStatistics from '../../utils/saveShortTermStatistics';
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
      <p className="statistics-page__header">Results</p>
      <p className="statistics-page__info">
        Amount of words:
        {correctAnswers.length + incorrectAnswers.length}
        , Longest series:
        {longestSeries}
      </p>

      <div className="statistics-page__answers">
        <div className="statistics-page__answers-block">
          <p className="statistics-page__answers-title">
            Correct:
            {correctAnswers.length}
          </p>
          <StatisticsList words={correctAnswers} />
        </div>

        <div className="statistics-page__answersBlock">
          <p className="statistics-page__answers-title">
            Incorrect:
            {incorrectAnswers.length}
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
          Play again
        </button>
        <Link to="/" className="statistics-page__btn">
          Return
        </Link>
      </div>
    </div>
  );
};

export default StatisticsPage;
