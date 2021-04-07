/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from 'react';

import './switcher.scss';

const Switcher = ({ isChecked, onChange, id }) => {
  // const [isChecked, setIsChecked] = useState(true);
  // // const [isButtons, setIsButtons] = useState(false);

  // const onChange = () => {
  //   console.log('click');
  //   setIsChecked((state) => !state);
  // };

  console.log();

  return (
    <label
      className="switcher s-success"
      htmlFor={id}
    >
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={onChange}
      />
      <span className="slider round" />
    </label>
  );
};

export default Switcher;
