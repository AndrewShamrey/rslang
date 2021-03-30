/* eslint-disable no-nested-ternary */
const URL = 'https://react-learnwords-example.herokuapp.com/words';
const MIN_PAGE = 0;
const MAX_PAGE = 29;

// eslint-disable-next-line max-len
const getRandomNumber = (min = MIN_PAGE, max = MAX_PAGE) => Math.floor(Math.random() * (max - min + 1)) + min;

const getWords = async (group = 0, page = getRandomNumber()) => {
  const page1 = page < MAX_PAGE ? page + 1 : page - 1;
  const page2 = page < (MAX_PAGE - 1) ? page + 2
    : (page < MAX_PAGE ? page - 1 : page - 2);

  console.log('page: ', page, 'page1: ', page1, 'page2: ', page2, ' group:', group);

  const urls = [
    `${URL}?page=${page}&group=${group}`,
    `${URL}?page=${page1}&group=${group}`,
    `${URL}?page=${page2}&group=${group}`,
  ];

  const requests = urls.map((url) => fetch(url));

  const content = Promise.all(requests)
    .then((responses) => Promise.all(responses.map((resp) => resp.json())))
    .then((tripleArray) => tripleArray.flat())
    .catch((error) => console.log(error));

  // const rawResponse = await fetch(`${URL}?page=${page}&group=${group}`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  // const content = await rawResponse.json();

  console.log(content);
  return content;
};

export { getWords, getRandomNumber };
