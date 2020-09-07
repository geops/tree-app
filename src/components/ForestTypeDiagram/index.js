import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

import AltitudinalZone from './AltitudinalZoneForestEcoregion';
import Graininess from './Graininess';
import Humus from './Humus';
import Site from './Site';
import SkeletalFraction from './SkeletalFraction';
import Soil from './Soil';
import SoilWetnessGroundwater from './SoilWetnessGroundwater';
import SoilWetnessTailwater from './SoilWetnessTailwater';

function ForestTypeDiagram({ data }) {
  const { t } = useTranslation();
  return (
    <>
      <AltitudinalZone data={data.altitudinalZoneForestEcoregion} />
      {t('forestTypeDiagram.soil.header')}
      <Humus humus={data.humus} humusVariants={data.humusVariants} />
      <Soil soil={data.soil} soilVariants={data.soilVariants} />
      <Graininess graininess={data.graininess} rawMaterial={data.rawMaterial} />
      <Site altitude={data.altitude} aspect={data.aspect} slope={data.slope} />
      <SkeletalFraction data={data.skeletalFractionSoilDepth} />
      <SoilWetnessGroundwater data={data.soilWetnessGroundwater} />
      <SoilWetnessTailwater data={data.soilWetnessTailwater} />
    </>
  );
}

ForestTypeDiagram.propTypes = {
  data: PropTypes.arrayOf().isRequired,
};

export default ForestTypeDiagram;
