import React from 'react';
import './SettingsButton.scss';

const SettingsButton = ({ onClick }) => (
  <button
    className="Textbook__settings"
    type="button"
    onClick={() => onClick()}
  >
    <i className="fa fa-cog fa-fw fa-2x" aria-hidden="true" />
  </button>
);

export default SettingsButton;
