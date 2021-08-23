import PropTypes from 'prop-types';
import React from 'react';

import Legend from '../Legend';
import Site from './Site';
import Tilling from './Tilling';

function TerrainTab({ data }) {
  return (
    <>
      <Legend />
      <Site data={data.expoAndAspect} />
      <Tilling />
    </>
  );
}

TerrainTab.propTypes = {
  data: PropTypes.arrayOf().isRequired,
};

export default TerrainTab;
