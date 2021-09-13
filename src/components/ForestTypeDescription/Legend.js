import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import styles from './Diagram.module.css';

function Legend({ title, rare, medium, often }) {
  const { t } = useTranslation();
  return (
    <div className={styles.legend}>
      {title !== false && (
        <h3>{title || t('forestTypeDiagram.legend.label')}</h3>
      )}
      <div
        className={styles.legenditems}
        style={{
          maxWidth: [rare, medium, often].some((val) => val === false)
            ? 250
            : 400,
        }}
      >
        {often && (
          <svg height="30" viewBox="0 0 160 50">
            <text className={styles.label} x="40" y="18">
              {t('forestTypeDiagram.legend.often')}
            </text>
            <rect
              width="26.669"
              height="26.669"
              className={`${styles.often} ${styles.line}`}
            />
          </svg>
        )}
        {medium && (
          <svg height="30" viewBox="0 0 160 50">
            <text className={styles.label} x="40" y="18">
              {t('forestTypeDiagram.legend.medium')}
            </text>
            <rect
              width="26.669"
              height="26.669"
              className={`${styles.medium} ${styles.line}`}
            />
          </svg>
        )}
        {rare && (
          <svg height="30" viewBox="0 0 160 50">
            <text className={styles.label} x="40" y="18">
              {t('forestTypeDiagram.legend.rare')}
            </text>
            <rect
              width="26.669"
              height="26.669"
              className={`${styles.rare} ${styles.line}`}
            />
          </svg>
        )}
      </div>
    </div>
  );
}

Legend.propTypes = {
  rare: PropTypes.bool,
  medium: PropTypes.bool,
  often: PropTypes.bool,
  title: PropTypes.oneOfType(PropTypes.string, PropTypes.bool),
};

Legend.defaultProps = {
  rare: true,
  medium: true,
  often: true,
  title: undefined,
};

export default Legend;
