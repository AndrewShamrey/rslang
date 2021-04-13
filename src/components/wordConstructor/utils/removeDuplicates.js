/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const removeDuplicates = (originalArray, prop) => {
  const newArray = [];
  const lookupObject = {};

  for (const i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for (const i in lookupObject) {
    newArray.push(lookupObject[i]);
  }

  return newArray;
};

export default removeDuplicates;
