import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Diagram.module.css';

function NoData({ height, width }) {
  const { t } = useTranslation();
  return (
    <>
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        style={{ fill: 'white', opacity: 0.8 }}
      />
      <text x={width / 2} y={height / 2} className={styles.labelMiddleBold}>
        {t('forestTypeDiagram.noData')}
      </text>
    </>
  );
}

NoData.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default NoData;
