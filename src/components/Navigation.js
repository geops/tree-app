import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu } from 'semantic-ui-react';

import { ReactComponent as MapIcon } from '../icons/map.svg';
import { ReactComponent as TreeIcon } from '../icons/tree.svg';
import Ribbon from './Ribbon';
import styles from './Navigation.module.css';

function Navigation({ left, right }) {
  const [page, setPage] = useState('map');
  const { t } = useTranslation();
  document.title = t('app.title');
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.pages} ${page !== 'map' && styles.pageRight}`}>
        <div className={styles.left}>{left}</div>
        <div className={styles.right}>{right}</div>
      </div>
      <Menu fluid widths={2} icon="labeled" className={styles.menu}>
        <Menu.Item
          active={page === 'map'}
          onClick={() => setPage('map')}
          className={styles.item}
        >
          <MapIcon fill="var(--primary-color)" className={styles.icon} />
          {t('app.map')}
        </Menu.Item>
        <Menu.Item
          active={page === 'recommendation'}
          onClick={() => setPage('recommendation')}
          className={styles.item}
        >
          <TreeIcon fill="var(--primary-color)" className={styles.icon} />
          {t('app.recommendation')}
        </Menu.Item>
      </Menu>
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
