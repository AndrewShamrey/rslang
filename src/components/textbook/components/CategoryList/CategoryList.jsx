/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Link } from 'react-router-dom';
import CategoryCard from '../CategoryCard/CategoryCard';
import './CategoryList.scss';

const difficultyCount = [1, 2, 3, 4, 5, 6];

const CategoryList = () => (
  <ul className="Textbook__list">
    {difficultyCount.map((el, index) => (
      <li className="Textbook__item" key={index}>
        <Link to={{ pathname: `/textbook/${el}` }}>
          <CategoryCard number={el} />
        </Link>
      </li>
    ))}
  </ul>
);

export default CategoryList;
