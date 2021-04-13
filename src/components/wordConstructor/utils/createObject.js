const createObj = (arr) => {
  const newArr = arr;
  const arrObj = [];
  let n = 0;
  while (newArr.length > 0) {
    const i = 0;
    const litter = newArr[i];
    while (newArr.indexOf(litter) !== -1) {
      arrObj[n] = { a: litter, n: arrObj[n] ? arrObj[n].n + 1 : 1 };
      newArr.splice(newArr.indexOf(litter), 1);
    }
    n += 1;
  }
  return arrObj;
};

export default createObj;
