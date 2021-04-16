import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import WordCard from '../wordCard/wordCard';
import saveShortTermStatistics from '../../utils/saveShortTermStatistics';
import saveLongTermStatistics from '../../utils/saveLongTermStatistics';
import { RESULT_PAGE } from '../../utils/content';
import StatisticsList from '../statisticsList/statisticsList';

import './statisticsPage.scss';
import '../../sass/defaultComponentsStyles.scss';

const StatisticsPage = ({
  gameResult, showStartPage, game, score,
}) => {
  const [word, setWord] = useState(null);
  const { correctAnswers, incorrectAnswers, longestSeries } = gameResult;
  const isAuthorized = useSelector((rootState) => rootState.control.isAuthorized);
  const currentUser = useSelector((rootState) => rootState.control.currentPerson);

  const setWordData = (wordData) => {
    setWord(wordData);
  };

  useEffect(() => {
    if (isAuthorized) {
      const { userId, token } = currentUser;
      console.log(gameResult, isAuthorized, token, userId);
      saveLongTermStatistics(userId, token, gameResult);
    }
  }, [currentUser, gameResult, isAuthorized]);

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
        <span>
          {score && (`, ${RESULT_PAGE.score}: ${score}`)}
        </span>
      </p>

      <div className="statistics-page__answers">
        <div className="statistics-page__answers-block">
          <p className="statistics-page__answers-title">
            {`${RESULT_PAGE.correct}: ${correctAnswers.length}`}
          </p>
          <StatisticsList words={correctAnswers} onItemClick={setWordData} />
        </div>

        <div className="statistics-page__answersBlock">
          <p className="statistics-page__answers-title">
            {`${RESULT_PAGE.incorrect}: ${incorrectAnswers.length}`}
          </p>
          <StatisticsList words={incorrectAnswers} onItemClick={setWordData} />
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
      {word && (
        <WordCard
          wordData={word}
          close={() => setWordData(null)}
          gameStats={false}
          controls={false}
        />
      )}
    </div>
  );
};

export default StatisticsPage;
