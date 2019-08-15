import React from 'react';
import PropTypes from 'prop-types';

function Slider({ min, max, label, onChange }) {
  return (
    <label htmlFor="slider" className="block mt-4">
      <span className="text-gray-700">{label}</span>
      <div id="slider">
        <span>{`${min}%`}</span>
        <input
          type="range"
          min={min}
          max={max}
          step="1"
          onChange={e => onChange(parseInt(e.target.value, 10))}
        />
        <span>{`${max}%`}</span>
      </div>
    </label>
  );
}

Slider.propTypes = {
  label: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

Slider.defaultProps = {
  onChange: () => {},
};

export default Slider;
