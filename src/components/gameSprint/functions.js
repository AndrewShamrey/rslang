const URL = 'https://react-learnwords-example.herokuapp.com/words';

const getRandomNumber = (min = 0, max = 29) => Math.floor(Math.random() * (max - min + 1)) + min;

const getWords = async (group = 0, page = getRandomNumber()) => {
  console.log('page: ', page, ' group:', group);
  const rawResponse = await fetch(`${URL}?page=${page}&group=${group}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const content = await rawResponse.json();

  // console.log(content);
  return content;
};

export { getWords, getRandomNumber };
