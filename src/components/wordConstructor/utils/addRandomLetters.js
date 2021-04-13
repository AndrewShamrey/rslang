import mix from './mix';
import { LETTERS } from '../../../utils/constants';

const addRandomLetters = (arr, level = 1) => {
  const newArr = [];

  if (level > 1) {
    for (let i = 0; i < level - 1; i += 1) {
      const num = Math.floor(Math.random() * Math.floor(26));
      newArr[i] = LETTERS[num];
    }
    return mix(arr.concat(newArr));
  }

  return mix(arr);
};

export default addRandomLetters;
