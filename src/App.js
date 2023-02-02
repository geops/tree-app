import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react';

import Navigation from './components/Navigation';
import WelcomeModal from './components/WelcomeModal';
import ForestTypeModal from './components/ForestTypeModal';
import MatomoTracker from './components/MatomoTracker';
import history from './history';
import store from './store';

import './theme.css';

const matomoUrl = process?.env?.REACT_APP_MATOMO_URL_BASE;
const matomo = createInstance({
  urlBase: matomoUrl,
  siteId: process?.env?.REACT_APP_MATOMO_SITE_ID,
  trackerUrl: `${matomoUrl}piwik.php`,
  configurations: {
    setCookieSameSite: 'LAX',
  },
});

function App() {
  useEffect(() => matomo.trackPageView(), []);
  return (
    <MatomoProvider value={matomo}>
      <Router history={history}>
        <Provider store={store}>
          {matomo && <MatomoTracker />}
          <Navigation />
          <WelcomeModal />
          <ForestTypeModal />
        </Provider>
      </Router>
    </MatomoProvider>
  );
}

export default App;
