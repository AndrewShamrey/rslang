import { useEffect, useState } from 'react';

const GameTimer = ({ setGameFinished }) => {
  const [counter, setCounter] = useState(60);

  useEffect(() => {
    if (counter <= 0) {
      setGameFinished(true);
    } else {
      setTimeout(() => setCounter(counter - 1), 1000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  return <div className="timer">{counter}</div>;
};
export default GameTimer;
