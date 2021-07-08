import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import ChForestTypeDescription from './ch/ChForestTypesDescription';
import LuForestTypeDescription from './lu/LuForestTypeDescription';

function ForestTypeDescription({ data }) {
  const activeProfile = useSelector((state) => state.activeProfile);
  return (
    <>
      {activeProfile === 'ch' && <ChForestTypeDescription data={data} />}
      {activeProfile === 'lu' && <LuForestTypeDescription data={data} />}
    </>
  );
}

ForestTypeDescription.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default ForestTypeDescription;
