import { useSelector } from 'react-redux';
import WordSoundButton from '../wordSoundButton/wordSoundButton';
import playSound from '../../utils/playSound';
import { MEDIA_URI, HTML_TAGS_REGEXP } from '../../utils/constants';
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

  const playWordSound = () => {
    const { audio } = currentWord;
    playSound(`${MEDIA_URI}${audio}`);
  };

  return (
    <div className="question-board">
      {!isQuestion && (
        <img
          className="question-board__img"
          src={`${MEDIA_URI}${image}`}
          alt="word illustration"
        />
      )}
      <div className={isQuestion ? 'word-data word-data__question' : 'word-data'}>
        <WordSoundButton onClick={playWordSound} />
        {!isQuestion && <p className="translation">{word}</p>}
      </div>
      {
        ((isQuestion && transcriptionQuestion) || (!isQuestion && transcriptionAnswer))
          && <p className="translation">{currentWord.transcription}</p>
      }
      <div className="help">
        {
          ((isQuestion && meaningQuestion) || (!isQuestion && meaningAnswer)) && (
            <p>{currentWord.textMeaning.replaceAll(HTML_TAGS_REGEXP, '')}</p>
          )
        }
        {
          !isQuestion && meaningTranslateAnswer
            && <p>{currentWord.textMeaningTranslate}</p>
        }
      </div>
      <div className="help">
        {
          ((isQuestion && exampleQuestion) || (!isQuestion && exampleAnswer))
            && <p>{currentWord.textExample.replaceAll(HTML_TAGS_REGEXP, '')}</p>
        }
        {
          !isQuestion && exampleTranslateAnswer
            && <p>{currentWord.textExampleTranslate}</p>
        }
      </div>
    </div>
  );
};

export default QuestionBlock;
