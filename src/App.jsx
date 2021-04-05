import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import { setPrevState, doSmth } from './actions/control';
import ScrollToTop from './components/scrollToTop/scrollToTop';
import Header from './components/header/Header';
import Footer from './components/footer/footer';
import MainPage from './components/mainPage/MainPage';
import ErrorPage from './components/errorPage/errorPage';
import GameSprint from './components/gameSprint/gameSprint';
import Audiochallenge from './components/audiochallenge/audiochallenge';
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

  const handleSmth = () => {
    dispatch(doSmth(2));
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
          <Route path="/textbook/:section">
            <h1>Учебник</h1>
          </Route>
          <Route exact path="/savannah">
            <h1>Саванна</h1>
          </Route>
          <Route exact path="/audiochallenge">
            <Audiochallenge />
          </Route>
          <Route exact path="/sprint">
            <GameSprint />
          </Route>
          <Route exact path="/wordconstructor">
            <h1>Конструктор слов</h1>
          </Route>
          <Route exact path="/statistics">
            <h1>Статистика</h1>
          </Route>
          <Route path="/authorization">
            <h1>Авторизация</h1>
            {/* {state.currentPerson ? <Redirect to="/" /> : <AuthPage />} */}
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
