import React from 'react';
import { useTranslation } from 'react-i18next';

import AltitudinalZoneForestEcoregion from './AltitudinalZoneForestEcoregion';
import Graininess from './Graininess';
import Humus from './Humus';
import Site from './Site';
import Soil from './Soil';

function ForestTypeDiagram() {
  const { t } = useTranslation();
  return (
    <>
      <AltitudinalZoneForestEcoregion />
      {t('forestTypeDiagram.soil.header')}
      <Humus />
      <Soil />
      <Graininess />
      <Site />
    </>
  );
}

export default ForestTypeDiagram;
