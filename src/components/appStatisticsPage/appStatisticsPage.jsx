import { useCallback } from 'react';
import {
  STATISTICS_PAGE, EMPTY_STATS_SAVANNA, EMPTY_STATS_AUDIOCHALLENGE,
  EMPTY_STATS_CONSTRUCTOR, EMPTY_STATS_SPRINT,
} from '../../utils/content';
import dispatchShortTermStats from './dispatchShortTermStats';
import './appStatisticsPage.scss';

const AppStatisticsPage = () => {
  const wordsOnDay = 78;
  const successOnDay = 70;
  const wordsAll = 3000;
  const getData = dispatchShortTermStats();
  const gameData = getData.length ? getData : [EMPTY_STATS_SAVANNA, EMPTY_STATS_AUDIOCHALLENGE,
    EMPTY_STATS_CONSTRUCTOR, EMPTY_STATS_SPRINT];

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
                {`${game.right}%`}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="app-stats-page__long">
        <div className="app-stats-page__long_heading">
          <h2>
            {STATISTICS_PAGE.longHeader}
          </h2>
          <div className="app-stats-page__long_heading_brief">
            {`${STATISTICS_PAGE.wordsWholeTime}: ${wordsAll}`}
          </div>
        </div>
        <div className="app-stats-page__long_graph1">
          1st picture
        </div>
        <div className="app-stats-page__long_graph2">
          2nd picture
        </div>
      </div>
    </main>
  );
};

export default AppStatisticsPage;
