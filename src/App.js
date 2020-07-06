import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import Navigation from './components/Navigation';
import WelcomeModal from './components/WelcomeModal';
import history from './history';
import store from './store';

import './theme.css';

function App() {
  return (
    <Router history={history}>
      <Provider store={store}>
        <Navigation />
        <WelcomeModal />
      </Provider>
    </Router>
  );
}

export default App;
