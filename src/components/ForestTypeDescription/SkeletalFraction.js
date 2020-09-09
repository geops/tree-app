import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Grid from './Grid';

function SkeletalFraction({ data }) {
  const { t } = useTranslation();
  return (
    <Grid
      data={data}
      header=""
      headerX={t('forestTypeDiagram.skeletalFraction')}
      headerY={t('forestTypeDiagram.soilDepth.label')}
      labelX={[
        t('forestTypeDiagram.amount.extremelyHigh'),
        t('forestTypeDiagram.amount.veryHigh'),
        t('forestTypeDiagram.amount.high'),
        t('forestTypeDiagram.amount.medium'),
        t('forestTypeDiagram.amount.low'),
        t('forestTypeDiagram.amount.veryLow'),
      ]}
      labelY={[
        t('forestTypeDiagram.soilDepth.veryShallow'),
        t('forestTypeDiagram.soilDepth.shallow'),
        t('forestTypeDiagram.soilDepth.medium'),
        t('forestTypeDiagram.soilDepth.deep'),
        t('forestTypeDiagram.soilDepth.veryDeep'),
        t('forestTypeDiagram.soilDepth.extremelyDeep'),
      ]}
    />
  );
}

SkeletalFraction.propTypes = {
  data: PropTypes.arrayOf().isRequired,
};

export default SkeletalFraction;
