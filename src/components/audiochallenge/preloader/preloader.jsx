import React from 'react';
import s from './preloader.module.css';
import preloader from '../assets/img/preloader.svg';

const Preloader = () => (
  <div className={s.page}>
    <img src={preloader} className={s.preloader} alt="loader" />
  </div>
);

export default Preloader;
