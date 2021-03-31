import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import GameStart from './Game/GameStart';
import GamePlay from './Game/GamePlay';
import Preloader from './Preloader';
import './WordConstructor.scss';

const WordConstructor = () => {
  const words = ['hello', 'merry', 'popens'];
  return (
    <Router>
      <div className="WordConstructor">
        <Switch>
          <Route path="/wordConstructor/start" render={() => <GameStart />} />
          <Route path="/wordConstructor/game" component={GamePlay} />
        </Switch>
        <Redirect to="/wordConstructor/start" />
      </div>
    </Router>

  );
};

export default WordConstructor;
