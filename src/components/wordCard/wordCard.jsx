import Backdrop from '../backdrop/backdrop';
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
        <img src="" alt="" />
        <div>
          <p>q</p>
          <button type="button">q</button>
        </div>
        <p>1</p>
        <p>1</p>
        <div>
          <p>2</p>
          <p>2</p>
        </div>
        <div>
          <p>2</p>
          <p>2</p>
        </div>
      </div>
    </Backdrop>
  );
};

export default wordCard;
