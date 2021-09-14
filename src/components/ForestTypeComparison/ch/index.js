import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { info } from '@geops/tree-lib';

function ForestTypeComparison({ data, compare }) {
  const compareData = useMemo(
    () => compare.map((ft) => info('forestType', ft)),
    [compare],
  );

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
