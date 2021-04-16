const getNewLongStatBody = (response, learned, dateString) => {
  const learnedWords = response.learnedWords + learned;
  if (dateString in response.optional) {
    const learnedByDate = response.optional[dateString] + learned;
    const body = {
      ...response,
      learnedWords,
      optional: {
        ...response.optional,
        [dateString]: learnedByDate,
      },
    };
    return body;
  }
  const body = {
    ...response,
    learnedWords,
    optional: {
      ...response.optional,
      [dateString]: learned,
    },
  };
  return body;
};

export default getNewLongStatBody;
