import React from 'react';
import PropTypes from 'prop-types';

function NegativeIcon({ color, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 45.87 45.87"
      className={className}
    >
      <path
        fill={color}
        d="M30.65 27.66L22.9 35.4l-7.71-7.72 2.43-2.43 3.58 3.59v-18.5h3.44v18.47l3.58-3.58z"
      />
    </svg>
  );
}

NegativeIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
};

NegativeIcon.defaultProps = {
  color: '#fff',
  className: undefined,
};

export default NegativeIcon;
