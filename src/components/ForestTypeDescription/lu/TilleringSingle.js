import PropTypes from 'prop-types';
import React from 'react';
import { TilleringGrid, getRowWidth } from './Tillering';
import styles from '../Diagram.module.css';

function TilleringSingle({ data }) {
  if (data || data.filter((i) => i).length === 0) {
    return '-';
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="45"
      viewBox="0 0 310 45"
      x="0"
    >
      <g>
        <rect
          y="5"
          x="40"
          width={getRowWidth(data[1])}
          height="15"
          className={styles.medium}
        />
        <rect
          y="5"
          x="40"
          width={getRowWidth(data[0])}
          height="15"
          className={styles.often}
        />
        <TilleringGrid height={30} />
      </g>
    </svg>
  );
}

TilleringSingle.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default TilleringSingle;
