import React, { useState } from 'react';
import settings from '../../../assets/settings.png';
import './SettingsButton.scss';

const SettingsButton = ({ isOptionsOpen, setIsOptionsOpen }) => (
  <button
    className="WordConstructor__settings-button"
    type="button"
    onClick={() => setIsOptionsOpen(!isOptionsOpen)}
  >
    <img src={settings} alt="settings" />
  </button>
);

export default SettingsButton;
