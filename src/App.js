import React from 'react';

import Map from './components/Map';
import Navigation from './components/Navigation';
import Recommendation from './components/Recommendation';

function App() {
  return <Navigation left={<Map />} right={<Recommendation />} />;
}

export default App;
