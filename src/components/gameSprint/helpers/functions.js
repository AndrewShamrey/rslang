import { AMOUNT_OF_PAGES, BACK_URL } from '../../../utils/constants';

const MIN_PAGE = 0;
const WORDS_PER_PAGE = 20;

const getRandomNumber = (max = AMOUNT_OF_PAGES) => Math.floor(Math.random() * max);

const getPagesURLs = (group = 0, page, isPagesNumRestricted) => {
  let pagesCount = null;
  const pagesArr = [];
  const MAX_PAGE = AMOUNT_OF_PAGES - 1;

  if (isPagesNumRestricted) {
    if (page === MIN_PAGE) {
      pagesArr.push(page);
      pagesCount = WORDS_PER_PAGE;
    } else if ((page - 1) === MIN_PAGE) {
      pagesArr.push(page, page - 1);
      pagesCount = WORDS_PER_PAGE * 2;
    } else {
      pagesArr.push(page, page - 1, page - 2);
    }
  } else if (page === MAX_PAGE) {
    pagesArr.push(page, page - 1, page - 2);
  } else if ((page + 1) === MAX_PAGE) {
    pagesArr.push(page, page + 1, page - 1);
  } else {
    pagesArr.push(page, page + 1, page + 2);
  }

  const pages = pagesArr.reduce((acc, item) => acc.concat(`${BACK_URL}words?page=${item}&group=${group}`), []);
  return { pages, pagesCount };
};

const getWords = async (urls) => {
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

  return content;
};

function shuffleArray(incomingArray) {
  const arr = incomingArray.slice();
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
  getPagesURLs,
};
