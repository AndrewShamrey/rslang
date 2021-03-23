/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, NavLink } from 'react-router-dom';

const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const isAuthorized = true;
  const isAuthorized = useSelector((rootState) => rootState.control.isAuthorized);

  const handleOnClick = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <>
      <span className="Header__item" onClick={handleOnClick} role="menuitem">
        Учебник
      </span>
      {isOpen && (
      <div className="Header__dropdown-content">
        <NavLink to="/textbook/1" className="Header__dropdown-item" onClick={handleOnClick} activeClassName="active">Раздел 1</NavLink>
        <NavLink to="/textbook/2" className="Header__dropdown-item" onClick={handleOnClick} activeClassName="active">Раздел 2</NavLink>
        <NavLink to="/textbook/3" className="Header__dropdown-item" onClick={handleOnClick} activeClassName="active">Раздел 3</NavLink>
        <NavLink to="/textbook/4" className="Header__dropdown-item" onClick={handleOnClick} activeClassName="active">Раздел 4</NavLink>
        <NavLink to="/textbook/5" className="Header__dropdown-item" onClick={handleOnClick} activeClassName="active">Раздел 5</NavLink>
        <NavLink to="/textbook/6" className="Header__dropdown-item" onClick={handleOnClick} activeClassName="active">Раздел 6</NavLink>
        {isAuthorized && (
        <NavLink to="/vocabulary" className="Header__dropdown-item" onClick={handleOnClick} activeClassName="active">Словарь</NavLink>
        )}
      </div>
      )}
    </>
  );
};
export default DropDown;
