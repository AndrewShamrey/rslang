import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LevelSelector from './components/LevelSelector/LevelSelector';
import '../../../sass/defaultComponentsStyles.scss';

const GameStart = () => {
  const [level, setLevel] = useState(1);

  return (
    <main className="WordConstructor__start">
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
