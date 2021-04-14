import { NavLink, Route, Switch } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../../assets/images/arrow-left.svg';
import { AUTHORIZATION_INFO } from '../../utils/constants';
import BackButton from './styledNav';
import LogInPage from './loginPage';
import SignInPage from './signinPage';
import './authPage.css';

const AuthPage = () => (
  <div className="auth-page">
    <div className="auth-container">
      <div className="auth-content">
        <div className="head-content">
          <BackButton to="/">
            <ArrowLeft />
            <span>RS-Lang</span>
          </BackButton>
        </div>
        <div className="content-header">
          <div>
            <NavLink exact className="tabsItem" to="/authorization">{AUTHORIZATION_INFO.login}</NavLink>
            <NavLink className="tabsItem" to="/authorization/registration">{AUTHORIZATION_INFO.signup}</NavLink>
          </div>
        </div>
        <div className="content-wrapper">
          <Switch>
            <Route exact path="/authorization">
              <LogInPage />
            </Route>
            <Route path="/authorization/registration">
              <SignInPage />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  </div>
);

export default AuthPage;
