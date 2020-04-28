import PropTypes from 'prop-types';
import React from 'react';

import Button from './Button';

const { REACT_APP_VECTOR_TILES_ENDPOINT } = process.env;
const endpoint = `${REACT_APP_VECTOR_TILES_ENDPOINT}/forest-type`;

function ForestTypeButton({ code, ...props }) {
  return (
    <Button
      active
      icon="file pdf"
      onClick={(e) => {
        e.stopPropagation();
        window.open(`${endpoint}/${code}.pdf`, '_blank');
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}

ForestTypeButton.propTypes = {
  code: PropTypes.string.isRequired,
};

export default ForestTypeButton;
