import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from 'semantic-ui-react';

import { ReactComponent as MapIcon } from '../icons/map.svg';
import { ReactComponent as TreeIcon } from '../icons/tree.svg';
import Ribbon from './Ribbon';
import styles from './Navigation.module.css';
import { setPage } from '../store/actions';

export const MAP_PAGE = 'MAP';
export const RECOMMENDATION_PAGE = 'RECOMMENDATION';

function Navigation({ left, right }) {
  const dispatch = useDispatch();
  const page = useSelector(state => state.page);
  const { t } = useTranslation();
  document.title = t('app.title');
  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.pages} ${page !== MAP_PAGE && styles.pageRight}`}
      >
        <div className={styles.left}>{left}</div>
        <div className={styles.right}>{right}</div>
      </div>
      <Menu fluid widths={2} icon="labeled" className={styles.menu}>
        <Menu.Item
          active={page === MAP_PAGE}
          onClick={() => dispatch(setPage(MAP_PAGE))}
          className={styles.item}
        >
          <MapIcon className={styles.icon} />
          {t('app.map')}
        </Menu.Item>
        <Menu.Item
          active={page === RECOMMENDATION_PAGE}
          onClick={() => dispatch(setPage(RECOMMENDATION_PAGE))}
          className={styles.item}
        >
          <TreeIcon className={styles.icon} />
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
