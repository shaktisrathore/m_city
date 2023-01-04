import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import { firebase } from './firebase';

import './Resources/css/app.css';

const App = ({ user }) => {
  return (
    <Router>
      <Routes user={user} />
    </Router>
  );
};

App.propTypes = {
  user: PropTypes.object,
};

firebase.auth().onAuthStateChanged(user => {
  ReactDOM.render(<App user={user} />, document.getElementById('root'));
});
