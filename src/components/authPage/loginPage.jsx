import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPerson, setIsAuthorized } from '../../actions/control';
import { AUTHORIZATION_INFO, BACK_URL } from '../../utils/constants';
import FetchData from '../../utils/fetchData';
import './authPage.css';

const LogInPage = () => {
  const fetchClass = new FetchData(BACK_URL);

  const dispatch = useDispatch();
  const [isOpenPass, togglePass] = useState(false);
  const [warning, setWarning] = useState(false);
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [isActiveSubmit, setActiveSubmit] = useState(true);

  const handleChangeLogin = ({ target: { value } }) => {
    setLogin(value);
    if (warning) {
      setWarning(false);
    }
  };

  const handleChangePass = ({ target: { value } }) => {
    setPass(value);
    if (warning) {
      setWarning(false);
    }
  };

  const toggleVisiblePassword = () => {
    togglePass(!isOpenPass);
  };

  const logInAccount = (e) => {
    e.preventDefault();

    if (!isActiveSubmit) {
      return;
    }

    if (!login || !pass) {
      setWarning(true);
      return;
    }

    setActiveSubmit(false);

    fetchClass.signinPerson(login, pass)
      .then((person) => {
        setActiveSubmit(true);
        dispatch(setCurrentPerson(person));
        dispatch(setIsAuthorized(true));
      })
      .catch(() => {
        setWarning(true);
        setActiveSubmit(true);
      });
  };

  return (
    <form className="form-container" onSubmit={logInAccount}>
      {warning && <div className="warning-error">{AUTHORIZATION_INFO.defaultWarning}</div>}
      <div className="form-field">
        <input
          className="input-text"
          name="login"
          placeholder={AUTHORIZATION_INFO.loginName}
          type="text"
          value={login}
          autoComplete="off"
          onChange={handleChangeLogin}
        />
      </div>
      <div className="form-field">
        <input
          className="input-text input-pass"
          name="pass"
          placeholder={AUTHORIZATION_INFO.passName}
          type={isOpenPass ? 'text' : 'password'}
          value={pass}
          autoComplete="off"
          onChange={handleChangePass}
        />
        <span className="toggle-pass" onClick={toggleVisiblePassword} />
      </div>
      <input
        className="input-sign-in"
        type="submit"
        value={AUTHORIZATION_INFO.login}
        name="login"
      />
    </form>
  );
};

export default LogInPage;
