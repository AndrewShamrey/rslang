import React from 'react';
import './LevelSelector.scss';

const LevelSelector = (props) => (
  <select
    className="WordConstructor__start-select"
    onChange={(e) => {
      props.setLevel(e.target.value);
    }}
  >
    {[1, 2, 3, 4, 5, 6].map((el) => (
      <option value={el}>{`Уровень ${el}`}</option>
    ))}
  </select>
);

export default LevelSelector;
