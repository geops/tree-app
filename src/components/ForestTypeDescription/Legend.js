import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Diagram.module.css';

function Legend() {
  const { t } = useTranslation();
  return (
    <svg viewBox="0 0 800 100" className={styles.svg}>
      <rect
        x="203.935"
        y="55.048"
        width="26.669"
        height="26.669"
        className={`${styles.often} ${styles.line}`}
      />
      <text x="245.303px" y="74.34px" className={styles.label}>
        {t('forestTypeDiagram.legend.often')}
      </text>
      <rect
        x="413.409"
        y="55.048"
        width="26.669"
        height="26.669"
        className={`${styles.medium} ${styles.line}`}
      />
      <text x="455.348px" y="73.688px" className={styles.label}>
        {t('forestTypeDiagram.legend.medium')}
      </text>
      <rect
        x="654.194"
        y="55.048"
        width="26.669"
        height="26.669"
        className={`${styles.rare} ${styles.line}`}
      />
      <text x="695.562px" y="73.496px" className={styles.label}>
        {t('forestTypeDiagram.legend.rare')}
      </text>
      <text x="30.716px" y="31.75px" className={styles.header}>
        {t('forestTypeDiagram.legend.label')}
      </text>
      <text x="32.531px" y="73.373px" className={styles.label}>
        {t('forestTypeDiagram.legend.distribution')}
      </text>
    </svg>
  );
}

export default Legend;
