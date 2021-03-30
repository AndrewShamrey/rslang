import { useEffect, useState } from 'react';

const GameTimer = () => {
  const [counter, setCounter] = useState(60);

  useEffect(() => {
    if (counter <= 0) return;
    setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  return <div className="timer">{counter}</div>;
};
export default GameTimer;
