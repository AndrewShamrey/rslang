import { useEffect, useState } from 'react';

const GameTimer = ({ setGameFinished, addTime }) => {
  const [counter, setCounter] = useState(60);
  const redAlert = counter <= 5 ? 'red' : '';

  useEffect(() => {
    let timer;
    if (counter <= 0) {
      setGameFinished(true);
    } else {
      timer = setTimeout(() => setCounter(counter - 1), 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [counter, setGameFinished]);

  useEffect(() => {
    if (addTime > 0) {
      setCounter((time) => time + addTime);
    }
  }, [addTime]);

  return <div className={`timer ${redAlert}`}>{counter}</div>;
};
export default GameTimer;
