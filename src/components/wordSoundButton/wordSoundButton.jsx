import './wordSoundButton.scss';

const WordSoundButton = ({ onClick }) => (
  <button
    className="word-sound-btn"
    onClick={onClick}
    type="button"
  >
    <i className="fas fa-volume-up" />
  </button>
);

export default WordSoundButton;
