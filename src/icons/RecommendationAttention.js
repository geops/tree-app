import React from 'react';
import PropTypes from 'prop-types';

function AttentionIcon({ color, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 45.939 45.939"
      className={className}
    >
      <path
        fill={color}
        d="M22.308 26.889h1.448l.4-5.424h-2.225zM23.05 27.756a1.146 1.146 0 100 2.292 1.146 1.146 0 000-2.292z"
      />
      <path
        fill={color}
        d="M36.264 33.062L24.44 10.288a1.638 1.638 0 00-2.794 0l-11.82 22.77a1.573 1.573 0 001.4 2.3h23.639a1.573 1.573 0 001.4-2.3zm-22.445-.85l9.224-17.772 9.228 17.772z"
      />
    </svg>
  );
}

AttentionIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
};

AttentionIcon.defaultProps = {
  color: '#fff',
  className: undefined,
};

export default AttentionIcon;
