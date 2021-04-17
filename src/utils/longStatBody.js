const getNewLongStatBody = (response, learned, dateString) => {
  const learnedWords = response.learnedWords + learned;
  if (response.optional && dateString in response.optional) {
    const learnedByDate = response.optional[dateString] + learned;
    const newBody = {
      learnedWords,
      optional: {
        ...response.optional,
        [dateString]: learnedByDate,
      },
    };
    return newBody;
  }
  const newBody = {
    learnedWords,
    optional: {
      ...response.optional,
      [dateString]: learned,
    },
  };
  return newBody;
};

export default getNewLongStatBody;
