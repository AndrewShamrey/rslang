import { EMPTY_STATS, GAMES_STATS_COMMON } from '../../utils/content';
import { GAMES } from '../../utils/constants';

const dispatchShortTermStats = () => {
  const {
    audiochallenge, sprint, wordConstructor, savanna,
  } = GAMES;

  const emptyGamesData = [
    { ...GAMES_STATS_COMMON[savanna], ...EMPTY_STATS },
    { ...GAMES_STATS_COMMON[audiochallenge], ...EMPTY_STATS },
    { ...GAMES_STATS_COMMON[wordConstructor], ...EMPTY_STATS },
    { ...GAMES_STATS_COMMON[sprint], ...EMPTY_STATS },
  ];

  const date = new Date().toLocaleDateString();

  const localStorageData = localStorage.team113ShortTermStatistics;
  if (!localStorageData) {
    return {
      gamesData: emptyGamesData,
      shortStats: {
        wordsLearned: 0,
        wordsSuccessful: 0,
      },
    };
  }
  const games = Object.values(GAMES);

  const data = JSON.parse(localStorageData);

  const gamesData = games.map((game) => {
    const thisGame = data[game];
    if (thisGame && thisGame.date === date) {
      return {
        ...GAMES_STATS_COMMON[game],
        series: thisGame.longestSeries,
        words: thisGame.learnedWords.length,
        correct: thisGame.correctAnswers,
        right: Math.round((thisGame.correctAnswers / thisGame.learnedWords.length) * 100),
      };
    }
    return ({
      ...GAMES_STATS_COMMON[game],
      ...EMPTY_STATS,
    });
  });

  const wordsLearned = gamesData.reduce((acc, item) => (item ? item.words + acc : acc), 0);
  const correctOnes = gamesData.reduce((acc, item) => (item ? item.correct + acc : acc), 0);
  const wordsSuccessful = Math.round((correctOnes / wordsLearned) * 100);

  return {
    gamesData,
    shortStats: {
      wordsLearned,
      wordsSuccessful,
    },
  };
};

export default dispatchShortTermStats;
