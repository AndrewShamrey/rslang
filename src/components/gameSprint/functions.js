/* eslint-disable no-nested-ternary */
import { AMOUNT_OF_PAGES, BACK_URL, MEDIA_URI } from '../../utils/constants';

const getRandomNumber = (max = AMOUNT_OF_PAGES) => Math.floor(Math.random() * max);

const getWords = async (group = 0, page) => {
  const MAX_PAGE = AMOUNT_OF_PAGES - 1;
  const page1 = page < MAX_PAGE ? page + 1 : page - 1;
  const page2 = page < (MAX_PAGE - 1) ? page + 2
    : (page < MAX_PAGE ? page - 1 : page - 2);

  console.log('page: ', page, 'page1: ', page1, 'page2: ', page2, ' group:', group);

  const urls = [
    `${BACK_URL}words?page=${page}&group=${group}`,
    `${BACK_URL}words?page=${page1}&group=${group}`,
    `${BACK_URL}words?page=${page2}&group=${group}`,
  ];

  const requests = urls.map((url) => fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Credentials': 'true',
    },
  }));

  const content = Promise.all(requests)
    .then((responses) => Promise.all(responses.map((resp) => resp.json())))
    .then((tripleArray) => tripleArray.flat())
    .catch((error) => console.log(error));

  console.log(content);
  return content;
};

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export {
  getWords,
  getRandomNumber,
  shuffleArray,
};
