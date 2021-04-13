import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { switchGameSound } from '../../../../../actions/control';
import audioOn from '../../../assets/audioOn.png';
import audioOff from '../../../assets/audioOff.png';
import './VolumeButton.scss';

const VolumeButton = ({ game }) => {
  const dispatch = useDispatch();
  const isSound = useSelector((state) => state.control[game].isSound);

  const toggleVolume = () => {
    dispatch(switchGameSound(game));
  };

  return (
    <button
      className="WordConstructor__volume-button"
      onClick={toggleVolume}
      type="button"
    >
      <img src={isSound ? audioOn : audioOff} alt="volume" />
    </button>
  );
};

export default VolumeButton;
