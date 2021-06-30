import PropTypes from 'prop-types';
import React from 'react';

import Graininess from './Graininess';
import Humus from './Humus';
import Legend from './Legend';
import SkeletalFraction from './SkeletalFraction';
import SoilDiagram from './SoilDiagram';
import SoilWetnessGroundwater from './SoilWetnessGroundwater';
import SoilWetnessTailwater from './SoilWetnessTailwater';
import styles from './Diagram.module.css';

function SoilTab({ data }) {
  return (
    <>
      <Legend />
      <Humus humus={data.humus} humusVariants={data.humusVariants} />
      <SoilDiagram soil={data.soil} soilVariants={data.soilVariants} />
      <div className={styles.group}>
        <Graininess
          graininess={data.graininess}
          rawMaterial={data.rawMaterial}
        />
        <SkeletalFraction data={data.skeletalFractionSoilDepth} />
      </div>
      <div className={styles.group}>
        <SoilWetnessGroundwater data={data.soilWetnessGroundwater} />
        <SoilWetnessTailwater data={data.soilWetnessTailwater} />
      </div>
    </>
  );
}

SoilTab.propTypes = {
  data: PropTypes.arrayOf().isRequired,
};

export default SoilTab;
