import React from 'react';
import PropTypes from 'prop-types';

function NeutralIcon({ color, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 45.75 45.75"
      className={className}
    >
      <path
        fill={color}
        d="M16.93 25.45l-3.29-3.29-2.42 2.43 7.44 7.43 15.87-15.87-2.43-2.42-11.74 11.74-1.72 1.64z"
      />
    </svg>
  );
}

NeutralIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
};

NeutralIcon.defaultProps = {
  color: '#fff',
  className: undefined,
};

export default NeutralIcon;
