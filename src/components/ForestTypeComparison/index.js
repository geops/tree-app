import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

import ChForestTypeComparison from './ch';
import LuForestTypeComparison from './lu';

function ForestTypeComparison({ info, compare, options }) {
  const activeProfile = useSelector((state) => state.activeProfile);

  return (
    <>
      {activeProfile === 'ch' && (
        <ChForestTypeComparison data={info} compare={compare} />
      )}
      {activeProfile === 'lu' && (
        <LuForestTypeComparison
          data={info}
          compare={compare}
          options={options}
        />
      )}
    </>
  );
}

ForestTypeComparison.propTypes = {
  info: PropTypes.shape().isRequired,
  options: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  compare: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ForestTypeComparison;
