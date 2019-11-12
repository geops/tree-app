import React from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';

import { ReactComponent as MapIcon } from '../icons/map.svg';
import { ReactComponent as LocationIcon } from '../icons/location.svg';
import { ReactComponent as TreeIcon } from '../icons/tree.svg';

import InfoPage from './InfoPage';
import LocationPage from './LocationPage';
import Map from './Map';
import ProjectionPage from './ProjectionPage';
import Ribbon from './Ribbon';
import useWindowSize from '../hooks/useWindowSize';

import styles from './Navigation.module.css';

function Navigation() {
  const history = useHistory();
  const { pathname, search } = useLocation();
  const go = page => () => history.push(`/${page}${search}`);
  const is = page => pathname === `/${page}`;
  const { t } = useTranslation();
  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 768;
  document.title = t('app.title');
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.map} ${is('') && 'frontpage'}`}>
        <Map />
      </div>
      <div className={`${styles.page} ${is('') && 'frontpage'}`}>
        <Switch>
          <Route path="/location">
            <LocationPage />
          </Route>
          <Route path="/info">
            <InfoPage />
          </Route>
          <Route path={isMobile ? '/projection' : ['/', '/projection']}>
            <ProjectionPage />
          </Route>
        </Switch>
      </div>
      <Menu
        fluid
        widths={isMobile ? 4 : 3}
        icon="labeled"
        className={styles.menu}
      >
        {isMobile && (
          <Menu.Item active={is('')} onClick={go('')} className={styles.item}>
            <MapIcon className={styles.icon} />
            {!isMobile && t('app.map')}
          </Menu.Item>
        )}
        <Menu.Item
          active={is('location')}
          onClick={go('location')}
          className={styles.item}
        >
          <LocationIcon className={styles.icon} />
          {!isMobile && t('app.location')}
        </Menu.Item>
        <Menu.Item
          active={isMobile ? is('projection') : is('') || is('projection')}
          onClick={go('projection')}
          className={styles.item}
        >
          <TreeIcon className={styles.icon} />
          {!isMobile && t('app.recommendation')}
        </Menu.Item>
        <Menu.Item
          active={is('info')}
          onClick={go('info')}
          className={styles.item}
        >
          <Icon name="info" className={styles.icon} />
          {!isMobile && t('app.info')}
        </Menu.Item>
      </Menu>
      <Ribbon label={t('app.ribbon')} />
    </div>
  );
}

export default Navigation;
