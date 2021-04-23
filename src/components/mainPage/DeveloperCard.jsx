import React from 'react';
import './DeveloperCard.scss';
import defaultPhoto from '../../assets/images/default-photo.jpg';

const CapabilityCard = ({ img = defaultPhoto, name = 'Name', info = 'info' }) => (
  <article className="DeveloperCard">
    <img className="DeveloperCard__image" src={img} alt="UserPhoto" />
    <div className="DeveloperCard__info">
      <h4 className="DeveloperCard__title">{name}</h4>
      <p className="DeveloperCard__text">{info}</p>
    </div>
  </article>
);
export default CapabilityCard;
