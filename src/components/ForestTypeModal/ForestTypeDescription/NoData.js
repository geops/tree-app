/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Diagram.module.css';

function NoData({ height, width, className }) {
  const { t } = useTranslation();
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        style={{ fill: 'white', opacity: 0.8 }}
      />
      <text x="50%" y="50%" className={className || styles.labelMiddleBold}>
        {t('forestTypeDiagram.noData')}
      </text>
    </svg>
  );
}

NoData.propTypes = {
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};

NoData.defaultProps = {
  className: null,
  height: '100%',
  width: '100%',
};

export default NoData;
