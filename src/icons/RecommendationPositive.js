import React from 'react';
import PropTypes from 'prop-types';

function PositiveIcon({ color, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 45 45"
      className={className}
    >
      <path
        fill={color}
        d="M30.04 17.86l-7.59-7.6-7.57 7.57 2.39 2.38 3.5-3.5v18.12h3.38v-18.1l3.51 3.5 2.38-2.37z"
      />
    </svg>
  );
}

PositiveIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
};

PositiveIcon.defaultProps = {
  color: '#fff',
  className: undefined,
};

export default PositiveIcon;
