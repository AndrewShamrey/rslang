import { useSelector } from 'react-redux';
import WordSoundButton from '../wordSoundButton/wordSoundButton';
import playSound from '../utils/playSound';
import { MEDIA_URI } from '../constants';
import './questionBlock.scss';

const QuestionBlock = ({ currentWord = {}, isQuestion }) => {
  const {
    transcriptionQuestion,
    meaningQuestion,
    exampleQuestion,
    transcriptionAnswer,
    meaningAnswer,
    meaningTranslateAnswer,
    exampleAnswer,
    exampleTranslateAnswer,
  } = useSelector((state) => state.control.audiochallenge);

  const { image, word } = currentWord || {};

  const regexp = /(<b>|<\/b>|<i>|<\/i>)/g;

  const playWordSound = () => {
    const { audio } = currentWord;
    playSound(`${MEDIA_URI}${audio}`);
  };

  return (
    <div className="questionBoard">
      {!isQuestion && (
        <img
          className="wordImg"
          src={`${MEDIA_URI}${image}`}
          alt="word illustration"
        />
      )}
      <div className={isQuestion ? 'word-data word-data__question' : 'word-data'}>
        <WordSoundButton onClick={playWordSound} />
        {!isQuestion && <p className="translation">{word}</p>}
      </div>
      {isQuestion && transcriptionQuestion && <p className="translation">{currentWord.transcription}</p>}
      {isQuestion && meaningQuestion && (
        <p className="translation">{currentWord.textMeaning.replaceAll(regexp, '')}</p>
      )}
      {isQuestion && exampleQuestion && <p className="translation">{currentWord.textExample}</p>}
      {!isQuestion && transcriptionAnswer && <p className="translation">{currentWord.transcription}</p>}
      {!isQuestion && meaningAnswer && <p className="translation">{currentWord.textMeaning}</p>}
      {!isQuestion && meaningTranslateAnswer && <p className="translation">{currentWord.textMeaningTranslate}</p>}
      {!isQuestion && exampleAnswer && <p className="translation">{currentWord.textExample}</p>}
      {!isQuestion && exampleTranslateAnswer && <p className="translation">{currentWord.textExampleTranslate}</p>}
    </div>
  );
};

export default QuestionBlock;
