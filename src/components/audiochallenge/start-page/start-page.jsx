import React from 'react';
import s from './start-page.module.css';

const StartPage = ({ startGame, changeLevel }) => (
  // <div className={s.page}>
    <div className={s.about}>
      <h1 className={s.header}>Audiochallenge</h1>
      <p className={s.description}>
        Improves your listening skills in English.
      </p>
      <select className={s.select} onChange={changeLevel}>
        <option value="1">Level 1</option>
        <option value="2">Level 2</option>
        <option value="3">Level 3</option>
        <option value="4">Level 4</option>
        <option value="5">Level 5</option>
        <option value="6">Level 6</option>
      </select>
      <button
        className={s.start}
        onClick={startGame}
        type="button"
      >
        Start
      </button>
    </div>
  // </div>
);

export default StartPage;
