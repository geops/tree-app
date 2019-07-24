import React from 'react';
import { Provider } from 'react-redux';

import Map from './components/Map';
import Navigation from './components/Navigation';
import Recommendation from './components/Recommendation';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Navigation left={<Map />} right={<Recommendation />} />
    </Provider>
  );
}

export default App;
