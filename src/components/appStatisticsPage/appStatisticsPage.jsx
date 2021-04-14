import { useDispatch, useSelector } from 'react-redux';
import { STATISTICS_PAGE } from '../../utils/content';
import dispatchShortTermStats from './dispatchShortTermStats';
import './appStatisticsPage.scss';
import LineChart from './modules/LineChart';

const AppStatisticsPage = () => {
  const isAuthorized = useSelector((rootState) => rootState.control.isAuthorized);

  const getData = dispatchShortTermStats();
  const { gamesData: gameData, shortStats } = getData;
  const wordsOnDay = shortStats.wordsLearned;
  const successOnDay = shortStats.wordsSuccessful;

  return (
    <main className="app-stats-page">
      <h1>
        {STATISTICS_PAGE.title}
      </h1>
      <div className="app-stats-page__short">
        <div className="app-stats-page__short_heading">
          <h2>
            {STATISTICS_PAGE.shortHeader}
          </h2>
          <div className="app-stats-page__short_heading_brief">
            <div className="words">
              {`${STATISTICS_PAGE.wordsLearned}: ${wordsOnDay}`}
            </div>
            <div className="percent">
              {`${STATISTICS_PAGE.rightsPercent}: ${successOnDay}%`}
            </div>
          </div>
        </div>
        <div className="app-stats-page__short_games">
          {gameData.map((game) => (
            <div key={game.id} className={`game-container ${game.css}`}>
              <div className="game-title">
                <h3>
                  {game.title}
                </h3>
              </div>
              <div className="game-seria item">
                {STATISTICS_PAGE.longestSeries}
              </div>
              <div className="game-word item">
                {STATISTICS_PAGE.wordsLearned}
              </div>
              <div className="game-percent item">
                {STATISTICS_PAGE.rightsPercent}
              </div>
              <div className="data-seria item">
                {game.series}
              </div>
              <div className="data-word item">
                {game.words}
              </div>
              <div className="data-percent item">
                {`${(game.right / game.words) * 100}%`}
              </div>
            </div>
          ))}
        </div>
      </div>
      {isAuthorized
        ? <LineChart />
        : <h2 className="app-stats-page__login-message">Войдите для получения долгосрочной статистики</h2>}
    </main>
  );
};

export default AppStatisticsPage;
