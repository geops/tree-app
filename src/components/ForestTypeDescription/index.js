import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tab } from 'semantic-ui-react';

import SoilTab from './SoilTab';
import TerrainTab from './TerrainTab';
import VegetationTab from './VegetationTab';

function ForestTypeDescription({ data }) {
  const { t } = useTranslation();
  return (
    <>
      <Tab
        panes={[
          {
            menuItem: t('forestTypeDiagram.vegetation'),
            render: () => <VegetationTab data={data} />,
          },
          {
            menuItem: t('forestTypeDiagram.terrain'),
            render: () => <TerrainTab data={data} />,
          },
          {
            menuItem: t('forestTypeDiagram.soil.header'),
            render: () => <SoilTab data={data} />,
          },
        ]}
      />
    </>
  );
}

ForestTypeDescription.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default ForestTypeDescription;
