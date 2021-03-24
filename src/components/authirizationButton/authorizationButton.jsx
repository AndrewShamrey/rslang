import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { setCurrentPerson, setIsAuthorized } from '../../actions/control';
import { DEFAULT_PHOTO } from '../../utils/constants';
// import { AUTHORIZATION_BTN_MENU } from '../../utils/vocabulary';
import './authorizationButton.scss';

const AuthorizationButton = () => {
  const dispatch = useDispatch();
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const isAuthorized = useSelector((rootState) => rootState.control.isAuthorized);
  // const currentPerson = useSelector((rootState) => rootState.control.currentPerson);
  // const currentLanguage = useSelector((rootState) => rootState.control.applicationLanguage);
  // const btnRef = useRef(null);

  // // const toggleAuthorization = () => {
  // //   dispatch(setIsAuthorized(!isAuthorized));
  // //   dispatch(setCurrentPerson(null));
  // // };

  // const toggleMenu = () => {
  //   setIsMenuOpen(!isMenuOpen);
  // };

  // useEffect(() => {
  //   const closeMenu = ({ target }) => {
  //     const { current } = btnRef;

  //     if (!(target === current || target.parentNode === current)) {
  //       setIsMenuOpen(false);
  //     }
  //   };

  //   window.addEventListener('click', closeMenu);
  //   return () => {
  //     window.removeEventListener('click', closeMenu);
  //   };
  // }, []);

  // return (
  //   <>
  //     <button
  //       ref={btnRef}
  //       className="authorization-btn"
  //       type="button"
  //       onClick={toggleMenu}
  //     >
  //       {isAuthorized && (
  //         <img
  //           className="authorization-btn__image"
  //           src={currentPerson.photo || DEFAULT_PHOTO}
  //           alt="user icon"
  //         />
  //       )}
  //       {!isAuthorized && (
  //         <i className="authorization-btn__icon far fa-user" />
  //       )}
  //     </button>
  //     {isMenuOpen && (
  //       <ul className="authorization-btn__menu">
  //         {isAuthorized && (
  //           <li>
  //             <button
  //               className="authorization-btn__menu-button"
  //               type="button"
  //               onClick={toggleAuthorization}
  //             >
  //               {AUTHORIZATION_BTN_MENU[currentLanguage].signout}
  //             </button>
  //           </li>
  //         )}
  //         {!isAuthorized && (
  //           <>
  //             <li>
  //               <Link className="authorization-btn__menu-item" to="/authorization">
  //                 {AUTHORIZATION_BTN_MENU[currentLanguage].login}
  //               </Link>
  //             </li>
  //             <li>
  //               <Link className="authorization-btn__menu-item" to="/authorization/registration">
  //                 {AUTHORIZATION_BTN_MENU[currentLanguage].signup}
  //               </Link>
  //             </li>
  //           </>
  //         )}
  //       </ul>
  //     )}
  //   </>
  // );
  return (
    <button className="Header__authorization-btn" type="button">
      Регистрация / Вход
    </button>
  );
};

export default AuthorizationButton;
