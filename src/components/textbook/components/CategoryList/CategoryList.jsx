import React from 'react';
import { Link } from 'react-router-dom';
import CategoryCard from '../CategoryCard/CategoryCard';
import { DIFFICULTY_COUNT_AND_COLORS } from '../../../../utils/constants';
import './CategoryList.scss';

const CategoryList = () => (
  <ul className="Textbook__list">
    {DIFFICULTY_COUNT_AND_COLORS.map((el, index) => (
      <li className="Textbook__item" key={index}>
        <Link to={{ pathname: `/textbook/${el[0]}` }}>
          <CategoryCard number={el[0]} color={el[1]} />
        </Link>
      </li>
    ))}
  </ul>
);

export default CategoryList;
