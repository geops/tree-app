import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

import ChForestTypesDescription from './ch/ForestTypesDescription';
import LuForestTypeDescription from './lu/ForestTypeDescription';

function ForestTypeDescription({ data }) {
  const activeProfile = useSelector((state) => state.activeProfile);

  return (
    <>
      {activeProfile === 'ch' && <ChForestTypesDescription data={data} />}
      {activeProfile === 'lu' && <LuForestTypeDescription data={data} />}
    </>
  );
}

ForestTypeDescription.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default ForestTypeDescription;
