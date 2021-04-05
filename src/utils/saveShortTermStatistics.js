const saveShortTermStatistics = (game, result) => {
  const { longestSeries, correctAnswers, incorrectAnswers } = result;
  const date = new Date().toLocaleDateString();
  let newGameData = {
    date,
    longestSeries,
    correctAnswers: correctAnswers.length,
    incorrectAnswers: incorrectAnswers.length,
    learnedWords: [...correctAnswers, ...incorrectAnswers],
  };

  const localStorageData = localStorage.shortTermStatistics;

  if (!localStorageData) {
    localStorage.shortTermStatistics = JSON.stringify({ [game]: newGameData });
    return;
  }

  const data = JSON.parse(localStorageData);
  const savedData = data[game];

  if (savedData.date === date) {
    newGameData = {
      date,
      longestSeries: (
        savedData.longestSeries > newGameData.longestSeries
          ? savedData.longestSeries : newGameData.longestSeries
      ),
      correctAnswers: savedData.correctAnswers + newGameData.correctAnswers,
      incorrectAnswers: savedData.incorrectAnswers + newGameData.incorrectAnswers,
      learnedWords: [...savedData.learnedWords, ...newGameData.learnedWords],

    };
  }

  localStorage.shortTermStatistics = JSON.stringify({ ...data, [game]: newGameData });
};

export default saveShortTermStatistics;
