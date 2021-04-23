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

  const localStorageData = localStorage.team113ShortTermStatistics;

  if (!localStorageData) {
    localStorage.team113ShortTermStatistics = JSON.stringify({ [game]: newGameData });
    return;
  }

  const data = JSON.parse(localStorageData);
  const savedData = data[game];

  if (savedData && savedData.date === date) {
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

  localStorage.team113ShortTermStatistics = JSON.stringify({ ...data, [game]: newGameData });
};

export default saveShortTermStatistics;
