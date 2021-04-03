/* eslint-disable no-nested-ternary */
import React from 'react';
import spinner from './assets/spinner.svg';
import spinnerRainbow from './assets/spinner-rainbow.svg';
import spinnerGreen from './assets/spinner-green.svg';

const Preloader = (props) => {
  const { type } = props;
  return (
    <div className="WordConstructor__play">
      <img src={type === 'rainbow' ? spinnerRainbow : type === 'green' ? spinnerGreen : spinner} alt="spinner" />
    </div>
  );
};
export default Preloader;
