import React from 'react';
import { Link } from 'react-router-dom';
import audioOn from '../../assets/audioOn.png';
import audioOff from '../../assets/audioOff.png';
import cancel from '../../assets/cancel.png';

const Header = (props) => {
  const {
    timer, volume, score, setVolume,
  } = props;

  return (
    <header className="WordConstructor__play-header">
      <div className="WordConstructor__play-headerTimer">{timer}</div>
      <div className="WordConstructor__play-headerScore">{`score: ${score}`}</div>
      <div className="WordConstructor__play-headerControls">
        <button className="WordConstructor__play-headerControlsVolume" onClick={() => setVolume(!volume)} type="button">
          {volume ? <img src={audioOn} alt="volume" width="30px" /> : <img src={audioOff} alt="volume" width="30px" /> }
        </button>
        <Link className="WordConstructor__play-headerControlsCancel" to={{ pathname: '/wordConstructor/start' }}>
          <img src={cancel} alt="cancel" width="30px" />
        </Link>
      </div>
    </header>
  );
};
export default Header;
