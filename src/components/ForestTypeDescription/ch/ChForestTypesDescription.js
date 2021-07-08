import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tab } from 'semantic-ui-react';

import SoilTab from './SoilTab';
import TerrainTab from './TerrainTab';
import VegetationTab from './VegetationTab';
import styles from '../Diagram.module.css';

function ChForestTypeDescription({ data }) {
  const { t } = useTranslation();

  return (
    <>
      <Tab
        menu={{ className: styles.pane, attached: true, tabular: true }}
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

ChForestTypeDescription.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default ChForestTypeDescription;
