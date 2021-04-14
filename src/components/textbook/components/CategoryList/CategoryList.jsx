/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Link } from 'react-router-dom';
import CategoryCard from '../CategoryCard/CategoryCard';
import './CategoryList.scss';

const difficultyCount = [[1, '#9bff00'], [2, '#00cf01'], [3, '#ffe600'], [4, '#ffaa32'], [5, '#ff1e5a'], [6, '#c40050']];

// цвета:
// раздел 1 #9bff00
// раздел 2 #00cf01
// раздел 3 #ffe600
// раздел 4 #ffaa32
// раздел 5 #ff1e5a
// раздел 6 #c40050

const CategoryList = () => (
  <ul className="Textbook__list">
    {difficultyCount.map((el, index) => (
      <li className="Textbook__item" key={index}>
        <Link to={{ pathname: `/textbook/${el[0]}` }}>
          <CategoryCard number={el[0]} color={el[1]} />
        </Link>
      </li>
    ))}
  </ul>
);

export default CategoryList;
