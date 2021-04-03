import React from 'react';
import { Link } from 'react-router-dom';

const GameEnd = (props) => (
  <>
    <h1>GameEnd</h1>
    <Link className="WordConstructor__play-headerControlsCancel" to={{ pathname: '/wordConstructor/start' }}>
      start
    </Link>
  </>
);

export default GameEnd;
