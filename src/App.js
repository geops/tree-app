import React from 'react';
import { Provider } from 'react-redux';

import Map from './components/Map';
import Navigation from './components/Navigation';
import Projection from './components/Projection';
import store from './store';

import './theme.css';

function App() {
  return (
    <Provider store={store}>
      <Navigation left={<Map />} right={<Projection />} />
    </Provider>
  );
}

export default App;
