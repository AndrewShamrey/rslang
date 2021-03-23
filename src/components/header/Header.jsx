import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, NavLink } from 'react-router-dom';
import AuthorizationButton from '../authirizationButton/authorizationButton';
import DropDown from './DropDown';
import './Header.scss';

export default function Header() {
  const isAuthorized = useSelector((rootState) => rootState.control.isAuthorized);

  const { pathname } = useLocation();
  const isTextbookPage = pathname.includes('/textbook');

  return (
    <header className="Header">
      <NavLink to="/" className="Header__logo">
        <h1>RS Lang logo</h1>
      </NavLink>

      <ul className="Header__list">
        <li className={`Header__dropdown${isTextbookPage ? ' active' : ''}`}>
          <DropDown />
        </li>
        <li><NavLink to="/savannah" className="Header__item" activeClassName="active">Саванна</NavLink></li>
        <li><NavLink to="/audiocall" className="Header__item" activeClassName="active">Аудиовызов</NavLink></li>
        <li><NavLink to="/sprint" className="Header__item" activeClassName="active">Спринт</NavLink></li>
        <li><NavLink to="/wordconstructor" className="Header__item" activeClassName="active">Конструктор слов</NavLink></li>
        <li><NavLink to="/statistics" className="Header__item" activeClassName="active">Статистика</NavLink></li>
      </ul>

      <AuthorizationButton />
    </header>
  );
}
