import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Tab } from 'semantic-ui-react';
import { info } from '@geops/tree-lib';

import GeneralTab from './GeneralTab';

import { setForestTypeCompare } from '../../../store/actions';

function ForestTypeComparison({ data, compare }) {
  const dispatch = useDispatch();
  const activeProfile = useSelector((state) => state.activeProfile);
  const [compareData, setCompareData] = useState([]);

  useEffect(() => {
    try {
      const newData = compare.map((ft) => info('forestType', ft, 'lu'));
      setCompareData(newData);
    } catch {
      dispatch(setForestTypeCompare([]));
      setCompareData([]);
    }
  }, [activeProfile, compare, dispatch]);

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
