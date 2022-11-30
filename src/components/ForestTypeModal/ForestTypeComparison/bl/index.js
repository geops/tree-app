import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tab } from 'semantic-ui-react';

import ForestTypeTab from './ForestTypeTab';

function ForestTypeComparisonIndex({ data }) {
  const { t } = useTranslation();

  return (
    <Tab
      menu={{ attached: true, tabular: true }}
      panes={[
        {
          menuItem: t('app.location'),
          render: () => <ForestTypeTab data={data} />,
        },
      ]}
    />
  );
}

ForestTypeComparisonIndex.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default ForestTypeComparisonIndex;
