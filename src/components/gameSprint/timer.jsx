import { useEffect, useState } from 'react';

const GameTimer = ({ setGameFinished }) => {
  const [counter, setCounter] = useState(60);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  return <div className="timer">{counter}</div>;
};
export default GameTimer;
