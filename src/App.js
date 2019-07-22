import useWindowSize from '@rehooks/window-size';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import 'semantic-ui-css/semantic.min.css';
import { Divider, Header, Icon, Menu } from 'semantic-ui-react';

import Recommendation from './components/Recommendation';
import Ribbon from './components/Ribbon';

import Map from './components/Map';

function App() {
  const [page, setPage] = useState('map');
  const { t } = useTranslation();
  const isMobile = useWindowSize().innerWidth < 768;
  const offset = page === 'map' ? 0 : -100;
  document.title = t('app.title');
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          width: isMobile ? '200vw' : '100vw',
          transform: isMobile ? `translateX(${offset}vw)` : '',
          transition: 'transform ease-out 0.2s',
          willChange: 'transform',
          overflow: 'hidden',
        }}
      >
        <div
          style={{ width: isMobile ? '100vw' : '50vw', position: 'relative' }}
        >
          <Map />
        </div>
        <div
          style={{
            width: isMobile ? '100vw' : '50vw',
            position: 'relative',
            padding: '20px',
            overflow: 'scroll',
          }}
        >
          <Divider hidden />
          <Header size="huge" textAlign="center" color="#055418">
            {t('app.title')}
          </Header>
          <Divider hidden />
          <Recommendation />
          <Divider hidden />
        </div>
      </div>
      {isMobile && (
        <Menu
          fluid
          widths={2}
          icon="labeled"
          style={{ borderRadius: 0, margin: 0, flexShrink: 0 }}
        >
          <Menu.Item
            active={page === 'map'}
            onClick={() => setPage('map')}
            style={{ borderRadius: 0 }}
          >
            <Icon name="map" />
            {t('app.map')}
          </Menu.Item>
          <Menu.Item
            active={page === 'recommendation'}
            onClick={() => setPage('recommendation')}
            style={{ borderRadius: 0 }}
          >
            <Icon name="tree" />
            {t('app.recommendation')}
          </Menu.Item>
        </Menu>
      )}
      <Ribbon label={t('app.ribbon')} />
    </div>
  );
}

export default App;
