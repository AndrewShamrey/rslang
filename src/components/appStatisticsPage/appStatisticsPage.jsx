import './appStatisticsPage.scss';
import LineChart from './modules/LineChart';

const AppStatisticsPage = () => {
  console.log('stats');
  const wordsOnDay = 78;
  const successOnDay = 70;
  const gameData = [{
    css: 'savanna',
    title: 'Саванна',
    series: 4,
    words: 30,
    right: 15,
  },
  {
    css: 'audio-game',
    title: 'Аудиовызов',
    series: 4,
    words: 30,
    right: 15,
  },
  {
    css: 'constructor',
    title: 'Конструктор слов',
    series: 4,
    words: 30,
    right: 15,
  },
  {
    css: 'sprint',
    title: 'Спринт',
    series: 4,
    words: 30,
    right: 15,
  },
  ];

  return (
    <main className="app-stats-page">
      <h1>
        Статистика
      </h1>
      <div className="app-stats-page__short">
        <div className="app-stats-page__short_heading">
          <h2>За сегодня</h2>
          <div className="app-stats-page__short_heading_brief">
            <div className="words">
              Изучено слов:
              <span>
                {wordsOnDay}
              </span>
            </div>
            <div className="percent">
              Правильных ответов:
              <span>
                {` ${successOnDay}%`}
              </span>
            </div>
          </div>
        </div>
        <div className="app-stats-page__short_games">
          {gameData.map((game) => (
            <div className={`game-container ${game.css}`}>
              <div className="game-title">
                <h3>
                  {game.title}
                </h3>
              </div>
              <div className="game-seria item">
                Самая длинная серия:
              </div>
              <div className="game-word item">
                Выучено слов:
              </div>
              <div className="game-percent item">
                Правильных ответов:
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
            За все время
          </h2>
          <div className="app-stats-page__long_heading_brief">
            Всего изучено слов: 3000
          </div>
        </div>
        <LineChart />
      </div>
    </main>
  );
};

export default AppStatisticsPage;
