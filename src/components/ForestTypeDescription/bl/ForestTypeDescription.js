import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Tab } from 'semantic-ui-react';

import GeneralTab from './GeneralTab';
import styles from '../ForestTypeDescription.module.css';

function ForestTypeDescription({ data }) {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <Tab
        activeIndex={activeTab}
        onTabChange={(evt, tab) => setActiveTab(tab.activeIndex)}
        menu={{ className: styles.pane, attached: true, tabular: true }}
        panes={[
          {
            key: t('lu.forestType.general'),
            menuItem: t('lu.forestType.general'),
            render: () => <GeneralTab data={data} />,
          },
          // {
          //   menuItem: {
          //     key: t('lu.forestType.associations'),
          //     content: t('lu.forestType.associations'),
          //     'data-cypress': 'forestTypeDescription.lu.associationsMenuItem',
          //   },
          //   render: () => (
          //     <AssociationsTab
          //       onForestTypeChange={() => setActiveTab(0)}
          //       associationGroupCode={data.associationGroupCode}
          //     />
          //   ),
          // },
        ]}
      />
    </>
  );
}

ForestTypeDescription.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default ForestTypeDescription;
