import { useSelector } from 'react-redux';
import { HTML_TAGS_REGEXP } from '../../../utils/constants';
import './helperBlock.scss';

const QuestionBlock = ({ currentWord = {} }) => {
  const { meaningQuestion, exampleQuestion } = useSelector((state) => state.control.savannah);

  return (
    <div className="helper-board">
      <div className="help">
        {
          (meaningQuestion && (
            <p>{currentWord.textMeaning.replaceAll(HTML_TAGS_REGEXP, '')}</p>
          ))
        }
      </div>
      <div className="help">
        {exampleQuestion && (
          <p>{currentWord.textExample.replaceAll(HTML_TAGS_REGEXP, '')}</p>
        )}
      </div>
    </div>
  );
};

export default QuestionBlock;
