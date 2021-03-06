import FetchData from './fetchData';
import { BACK_URL } from './constants';
import getNewLongStatBody from './longStatBody';

const saveLongTermStatistics = (userId, token, result) => {
  const { correctAnswers, incorrectAnswers } = result;
  const wholeData = correctAnswers.length + incorrectAnswers.length;

  const date = new Date();
  const currentDay = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;

  const fetch = new FetchData(BACK_URL);

  fetch.getUsersStats(userId, token)
    .then((statsData) => {
      const body = statsData ? getNewLongStatBody(statsData, wholeData, currentDay) : ({
        learnedWords: wholeData,
        optional: {
          [currentDay]: wholeData,
        },
      });

      fetch.putUsersStats(userId, JSON.stringify(body), token)
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

export default saveLongTermStatistics;
