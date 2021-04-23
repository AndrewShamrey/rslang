import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import GameStart from './Game/GameStart';
import GamePlay from './Game/GamePlay';
import './WordConstructor.scss';

const WordConstructor = () => {
  const handle = useFullScreenHandle();
  const HandleFullScreen = () => {
    if (handle.active) {
      handle.exit();
    } else {
      handle.enter();
    }
  };

  const screenButton = handle.active ? (<i className="fa fa-compress" />) : (<i className="fa fa-expand" />);

  return (
    <Router>
      <FullScreen handle={handle}>
        <div className="WordConstructor">
          <Switch>
            <Route path="/wordconstructor/start" render={() => <GameStart />} />
            <Route path="/wordconstructor/game" component={GamePlay} />
          </Switch>
          <Redirect to="/wordconstructor/start" />
          <button type="button" className="WordConstructor__fullscreen" onClick={HandleFullScreen}>
            {screenButton}
          </button>
        </div>
      </FullScreen>
    </Router>

  );
};

export default WordConstructor;
