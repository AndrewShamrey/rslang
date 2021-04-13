import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPerson, setIsAuthorized } from '../../actions/control';
import {
  AUTHORIZATION_INFO, DEFAULT_PHOTO, MAX_IMAGE_SIZE, BACK_URL,
} from '../../utils/constants';
import FetchData from '../../utils/fetchData';
import DeleteIMG from '../../assets/images/error.svg';
import './authPage.css';

const SignInPage = () => {
  const fetchClass = new FetchData(BACK_URL);

  const dispatch = useDispatch();
  const [warningImg, setImgWarning] = useState(false);
  const [imgURL, setImgUrl] = useState(null);
  const [isOpenPass, togglePass] = useState(false);
  const [warning, setWarning] = useState(false);
  const [warningMessage, setMessage] = useState('defaultWarning');
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [isActiveSubmit, setActiveSubmit] = useState(true);

  const setImage = (data) => {
    setImgWarning(false);
    setImgUrl(data);
  };

  const loadFile = ({ target: { files } }) => {
    const reader = new FileReader();
    if (files[0]) {
      reader.readAsDataURL(files[0]);
    }
    reader.onloadend = () => {
      const base64data = reader.result;
      if (files[0].size >= MAX_IMAGE_SIZE) {
        setImgWarning(true);
      } else {
        setImage(base64data);
      }
    };
  };

  const handleChangeName = ({ target: { value } }) => {
    setName(value);
    if (warning) {
      setWarning(false);
      setMessage('defaultWarning');
    }
  };

  const handleChangeLogin = ({ target: { value } }) => {
    setLogin(value);
    if (warning) {
      setWarning(false);
      setMessage('defaultWarning');
    }
  };

  const handleChangePass = ({ target: { value } }) => {
    setPass(value);
    if (warning) {
      setWarning(false);
      setMessage('defaultWarning');
    }
  };

  const toggleVisiblePassword = () => {
    togglePass(!isOpenPass);
  };

  const handlerDeleteImg = () => {
    setImage(null);
  };

  const validatePersonsData = () => {
    if (!isActiveSubmit) {
      return false;
    }

    if (!login || !pass) {
      setWarning(true);
      return false;
    }

    if (pass.length < 8) {
      setMessage('passwordWarning');
      setWarning(true);
      return false;
    }

    return true;
  };

  const signUpAccount = (e) => {
    e.preventDefault();

    console.log('click');
    if (!validatePersonsData()) {
      return;
    }

    console.log('isvalide');
    const newPerson = {
      name, email: login, password: pass, photo: imgURL,
    };

    if (!newPerson.photo) {
      delete newPerson.photo;
    }

    console.log('newuser - ', newPerson);

    fetchClass.postNewPerson(JSON.stringify(newPerson))
      .then((data) => {
        setActiveSubmit(false);

        fetchClass.signinPerson(newPerson.email, newPerson.password)
          .then((person) => {
            dispatch(setCurrentPerson(person));
            dispatch(setIsAuthorized(true));
            setActiveSubmit(true);
          })
          .catch((err) => {
            const message = err.message === 'Failed to fetch' ? 'serverError' : 'defaultWarning';

            setMessage(message);
            setWarning(true);
            setActiveSubmit(true);
          });
      })
      .catch(() => {
        setMessage('nickNameWarning');
        setWarning(true);
        setActiveSubmit(true);
      });
  };

  return (
    <form className="form-container" onSubmit={signUpAccount}>
      {warning && <div className="warning-error">{AUTHORIZATION_INFO[warningMessage]}</div>}
      <div className="form-field">
        <input
          className="input-text"
          name="text"
          placeholder={AUTHORIZATION_INFO.name}
          type="text"
          value={name}
          autoComplete="off"
          onChange={handleChangeName}
        />
      </div>
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
      {warningImg && <div className="warning-error">{AUTHORIZATION_INFO.imageSizeWarning}</div>}
      <div className="form-field photo-field">
        <div className="photo-container">
          <img className="user-photo" src={imgURL || DEFAULT_PHOTO} alt="user" />
          <div className="onhover-img" onClick={handlerDeleteImg}>
            <img src={DeleteIMG} alt="clear-img" />
          </div>
        </div>
        <label className="load-label" htmlFor="avatar">
          {AUTHORIZATION_INFO.uploadPhoto}
          <input
            type="file"
            id="avatar"
            className="file-input"
            onChange={loadFile}
          />
        </label>
      </div>
      <input
        className="input-sign-in"
        type="submit"
        value={AUTHORIZATION_INFO.signup}
        name="signup"
      />
    </form>
  );
};

export default SignInPage;
