import React from 'react';
import './CategoryCard.scss';
import difficulty1 from '../../assets/img/difficulty-1.png';
import difficulty2 from '../../assets/img/difficulty-2.png';
import difficulty3 from '../../assets/img/difficulty-3.png';
import difficulty4 from '../../assets/img/difficulty-4.png';
import difficulty5 from '../../assets/img/difficulty-5.png';
import difficulty6 from '../../assets/img/difficulty-6.png';

const images = [difficulty1, difficulty2, difficulty3, difficulty4, difficulty5, difficulty6];

const CategoryCard = ({ number, color }) => (
  <article className="CategoryCard">
    <img className="CategoryCard__image" src={images[number - 1]} alt="Category" />
    <span className="CategoryCard__text" style={{ backgroundColor: color }}>{`Раздел ${number}`}</span>
  </article>
);

export default CategoryCard;
