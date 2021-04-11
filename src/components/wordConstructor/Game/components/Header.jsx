import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Info from './Info';
import Settings from './Settings';
import audioOn from '../../assets/audioOn.png';
import audioOff from '../../assets/audioOff.png';
import cancel from '../../assets/cancel.png';
import settings from '../../assets/settings.png';
import info from '../../assets/info.png';

const Header = (props) => {
  const {
    timer, volume, score, setVolume, isTranscription, setIsTranscription,
    isAutoPlay, setIsAutoPlay, livesByDefault, setLivesByDefault,
  } = props;
  const [infoIsOpen, setInfoIsOpen] = useState(false);
  const [optionsIsOpen, setOptionsIsOpen] = useState(false);
  return (
    <header className="WordConstructor__play-header">
      <div className="WordConstructor__play-headerTimer">{timer}</div>
      <div className="WordConstructor__play-headerScore">{`Очки: ${score}`}</div>
      <div className="WordConstructor__play-headerControls">
        <button className="WordConstructor__play-headerControlsInfo" type="button" onClick={() => setInfoIsOpen(!infoIsOpen)} onMouseLeave={() => setInfoIsOpen(false)}>
          <img src={info} alt="info" />
          <Info infoIsOpen={infoIsOpen} />
        </button>
        <button className="WordConstructor__play-headerControlsSettings" type="button" onClick={() => setOptionsIsOpen(!optionsIsOpen)}>
          <img src={settings} alt="settings" />
        </button>
        <Settings
          optionsIsOpen={optionsIsOpen}
          setOptionsIsOpen={setOptionsIsOpen}
          isTranscription={isTranscription}
          setIsTranscription={setIsTranscription}
          isAutoPlay={isAutoPlay}
          setIsAutoPlay={setIsAutoPlay}
          livesByDefault={livesByDefault}
          setLivesByDefault={setLivesByDefault}
        />
        <button className="WordConstructor__play-headerControlsVolume" onClick={() => setVolume(!volume)} type="button">
          {volume ? <img src={audioOn} alt="volume" /> : <img src={audioOff} alt="volume" /> }
        </button>
        <Link className="WordConstructor__play-headerControlsCancel" to={{ pathname: '/wordConstructor/start' }}>
          <img src={cancel} alt="cancel" />
        </Link>
      </div>
    </header>
  );
};
export default Header;
