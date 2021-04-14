import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import GameStart from './Game/GameStart';
import GamePlay from './Game/GamePlay';
import './WordConstructor.scss';

const WordConstructor = () => (
  <Router>
    <div className="WordConstructor">
      <Switch>
        <Route path="/wordconstructor/start" render={() => <GameStart />} />
        <Route path="/wordconstructor/game" component={GamePlay} />
      </Switch>
      <Redirect to="/wordconstructor/start" />
    </div>
  </Router>

);

export default WordConstructor;
