import React from 'react';
import './CapabilityCard.scss';

const CapabilityCard = ({ img = '', title = 'Title', info = 'info' }) => (
  <article className="CapabilityCard">
    <img className="CapabilityCard__image" src={img} alt="capability" />
    <h3 className="CapabilityCard__title">{title}</h3>
    <p className="CapabilityCard__info">{info}</p>
  </article>
);
export default CapabilityCard;
