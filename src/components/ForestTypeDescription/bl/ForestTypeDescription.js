import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Tab } from 'semantic-ui-react';

import GeneralTab from './GeneralTab';
import AssociationsTab from './AssociationsTab';
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
            key: t('bl.forestType.general'),
            menuItem: t('bl.forestType.general'),
            render: () => <GeneralTab data={data} />,
          },
          {
            menuItem: {
              key: t('bl.forestType.associations'),
              content: t('bl.forestType.associations'),
            },
            render: () => (
              <AssociationsTab
                onForestTypeChange={() => setActiveTab(0)}
                forestTypeCode={data.code}
              />
            ),
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
