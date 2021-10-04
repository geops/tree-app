import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { info } from '@geops/tree-lib';

import { setForestTypeCompare } from '../../../store/actions';

function ForestTypeComparison({ data, compare }) {
  const dispatch = useDispatch();
  const activeProfile = useSelector((state) => state.activeProfile);
  const [compareData, setCompareData] = useState([]);

  useEffect(() => {
    try {
      const newData = compare.map((ft) => info('forestType', ft, 'ch'));
      setCompareData(newData);
    } catch {
      dispatch(setForestTypeCompare([]));
      setCompareData([]);
    }
  }, [activeProfile, compare, dispatch]);

  return (
    <>
      <p>TODO: Vergleich für folgende Standortstypen implementieren:</p>
      <ul>
        {compareData.map((ft) => (
          <li key={ft.code}>{ft.de}</li>
        ))}
      </ul>
    </>
  );
}

ForestTypeComparison.propTypes = {
  data: PropTypes.shape().isRequired,
  compare: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ForestTypeComparison;
