const getNewLongStatBody = (response, learned, dateString) => {
  const learnedWords = response ? response.learnedWords + learned : learned;
  if (response && dateString in response.optional) {
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
  const optional = response ? {
    ...response.optional,
    [dateString]: learned,
  } : { [dateString]: learned };
  const newBody = {
    learnedWords,
    optional,
  };
  return newBody;
};

export default getNewLongStatBody;
