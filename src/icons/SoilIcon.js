import React from 'react';
import PropTypes from 'prop-types';

const SoilIcon = ({ value, size }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      {value === 1 && ( // Plus
        <>
          <line
            y1={0}
            y2={size}
            x1={size / 2}
            x2={size / 2}
            stroke="black"
            strokeWidth={2}
          />
          <line
            y1={size / 2}
            y2={size / 2}
            x1={0}
            x2={size}
            stroke="black"
            strokeWidth={2}
          />
        </>
      )}
      {value === 2 && ( // Empty rectangle
        <rect
          height={size}
          width={size}
          stroke="black"
          strokeWidth={2}
          fill="none"
        />
      )}
      {value === 3 && ( // Filled rectangle
        <rect height={size} width={size} stroke="black" strokeWidth={2} />
      )}
      {value === 4 && ( // Minus
        <>
          <line
            y1={size / 2}
            y2={size / 2}
            x1={0}
            x2={size}
            stroke="black"
            strokeWidth={2}
          />
        </>
      )}
    </svg>
  </div>
);

SoilIcon.propTypes = {
  value: PropTypes.number.isRequired,
  size: PropTypes.number,
};

SoilIcon.defaultProps = {
  size: 16,
};

export default SoilIcon;
