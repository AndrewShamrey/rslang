import { useSelector, useDispatch } from 'react-redux';
import { switchGameSound } from '../../actions/control';
import './gameSoundButton.scss';

const GameSoundButton = ({ game }) => {
  const dispatch = useDispatch();
  const isSound = useSelector((state) => state.control[game].isSound);

  const switchSound = () => {
    dispatch(switchGameSound(game));
  };

  return (
    <button
      className={isSound ? 'sound' : 'sound sound__off'}
      onClick={switchSound}
      type="button"
    >
      <i className="fab fa-itunes-note" />
    </button>
  );
};

export default GameSoundButton;
