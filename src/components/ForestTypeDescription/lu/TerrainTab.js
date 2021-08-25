import PropTypes from 'prop-types';
import React from 'react';

import Legend from '../Legend';
import Site from './Site';
import Tillering from './Tillering';

import styles from './TerrainTab.module.css';

function TerrainTab({ data }) {
  return (
    <>
      <Legend />
      <div className={styles.diagrams}>
        <Site data={data.expoAndAspect} />
        <Tillering />
      </div>
    </>
  );
}

TerrainTab.propTypes = {
  data: PropTypes.objectOf().isRequired,
};

export default TerrainTab;
