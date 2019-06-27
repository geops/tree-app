/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';

function Dropdown({ values, label, onChange }) {
  return (
    <label className="block mt-4">
      <span className="text-gray-700">{label}</span>
      <select
        id=""
        name="select"
        className="form-select mt-1 block w-full"
        onChange={e => onChange(e.target.value)}
      >
        {values.map((item, i) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
}

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Dropdown;
