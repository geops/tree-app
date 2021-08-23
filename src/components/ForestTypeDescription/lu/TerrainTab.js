import PropTypes from 'prop-types';
import React from 'react';

import Legend from '../Legend';
import Site from './Site';

function TerrainTab({ data }) {
  return (
    <>
      <Legend />
      <Site data={data.expoAndAspect} />
    </>
  );
}

TerrainTab.propTypes = {
  data: PropTypes.arrayOf().isRequired,
};

export default TerrainTab;
