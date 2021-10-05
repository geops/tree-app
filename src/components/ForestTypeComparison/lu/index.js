import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Tab, Form } from 'semantic-ui-react';
import { info } from '@geops/tree-lib';

import Dropdown from '../../Dropdown';
import LuForestTypeComparison from './ForestTypeComparison';

import { setForestTypeCompare } from '../../../store/actions';

import styles from '../ForestTypeComparison.module.css';

function ForestTypeComparison({ data, compare, options }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const forestTypeCompare = useSelector((state) => state.forestTypeCompare);
  const activeProfile = useSelector((state) => state.activeProfile);
  const [compareData, setCompareData] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (data) {
      dispatch(setForestTypeCompare([data.code]));
    }
  }, [data, dispatch]);

  useEffect(() => {
    try {
      const newData = compare.map((ft) => info('forestType', ft, 'lu'));
      setCompareData(newData);
    } catch {
      dispatch(setForestTypeCompare([]));
      setCompareData([]);
    }
  }, [activeProfile, compare, dispatch]);

  return (
    <>
      <Form>
        <Dropdown
          label={t('forestTypeModal.compare')}
          multiple
          options={options}
          onChange={(e, { value }) => dispatch(setForestTypeCompare(value))}
          value={forestTypeCompare}
          open={dropdownOpen && compareData.length < 4}
          onClick={() => setDropdownOpen(!dropdownOpen)}
          onBlur={() => setDropdownOpen(false)}
        />
      </Form>
      {compareData.length > 3 && (
        <p className={styles.maximumLocationsMessage}>
          {t('forestTypeModal.maximumForestTypes')}
        </p>
      )}
      <br />
      <Tab
        menu={{ attached: true, tabular: true }}
        panes={[
          {
            menuItem: t('lu.forestType.general'),
            render: () => (
              <LuForestTypeComparison info={data} compare={compareData} />
            ),
          },
        ]}
      />
    </>
  );
}

ForestTypeComparison.propTypes = {
  data: PropTypes.shape().isRequired,
  compare: PropTypes.arrayOf(PropTypes.string).isRequired,
  options: PropTypes.shape().isRequired,
};

export default ForestTypeComparison;
