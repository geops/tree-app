import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Tab } from 'semantic-ui-react';
import { info } from '@geops/tree-lib';

import GeneralTab from './GeneralTab';

function ForestTypeComparison({ data, compare }) {
  const compareData = useMemo(
    () => compare.map((ft) => info('forestType', ft, 'lu')),
    [compare],
  );
  const { t } = useTranslation();

  return (
    <Tab
      menu={{ attached: true, tabular: true }}
      panes={[
        {
          menuItem: t('lu.forestType.general'),
          render: () => <GeneralTab info={data} compare={compareData} />,
        },
      ]}
    />
  );
}

ForestTypeComparison.propTypes = {
  data: PropTypes.shape().isRequired,
  compare: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ForestTypeComparison;
