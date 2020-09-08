import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Diagram.module.css';
import { getStyle } from './utils';

function Graininess({ graininess, rawMaterial }) {
  const { t } = useTranslation();
  return (
    <svg viewBox="0 0 800 450">
      <rect
        x="1.39"
        y="322.726"
        width="26.669"
        height="26.669"
        className={`${styles.often} ${styles.line}`}
      />
      <rect
        x="1.39"
        y="357.453"
        width="26.669"
        height="26.669"
        className={`${styles.medium} ${styles.line}`}
      />
      <rect
        x="1.39"
        y="391.719"
        width="26.669"
        height="26.669"
        className={`${styles.rare} ${styles.line}`}
      />
      <text x="-1" y="274" className={styles.header}>
        {t('forestTypeDiagram.legend.label')}
      </text>
      <text x="1" y="309">
        {t('forestTypeDiagram.legend.distribution')}
      </text>
      <text x="43" y="342">
        {t('forestTypeDiagram.legend.often')}
      </text>
      <text x="43" y="376">
        {t('forestTypeDiagram.legend.medium')}
      </text>
      <text x="43" y="410">
        {t('forestTypeDiagram.legend.rare')}
      </text>
      <rect
        x="454.164"
        y="229.317"
        width="15.464"
        height="165.083"
        className={getStyle(graininess, '2')}
      />
      <rect
        className={getStyle(graininess, '7')}
        x="486.186"
        y="229.317"
        width="33.117"
        height="165.083"
      />
      <rect
        className={getStyle(graininess, '8')}
        x="552.42"
        y="229.317"
        width="33.117"
        height="165.083"
      />
      <path
        className={getStyle(graininess, '3')}
        d="M618.653,229.669l-0,165.229l164.376,-0.5l-164.376,-164.729Z"
      />
      <path
        className={getStyle(graininess, '6')}
        d="M486.186,96.918l0,132.397l66.233,-0l0,-66.022l-66.233,-66.375Z"
      />
      <path
        className={getStyle(graininess, '4')}
        d="M486.186,229.315l0,-132.397l-32.023,-32.092l0,164.489l32.023,-0Z"
      />
      <path
        className={getStyle(graininess, '9')}
        d="M552.419,163.293l65.881,66.022l-65.881,-0l0,-66.022Z"
      />
      <rect
        className={getStyle(graininess, '0')}
        x="469.628"
        y="229.317"
        width="16.558"
        height="165.083"
      />
      <rect
        className={getStyle(graininess, '1')}
        x="519.303"
        y="229.317"
        width="33.117"
        height="165.083"
      />
      <rect
        className={getStyle(graininess, '5')}
        x="585.536"
        y="229.317"
        width="33.117"
        height="165.083"
      />
      <text x="581" y="440">
        {t('forestTypeDiagram.graininess.clay')} [%]
      </text>
      <text x="406" y="297" transform="rotate(-90 406 297)">
        {t('forestTypeDiagram.graininess.silt')} [%]
      </text>
      <text x="391" y="27" className={styles.header}>
        {t('forestTypeDiagram.graininess.label')}
      </text>
      <path
        fill="none"
        stroke="#231f20"
        d="M454 64v330h329L453 64M449 229h170M486 395V97M470 395V229M519 395V229M552 395V163M586 395V229M619 395V229M449 64h5"
      />
      <text x="424" y="229">
        50
      </text>
      <text x="413" y="67">
        100
      </text>
      <text x="464" y="416">
        5
      </text>
      <text x="542" y="416">
        30
      </text>
      <text x="607" y="416">
        50
      </text>
      <text x="768" y="415">
        100
      </text>
      <rect
        x="0.629"
        y="56.98"
        width="33.491"
        height="33.101"
        className={getStyle(rawMaterial, '1')}
      />
      <rect
        x="0.629"
        y="104.104"
        width="33.491"
        height="33.491"
        className={getStyle(rawMaterial, '0')}
      />
      <text y="27" className={styles.header}>
        {t('forestTypeDiagram.rawMaterial.label')}
      </text>
      <text x="47" y="82">
        {t('forestTypeDiagram.rawMaterial.acid')}
      </text>
      <text x="47" y="126">
        {t('forestTypeDiagram.rawMaterial.alkaline')}
      </text>
      <text x="47" y="169">
        {t('forestTypeDiagram.rawMaterial.unkown')}
      </text>
      <path className={styles.line} d="M0 57h34v34H0zM0 104h34v34H0z" />
    </svg>
  );
}

Graininess.propTypes = {
  graininess: PropTypes.arrayOf().isRequired,
  rawMaterial: PropTypes.arrayOf().isRequired,
};

export default Graininess;
