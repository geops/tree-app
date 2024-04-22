import PropTypes from 'prop-types';
import React from 'react';

const style = { height: '70vh' };

function ForestTypeDescription({ code }) {
  const name = code.replace('*', 'stern');
  return (
    <embed
      type="application/pdf"
      src={`https://so-data.tree-app.ch/forest-types/${name}.pdf`}
      width="100%"
      style={style}
    />
  );
}

ForestTypeDescription.propTypes = {
  code: PropTypes.string.isRequired,
};

export default ForestTypeDescription;
