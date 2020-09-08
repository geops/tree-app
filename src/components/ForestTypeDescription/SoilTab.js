import PropTypes from 'prop-types';
import React from 'react';

import Graininess from './Graininess';
import Humus from './Humus';
import SkeletalFraction from './SkeletalFraction';
import SoilDiagram from './SoilDiagram';
import SoilWetnessGroundwater from './SoilWetnessGroundwater';
import SoilWetnessTailwater from './SoilWetnessTailwater';

function SoilTab({ data }) {
  return (
    <>
      <Humus humus={data.humus} humusVariants={data.humusVariants} />
      <SoilDiagram soil={data.soil} soilVariants={data.soilVariants} />
      <Graininess graininess={data.graininess} rawMaterial={data.rawMaterial} />
      <SkeletalFraction data={data.skeletalFractionSoilDepth} />
      <SoilWetnessGroundwater data={data.soilWetnessGroundwater} />
      <SoilWetnessTailwater data={data.soilWetnessTailwater} />
    </>
  );
}

SoilTab.propTypes = {
  data: PropTypes.arrayOf().isRequired,
};

export default SoilTab;
