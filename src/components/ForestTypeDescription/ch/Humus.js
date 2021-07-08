import PropTypes from 'prop-types';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import NoData from '../NoData';
import styles from '../Diagram.module.css';
import { getStyle } from '../utils';

function Humus({ humus, humusVariants }) {
  const { t } = useTranslation();
  return (
    <svg viewBox="0 0 800 400" className={styles.svg}>
      <rect
        className={getStyle(humus, '0.0')}
        x="515.996"
        y="238.102"
        width="94.668"
        height="23.812"
      />
      <rect
        className={getStyle(humus, '0.1')}
        x="515.996"
        y="162.641"
        width="94.668"
        height="75.461"
      />
      <rect
        className={getStyle(humus, '0.2')}
        x="515.996"
        y="139.246"
        width="94.668"
        height="23.396"
      />

      <rect
        className={getStyle(humus, '1.0')}
        x="326.66"
        y="238.102"
        width="94.668"
        height="23.812"
      />
      <rect
        className={getStyle(humus, '1.1')}
        x="326.66"
        y="162.641"
        width="94.668"
        height="75.461"
      />
      <rect
        className={getStyle(humus, '1.2')}
        x="326.66"
        y="139.246"
        width="94.668"
        height="23.396"
      />

      <rect
        className={getStyle(humus, '2.0')}
        x="421.328"
        y="238.102"
        width="94.668"
        height="23.812"
      />
      <rect
        className={getStyle(humus, '2.1')}
        x="421.328"
        y="162.641"
        width="94.668"
        height="75.461"
      />
      <rect
        className={getStyle(humus, '2.2')}
        x="421.328"
        y="139.246"
        width="94.668"
        height="23.396"
      />

      <rect
        className={getStyle(humus, '3.0')}
        x="610.664"
        y="238.102"
        width="94.668"
        height="23.812"
      />
      <rect
        className={getStyle(humus, '3.1')}
        x="610.664"
        y="162.641"
        width="94.668"
        height="75.461"
      />
      <rect
        className={getStyle(humus, '3.2')}
        x="610.664"
        y="139.246"
        width="94.668"
        height="23.396"
      />

      <rect
        className={getStyle(humus, '4.0')}
        x="705.332"
        y="238.102"
        width="94.668"
        height="23.812"
      />
      <rect
        className={getStyle(humus, '4.1')}
        x="705.332"
        y="162.641"
        width="94.668"
        height="75.461"
      />
      <rect
        className={getStyle(humus, '4.2')}
        x="705.332"
        y="139.246"
        width="94.668"
        height="23.396"
      />

      <rect
        className={getStyle(humus, '5.0')}
        x="231.836"
        y="238.102"
        width="94.824"
        height="23.812"
      />
      <rect
        className={getStyle(humus, '5.1')}
        x="231.836"
        y="162.641"
        width="94.824"
        height="75.461"
      />
      <rect
        className={getStyle(humus, '5.2')}
        x="231.836"
        y="139.246"
        width="94.824"
        height="23.396"
      />

      <rect
        className={getStyle(humusVariants, '0')}
        x="234.003"
        y="333.928"
        width="28.812"
        height="28.812"
      />
      <rect
        className={getStyle(humusVariants, '4')}
        x="234.003"
        y="369.759"
        width="28.812"
        height="28.812"
      />
      <rect
        className={getStyle(humusVariants, '2')}
        x="418.378"
        y="334.084"
        width="28.812"
        height="28.812"
      />
      <rect
        className={getStyle(humusVariants, '1')}
        x="418.378"
        y="368.744"
        width="28.812"
        height="28.812"
      />
      <rect
        className={getStyle(humusVariants, '3')}
        x="603.815"
        y="334.095"
        width="28.812"
        height="28.812"
      />
      <rect
        className={getStyle(humusVariants, '5')}
        x="603.815"
        y="369.929"
        width="28.812"
        height="28.812"
      />
      <text x="1" y="20" className={styles.header}>
        {t('forestTypeDiagram.humus.label')}
      </text>
      <path className={styles.line} d="M232 41v222M231 262h568" />
      <path className={styles.line} d="M231 238h568" />
      <path className={styles.line} d="M800 42v221" />
      <path
        className={styles.line}
        d="M231 163h568M231 139h568M421 73v190M611 42v220M327 42v221M516 73v190"
      />
      <path className={styles.line} d="M705 73v189" />
      <text x="280" y="67" className={styles.labelMiddleBold}>
        {t('forestTypeDiagram.humus.mor')}
      </text>
      <text x="470" y="67" className={styles.labelMiddleBold}>
        {t('forestTypeDiagram.humus.moder')}
      </text>
      <text x="700" y="67" className={styles.labelMiddleBold}>
        {t('forestTypeDiagram.humus.mull')}
      </text>
      <text y="90" className={styles.labelMiddle}>
        <Trans i18nKey="forestTypeDiagram.humus.morLike">
          <tspan x="375">mor</tspan>
          <tspan x="375" dy="20">
            like
          </tspan>
          <tspan x="375" dy="20">
            moder
          </tspan>
        </Trans>
      </text>
      <text y="90" className={styles.labelMiddle}>
        <Trans i18nKey="forestTypeDiagram.humus.moderLike">
          <tspan x="470">moderLike</tspan>
          <tspan x="470" dy="20">
            moder
          </tspan>
        </Trans>
      </text>
      <text y="90" className={styles.labelMiddle}>
        <Trans i18nKey="forestTypeDiagram.humus.mullLike">
          <tspan x="564">mullLike</tspan>
          <tspan x="564" dy="20">
            moder
          </tspan>
        </Trans>
      </text>
      <text x="660" y="107" className={styles.labelMiddle}>
        {t('forestTypeDiagram.humus.fmull')}
      </text>
      <text x="750" y="107" className={styles.labelMiddle}>
        {t('forestTypeDiagram.humus.lmull')}
      </text>
      <path className={styles.line} d="M0 162h190M0 238h190" />
      <text x="1" y="129" className={styles.label}>
        {t('forestTypeDiagram.humus.dry')}
      </text>
      <text x="1" y="151" className={styles.label}>
        {t('forestTypeDiagram.humus.xero')}
      </text>
      <text x="1" y="261" className={styles.label}>
        {t('forestTypeDiagram.humus.wet')}
      </text>
      <text x="1" y="283" className={styles.label}>
        {t('forestTypeDiagram.humus.hydro')}
      </text>
      <text x="644" y="354" className={styles.label}>
        {t('forestTypeDiagram.humus.tangel')}
      </text>
      <text x="644" y="391" className={styles.label}>
        {t('forestTypeDiagram.humus.eroded')}
      </text>
      <path
        className={styles.line}
        d="M604 334h29v29h-29zM604 370h29v29h-29z"
      />
      <text x="2" y="352" className={styles.header}>
        {t('forestTypeDiagram.humus.variants')}
      </text>
      <text x="458" y="354" className={styles.label}>
        {t('forestTypeDiagram.humus.limeMull')}
      </text>
      <text x="458" y="391" className={styles.label}>
        {t('forestTypeDiagram.humus.limeModer')}
      </text>
      <path
        className={styles.line}
        d="M418 334h29v29h-29zM418 369h29v29h-29z"
      />
      <text x="273" y="354" className={styles.label}>
        {t('forestTypeDiagram.humus.halfBog')}
      </text>
      <text x="273" y="391" className={styles.label}>
        {t('forestTypeDiagram.humus.turf')}
      </text>
      <path
        className={styles.line}
        d="M234 334h29v29h-29zM234 370h29v29h-29z"
      />
      {!humus && !humusVariants && <NoData height={400} width={800} />}
    </svg>
  );
}

Humus.propTypes = {
  humus: PropTypes.arrayOf().isRequired,
  humusVariants: PropTypes.arrayOf().isRequired,
};

export default Humus;
