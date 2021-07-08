import PropTypes from 'prop-types';
import React from 'react';

import NoData from './NoData';
import styles from './Diagram.module.css';
import { getStyle } from './utils';

function Grid({ data, header, headerX, headerY, labelX, labelY }) {
  return (
    <svg viewBox="0 0 400 400" className={styles.svg}>
      <text x="10" y="13" className={styles.labelBold}>
        {header}
      </text>
      <text x="10" y="45" className={styles.labelBold}>
        {headerX}
      </text>
      <text x="23" y="118" transform="rotate(-45 23 114)">
        {labelX[0]}
      </text>
      <text x="68" y="118" transform="rotate(-45 67 114)">
        {labelX[1]}
      </text>
      <text x="116" y="118" transform="rotate(-45 116 115)">
        {labelX[2]}
      </text>
      <text x="161" y="118" transform="rotate(-45 161 115)">
        {labelX[3]}
      </text>
      <text x="208" y="118" transform="rotate(-45 208 112)">
        {labelX[4]}
      </text>
      <text x="255" y="118" transform="rotate(-45 255 114)">
        {labelX[5]}
      </text>
      <path d="M1 121h46v46H1z" className={getStyle(data, '0.0')} />
      <path d="M47 121h47v46H47z" className={getStyle(data, '0.1')} />
      <path d="M93 121h47v46H93z" className={getStyle(data, '0.2')} />
      <path d="M140 121h47v46h-47z" className={getStyle(data, '0.3')} />
      <path d="M187 121h47v46h-47z" className={getStyle(data, '0.4')} />
      <path d="M233 121h47v46h-46z" className={getStyle(data, '0.5')} />
      <path d="M1 167h46v47H1z" className={getStyle(data, '1.0')} />
      <path d="M47 167h47v47H47z" className={getStyle(data, '1.1')} />
      <path d="M93 167h47v47H93z" className={getStyle(data, '1.2')} />
      <path d="M140 167h47v47h-47z" className={getStyle(data, '1.3')} />
      <path d="M187 167h47v47h-47z" className={getStyle(data, '1.4')} />
      <path d="M233 167h47v47h-46z" className={getStyle(data, '1.5')} />
      <path d="M1 213h46v47H1z" className={getStyle(data, '2.0')} />
      <path d="M47 213h47v47H47z" className={getStyle(data, '2.1')} />
      <path d="M93 213h47v47H93z" className={getStyle(data, '2.2')} />
      <path d="M140 213h47v47h-47z" className={getStyle(data, '2.3')} />
      <path d="M187 213h47v47h-47z" className={getStyle(data, '2.4')} />
      <path d="M233 213h47v47h-46z" className={getStyle(data, '2.5')} />
      <path d="M1 260h46v47H1z" className={getStyle(data, '3.0')} />
      <path d="M47 260h47v47H47z" className={getStyle(data, '3.1')} />
      <path d="M93 260h47v47H93z" className={getStyle(data, '3.2')} />
      <path d="M140 260h47v47h-47z" className={getStyle(data, '3.3')} />
      <path d="M187 260h47v47h-47z" className={getStyle(data, '3.4')} />
      <path d="M233 260h47v47h-46z" className={getStyle(data, '3.5')} />
      <path d="M1 307h46v47H1z" className={getStyle(data, '4.0')} />
      <path d="M47 307h47v47H47z" className={getStyle(data, '4.1')} />
      <path d="M93 307h47v47H93z" className={getStyle(data, '4.2')} />
      <path d="M140 307h47v47h-47z" className={getStyle(data, '4.3')} />
      <path d="M187 307h47v47h-47z" className={getStyle(data, '4.4')} />
      <path d="M233 307h47v47h-46z" className={getStyle(data, '4.5')} />
      <path d="M1 354h46v46H1z" className={getStyle(data, '5.0')} />
      <path d="M47 354h47v46H47z" className={getStyle(data, '5.1')} />
      <path d="M93 354h47v46H93z" className={getStyle(data, '5.2')} />
      <path d="M140 354h47v46h-47z" className={getStyle(data, '5.3')} />
      <path d="M187 354h47v46h-47z" className={getStyle(data, '5.4')} />
      <path d="M233 354h47v46h-46z" className={getStyle(data, '5.5')} />
      <text x="278" y="116" className={styles.labelBold}>
        {headerY}
      </text>
      <text x="289" y="148">
        {labelY[0]}
      </text>
      <text x="289" y="195">
        {labelY[1]}
      </text>
      <text x="289" y="242">
        {labelY[2]}
      </text>
      <text x="289" y="289">
        {labelY[3]}
      </text>
      <text x="289" y="336">
        {labelY[4]}
      </text>
      <text x="289" y="383">
        {labelY[5]}
      </text>
      <path className={styles.line} d="M1 121h279v279H1z" />
      <path
        className={styles.line}
        d="M47 121v280M93 121v280M140 121v280M187 121v280M233 121v279M1 354h279M1 307h279M1 260h279M1 213h279M1 167h279"
      />
      {!data && <NoData height={400} width={400} />}
    </svg>
  );
}

Grid.propTypes = {
  data: PropTypes.shape().isRequired,
  header: PropTypes.string.isRequired,
  headerX: PropTypes.string.isRequired,
  headerY: PropTypes.string.isRequired,
  labelX: PropTypes.arrayOf(PropTypes.string).isRequired,
  labelY: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Grid;
