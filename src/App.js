import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Navigation from './components/Navigation';
import WelcomeModal from './components/WelcomeModal';
import store from './store';

import './theme.css';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Navigation />
        <WelcomeModal />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
