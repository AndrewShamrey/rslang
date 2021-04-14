import { useSelector } from 'react-redux';
import Backdrop from '../backdrop/backdrop';
import WordSoundButton from '../wordSoundButton/wordSoundButton';
import WordCardTable from '../wordCardTable/wordCardTable';
import CloseIconButton from '../closeIconButton/closeIconButton';
import playSound from '../../utils/playSound';
import { BACK_URL, HTML_TAGS_REGEXP } from '../../utils/constants';
import { WORD_CARD } from '../../utils/content';
import './wordCard.scss';

const WordCard = ({
  wordData = {},
  showNext = () => {},
  showPreviouse = () => {},
  deleteWord = () => {},
  moveToDifficult = () => {},
  close = () => {},
  gameStats = true,
  controls = true,
}) => {
  const displayTranslations = useSelector((state) => (
    state.control.vocabluary.settings.displayTranslations
  ));

  const {
    word,
    image,
    audio,
    audioMeaning,
    audioExample,
    textMeaning,
    textExample,
    transcription,
    textExampleTranslate,
    textMeaningTranslate,
    wordTranslate,
  } = wordData;

  const playWordData = () => {
    const audioSrcSet = [audio, audioMeaning, audioExample];
    let i = 0;

    const playAudioSet = () => {
      const audiofile = playSound(`${BACK_URL}${audioSrcSet[i]}`);
      i += 1;

      if (i < audioSrcSet.length) {
        audiofile.onended = () => playAudioSet();
      }
    };

    playAudioSet();
  };

  return (
    <Backdrop>
      <div className="word-card">
        <CloseIconButton
          additionalClassName="word-card__btn-close"
          onClick={close}
        />
        <img
          className="word-card__img"
          src={`${BACK_URL}/${image}`}
          alt={word}
        />
        <div className="word-card__word-block">
          <p className="word-card__word">{word}</p>
          <WordSoundButton onClick={playWordData} />
        </div>
        <p className="word-card__transcription">{transcription}</p>
        {displayTranslations && (
          <p className="word-card__word-translate">{wordTranslate}</p>
        )}
        <div className="word-card__meaning">
          <p className="word-card__meaning-text">{textMeaning.replaceAll(HTML_TAGS_REGEXP, '')}</p>
          {displayTranslations && (
            <p className="word-card__meaning-translate">{textMeaningTranslate}</p>
          )}
        </div>
        <div className="word-card__example">
          <p className="word-card__example-text">{textExample.replaceAll(HTML_TAGS_REGEXP, '')}</p>
          {displayTranslations && (
            <p className="word-card__example-translate">{textExampleTranslate}</p>
          )}
        </div>
        {gameStats && (
          <WordCardTable
            deleteWord={deleteWord}
            moveToDifficult={moveToDifficult}
          />
        )}
        {controls && (
          <div className="word-card__controls">
            <button
              className="word-card__control"
              type="button"
              onClick={showPreviouse}
            >
              <i className="fas fa-chevron-left" />
              {` ${WORD_CARD.previoseWord}`}
            </button>
            <button
              className="word-card__control"
              type="button"
              onClick={showNext}
            >
              {`${WORD_CARD.nextWord} `}
              <i className="fas fa-chevron-right" />
            </button>
          </div>
        )}
      </div>
    </Backdrop>
  );
};

export default WordCard;
