import React from 'react';
import propTypes from 'prop-types';

import styles from './Ribbon.module.css';

const Ribbon = ({ label }) => (
  <div className={styles.wrapper}>
    <div className={styles.line}>
      <div className={styles.text}>{label}</div>
    </div>
  </div>
);

Ribbon.propTypes = {
  label: propTypes.string.isRequired,
};

export default Ribbon;
