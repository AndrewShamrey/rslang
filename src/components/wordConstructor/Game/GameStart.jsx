import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import VolumeButton from './components/VolumeButton/VolumeButton';
import LevelSelector from './components/LevelSelector/LevelSelector';
import '../../../sass/defaultComponentsStyles.scss';
import Settings from './components/Settings';
import SettingsButton from './components/SettingsButton/SettingsButton';

const GameStart = () => {
  const [level, setLevel] = useState(1);
  const [optionsIsOpen, setOptionsIsOpen] = useState(false);

  return (
    <main className="WordConstructor__start">
      <div className="WordConstructor__start-volume">
        <VolumeButton game="wordConstructor" />
      </div>
      <div className="WordConstructor__start-settings">
        <SettingsButton isOptionsOpen={optionsIsOpen} setIsOptionsOpen={setOptionsIsOpen} />
        <Settings
          optionsIsOpen={optionsIsOpen}
          setOptionsIsOpen={() => setOptionsIsOpen(!optionsIsOpen)}
        />
      </div>
      <h2 className="WordConstructor__start-title">Конструктор слов</h2>
      <h3 className="WordConstructor__start-slogan">Составление оригинального слова по переводу</h3>
      <LevelSelector setLevel={setLevel} />
      <Link
        className="WordConstructor__start-button"
        to={{
          pathname: '/wordConstructor/game',
          aboutProps: {
            level,
          },
        }}
        role="button"
      >
        Начать
      </Link>
    </main>
  );
};

export default GameStart;
