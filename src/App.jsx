import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import { setPrevState } from './actions/control';
import AuthPage from './components/authPage/authPage';
import ScrollToTop from './components/scrollToTop/scrollToTop';
import Header from './components/header/Header';
import Footer from './components/footer/footer';
import MainPage from './components/mainPage/MainPage';
import ErrorPage from './components/errorPage/errorPage';
import GameSprint from './components/gameSprint/gameSprint';
import WordConstructor from './components/wordConstructor/WordConstructor';
import Audiochallenge from './components/audiochallenge/audiochallenge';
import Textbook from './components/textbook/Textbook';
import AppStatisticsPage from './components/appStatisticsPage/appStatisticsPage';
import Savannah from './components/savannah/savannah';
import './App.scss';

function App() {
  const dispatch = useDispatch();
  const state = useSelector((rootState) => rootState.control);

  const handleUnload = () => {
    localStorage.setItem('currentState', JSON.stringify(state));
  };

  const handleLoad = () => {
    const prevState = JSON.parse(localStorage.getItem('currentState'));
    if (prevState) {
      dispatch(setPrevState(prevState));
    }
  };

  useEffect(() => {
    window.addEventListener('load', handleLoad);
    window.addEventListener('unload', handleUnload);
    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('unload', handleUnload);
    };
  });

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route path="/textbook/:section" component={Textbook} />
          <Route exact path="/savannah">
            <Savannah />
          </Route>
          <Route exact path="/audiochallenge">
            <Audiochallenge />
          </Route>
          <Route exact path="/sprint">
            <GameSprint />
          </Route>
          <Route exact path="/wordConstructor" component={WordConstructor} />
          <Route exact path="/statistics">
            <AppStatisticsPage />
          </Route>
          <Route path="/authorization">
            {state.currentPerson ? <Redirect to="/" /> : <AuthPage />}
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
