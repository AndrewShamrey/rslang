import { useEffect, useState } from 'react';
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
import WordConstructor from './components/wordConstructor/WordConstructor';
import Audiochallenge from './components/audiochallenge/audiochallenge';
import AppStatisticsPage from './components/appStatisticsPage/appStatisticsPage';
import WordCard from './components/wordCard/wordCard';
import VocabluarySettings from './components/vocabluarySettings/vocabluarySettings';
import './App.scss';

function App() {
  const dispatch = useDispatch();
  const state = useSelector((rootState) => rootState.control);

  // move to a component which will contain vocabluary settings and/or word card
  const [isSettings, setIsSettings] = useState(false);
  const [isWordCardOpen, setIsWordCardOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettings((settings) => !settings);
  };

  const toggleWordCard = () => {
    setIsWordCardOpen((isOpen) => !isOpen);
  };

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

  // mocked data for testing WordCard component
  const wordData = {
    id: '5e9f5ee35eb9e72bc21af4ca',
    group: 0,
    page: 2,
    word: 'chart',
    image: 'files/03_0043.jpg',
    audio: 'files/03_0043.mp3',
    audioMeaning: 'files/03_0043_meaning.mp3',
    audioExample: 'files/03_0043_example.mp3',
    textMeaning: 'A <i>chart</i> is a list of information.',
    textExample: 'We used a <b>chart</b> to see how we had improved.',
    transcription: '[tʃɑːrt]',
    textExampleTranslate: 'Мы использовали график, чтобы увидеть, как мы улучшили',
    textMeaningTranslate: 'Диаграмма - это список информации',
    wordTranslate: 'диаграмма',
  };

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
            <>
              <h1>Учебник</h1>
              <button type="button" onClick={toggleSettings}>open settings</button>
              <button type="button" onClick={toggleWordCard}>open word card</button>
              {isSettings && (
                <VocabluarySettings close={toggleSettings} />
              )}
              {isWordCardOpen && (
                <WordCard
                  wordData={wordData}
                  showNext={() => {}}
                  showPreviouse={() => {}}
                  deleteWord={() => {}}
                  moveToDifficult={() => {}}
                  close={toggleWordCard}
                />
              )}
            </>
          </Route>
          <Route exact path="/savannah">
            <h1>Саванна</h1>
          </Route>
          <Route exact path="/audiochallenge">
            <Audiochallenge />
          </Route>
          <Route exact path="/sprint">
            <h1>Спринт</h1>
          </Route>
          <Route exact path="/wordconstructor">
            <WordConstructor />
          </Route>
          <Route exact path="/statistics">
            <AppStatisticsPage />
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
