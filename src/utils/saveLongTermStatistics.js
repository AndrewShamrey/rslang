import FetchData from './fetchData';
import { BACK_URL } from './constants';
import getNewLongStatBody from './longStatBody';

const saveLongTermStatistics = (userId, token, result) => {
  const { correctAnswers, incorrectAnswers } = result;
  const wholeData = correctAnswers.length + incorrectAnswers.length;

  const date = new Date();
  const currentDay = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
  console.log(currentDay);

  const fetch = new FetchData(BACK_URL);

  fetch.getUsersStats(userId, token)
    .then((statsData) => {
      const body = getNewLongStatBody(statsData, wholeData, currentDay);
      console.log(body);

      fetch.putUsersStats(userId, JSON.stringify(body), token)
        .then((r) => console.log(r))
        .catch((error) => console.log(error));
    })
    .catch((error) => {
      // не получается
      fetch._defaultMethod('PUT', 'users', userId, 'statistics', null, null, token)
        .then((statsData) => {
          const body = getNewLongStatBody(statsData, wholeData, currentDay);

          fetch.putUsersStats(userId, JSON.stringify(body), token)
            .then((r) => console.log(r))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    });
};

export default saveLongTermStatistics;
