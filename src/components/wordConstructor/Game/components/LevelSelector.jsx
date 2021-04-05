import React from 'react';

const LevelSelector = (props) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label className="WordConstructor__start-select-title">
    Уровень сложности
    <select
      className="WordConstructor__start-select"
      onChange={(e) => {
        props.setLevel(e.target.value);
      }}
    >
      {[1, 2, 3, 4, 5, 6].map((el) => (
        <option value={el}>{el}</option>
      ))}
    </select>
  </label>
);

export default LevelSelector;
