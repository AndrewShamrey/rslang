import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { setPrevState, doSmth } from './actions/control';
import Header from './components/header/Header';
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
    <div className="App">
      {/* <button type="button" onClick={handleSmth}>{state.smth}</button> */}
      <Router>
        <Header />
        <Switch />
      </Router>
    </div>
  );
}

export default App;
