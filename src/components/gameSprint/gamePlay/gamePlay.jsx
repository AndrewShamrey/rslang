import { useEffect, useState } from 'react';
import './gamePlay.scss';

const GamePlay = ({
  workingWords, setWorkingWords, setGameFinished, isGameStarted,
}) => {
  const [stringOfRights, setStringOfRights] = useState(0);
  const [rightAnswers, setRightAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  console.log('start game');
  console.log('words for the game', workingWords);
  console.log('rightAnswers: ', rightAnswers);
  console.log('wrongAnswers: ', wrongAnswers);

  useEffect(() => {
    if (!workingWords.length && isGameStarted) {
      // setGameFinished(true);
      console.log('in the useEffect gamePlay');
      // заходит сюда до того, как приходят слова, и все крашится
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workingWords]);

  const handleAnswer = (e) => {
    const { value } = e.target;
    console.log(value);
    console.log(workingWords[0].isTrue.toString());
    if (value === workingWords[0].isTrue.toString()) {
      setStringOfRights((answer) => answer + 1);
      setRightAnswers((answers) => [...answers, workingWords[0]]);
    } else {
      setStringOfRights(0);
      setWrongAnswers((answers) => [...answers, workingWords[0]]);
    }
    if (workingWords.length) {
      setWorkingWords((words) => words.slice(1));
      console.log('after slice', workingWords);
    }
  };

  return (
    <div className="game-play">
      <div className="game-play__upper">
        <div className="circle" />
      </div>
      <div className="game-play__birds">
        <div className="line" />
        {stringOfRights >= 0 && (
          <div className="bird bird-1" />
        )}
        {stringOfRights >= 3 && (
          <div className="bird bird-2" />
        )}
        {stringOfRights >= 6 && (
          <div className="bird bird-3" />
        )}
        {stringOfRights >= 9 && (
          <div className="bird bird-4" />
        )}
      </div>
      {workingWords.length && (
        <div className="game-play__word">
          {workingWords[0].word}
        </div>
      )}
      {workingWords.length && (
        <div className="game-play__translation">
          {workingWords[0].translation}
        </div>
      )}
      <div className="game-play__buttons">
        <button value="true" type="button" className="right" onClick={handleAnswer}>
          Верно
        </button>
        <button value="false" type="button" className="wrong" onClick={handleAnswer}>
          Неверно
        </button>
      </div>
    </div>
  );
};

export default GamePlay;
