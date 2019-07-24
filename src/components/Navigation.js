import useWindowSize from '@rehooks/window-size';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon, Menu } from 'semantic-ui-react';

import Ribbon from './Ribbon';

function Navigation({ left, right }) {
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
          {left}
        </div>
        <div
          style={{
            width: isMobile ? '100vw' : '50vw',
            position: 'relative',
            padding: '20px',
            overflow: 'scroll',
          }}
        >
          {right}
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

Navigation.propTypes = {
  left: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
  right: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Navigation;
