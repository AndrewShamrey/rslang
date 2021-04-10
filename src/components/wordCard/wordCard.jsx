import Backdrop from '../backdrop/backdrop';
import WordSoundButton from '../wordSoundButton/wordSoundButton';
import playSound from '../../utils/playSound';
import { BACK_URL, HTML_TAGS_REGEXP } from '../../utils/constants';
import './wordCard.scss';

const wordCard = () => {
  const wordData = {
    id: '5e9f5ee35eb9e72bc21af4ca',
    group: 0,
    page: 2,
    word: 'chart',
    image: 'files/03_0043.jpg',
    audio: 'files/03_0043.mp3',
    audioMeaning: 'files/03_0043_meaning.mp3',
    audioExample: 'files/03_0043_example.mp3',
    textMeaning: 'A <i>chart</i> is a list of information.',
    textExample: 'We used a <b>chart</b> to see how we had improved.',
    transcription: '[tʃɑːrt]',
    textExampleTranslate: 'Мы использовали график, чтобы увидеть, как мы улучшили',
    textMeaningTranslate: 'Диаграмма - это список информации',
    wordTranslate: 'диаграмма',
  };

  const {
    id,
    group,
    page,
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

  return (
    <Backdrop>
      <div className="word-card">
        <img
          className="word-card__img"
          src={`${BACK_URL}${image}`}
          alt={word}
        />
        <div className="word-card__word-block">
          <p className="word-card__word">{word}</p>
          <WordSoundButton onClick={() => playSound(`${BACK_URL}${audio}`)} />
        </div>
        <p className="word-card__transcription">{transcription}</p>
        <p className="word-card__word-translate">{wordTranslate}</p>
        <div className="word-card__meaning">
          <p className="word-card__meaning-text">{textMeaning.replaceAll(HTML_TAGS_REGEXP, '')}</p>
          <p className="word-card__meaning-translate">{textMeaningTranslate}</p>
        </div>
        <div className="word-card__example">
          <p className="word-card__example-text">{textExample.replaceAll(HTML_TAGS_REGEXP, '')}</p>
          <p className="word-card__example-translate">{textExampleTranslate}</p>
        </div>
        <table cols="6">
          <tr>
            <th>Саванна</th>
            <th>Аудиовызов</th>
            <th>Спринт</th>
            <th>Конструктор слов</th>
            <th>Сложные</th>
            <th>Удалить</th>
          </tr>
          <tr>
            <td>
              {true && <i className="fas fa-check" />}
            </td>
            <td>
              {true && <i className="fas fa-check" />}
            </td>
            <td>
              {true && <i className="fas fa-check" />}
            </td>
            <td>
              {true && <i className="fas fa-check" />}
            </td>
            <td>
              <button
                className="word-card__table-btn word-card__btn-difficult"
                type="button"
                onClick={() => {}} // add to difficult words handler
              >
                <i className="far fa-clock" />
              </button>
            </td>
            <td>
              <button
                className="word-card__table-btn word-card__btn-delete"
                type="button"
                onClick={() => {}} // delete word handler
              >
                <i className="far fa-times-circle" />
              </button>
            </td>
          </tr>
        </table>
        <div className="word-card__controls">
          <button
            className="word-card__control"
            type="button"
            onClick={() => {}} // move to next word handler
          >
            <i className="fas fa-chevron-left" />
            {' '}
            Предыдущее слово
          </button>
          <button
            className="word-card__control"
            type="button"
            onClick={() => {}} // move to next word handler
          >
            Следующее слово
            {' '}
            <i className="fas fa-chevron-right" />
          </button>
        </div>
      </div>
    </Backdrop>
  );
};

export default wordCard;
