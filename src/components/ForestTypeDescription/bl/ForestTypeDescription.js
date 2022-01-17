import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';

import GeneralTab from './GeneralTab';
import AssociationsTab from './AssociationsTab';
import styles from '../ForestTypeDescription.module.css';

function ForestTypeDescription({ data }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <Tab
        activeIndex={activeTab}
        onTabChange={(evt, tab) => setActiveTab(tab.activeIndex)}
        menu={{ className: styles.pane, attached: true, tabular: true }}
        panes={[
          {
            key: 'Standortstyp',
            menuItem: 'Standortstyp',
            render: () => <GeneralTab data={data} />,
          },
          {
            menuItem: {
              key: 'Gesellschaftsgruppen',
              content: 'Gesellschaftsgruppen',
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
