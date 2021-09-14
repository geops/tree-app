import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

import ChForestTypesDescription from './ch/ForestTypesDescription';
import LuForestTypeDescription from './lu/ForestTypeDescription';

function ForestTypeDescription({ info }) {
  const activeProfile = useSelector((state) => state.activeProfile);

  return (
    <>
      {activeProfile === 'ch' && <ChForestTypesDescription data={info} />}
      {activeProfile === 'lu' && <LuForestTypeDescription data={info} />}
    </>
  );
}

ForestTypeDescription.propTypes = {
  info: PropTypes.shape().isRequired,
};

export default ForestTypeDescription;
