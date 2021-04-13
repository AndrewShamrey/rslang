import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Info from './Info';
import VolumeButton from './VolumeButton/VolumeButton';
import cancel from '../../assets/cancel.png';
import info from '../../assets/info.png';

const Header = (props) => {
  const { timer, score } = props;
  const [infoIsOpen, setInfoIsOpen] = useState(false);

  return (
    <header className="WordConstructor__play-header">
      <div className="WordConstructor__play-headerTimer">{timer}</div>
      <div className="WordConstructor__play-headerScore">{`Очки: ${score}`}</div>
      <div className="WordConstructor__play-headerControls">
        <button className="WordConstructor__play-headerControlsInfo" type="button" onClick={() => setInfoIsOpen(!infoIsOpen)} onMouseLeave={() => setInfoIsOpen(false)}>
          <img src={info} alt="info" />
          <Info infoIsOpen={infoIsOpen} />
        </button>
        <VolumeButton game="wordConstructor" />
        <Link className="WordConstructor__play-headerControlsCancel" to={{ pathname: '/wordConstructor/start' }}>
          <img src={cancel} alt="cancel" />
        </Link>
      </div>
    </header>
  );
};
export default Header;
