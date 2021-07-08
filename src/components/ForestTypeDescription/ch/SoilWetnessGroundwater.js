import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Grid from './Grid';

function SoilWetnessGroundwater({ data }) {
  const { t } = useTranslation();
  return (
    <Grid
      data={data}
      header={t('forestTypeDiagram.soilWetness.groundwater')}
      headerX={t('forestTypeDiagram.soilWetness.label')}
      headerY={t('forestTypeDiagram.soilWetness.permeability')}
      labelX={[
        t('forestTypeDiagram.soilWetness.swampy'),
        t('forestTypeDiagram.soilWetness.veryHigh'),
        t('forestTypeDiagram.soilWetness.high'),
        t('forestTypeDiagram.soilWetness.normal'),
        t('forestTypeDiagram.soilWetness.low'),
        t('forestTypeDiagram.soilWetness.none'),
      ]}
      labelY={[
        t('forestTypeDiagram.amount.extremelyHigh'),
        t('forestTypeDiagram.amount.veryHigh'),
        t('forestTypeDiagram.amount.high'),
        t('forestTypeDiagram.amount.medium'),
        t('forestTypeDiagram.amount.low'),
        t('forestTypeDiagram.amount.veryLow'),
      ]}
    />
  );
}

SoilWetnessGroundwater.propTypes = {
  data: PropTypes.arrayOf().isRequired,
};

export default SoilWetnessGroundwater;
