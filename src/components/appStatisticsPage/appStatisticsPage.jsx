import { STATISTICS_PAGE } from '../../utils/content';
import './appStatisticsPage.scss';

const AppStatisticsPage = () => {
  const wordsOnDay = 78;
  const successOnDay = 70;
  const wordsAll = 3000;

  const gameData = [{
    id: 1,
    css: 'savanna',
    title: STATISTICS_PAGE.savannaName,
    series: 4,
    words: 30,
    right: 15,
  },
  {
    id: 2,
    css: 'audio-game',
    title: STATISTICS_PAGE.audioName,
    series: 4,
    words: 30,
    right: 15,
  },
  {
    id: 3,
    css: 'constructor',
    title: STATISTICS_PAGE.constructorName,
    series: 4,
    words: 30,
    right: 15,
  },
  {
    id: 4,
    css: 'sprint',
    title: STATISTICS_PAGE.sprintName,
    series: 4,
    words: 30,
    right: 15,
  },
  ];

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
