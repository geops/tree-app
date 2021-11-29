import React from 'react';
import PropTypes from 'prop-types';

import ForestTypeLink from './ForestTypeLink';
import comparisonStyles from '../ForestTypeComparison.module.css';
import { getStringWithUnit } from '../../../utils/comparisonUtils';
import useIsMobile from '../../../hooks/useIsMobile';

const ComparisonCell = ({
  data,
  hasSameValues,
  unit,
  children,
  footer,
  code,
  className,
}) => {
  const isMobile = useIsMobile();
  return (
    <td colSpan="2" className={className}>
      <>
        <span style={{ display: 'flex' }}>
          {isMobile && (
            <span style={{ minWidth: 50 }}>
              <ForestTypeLink code={code} />:
            </span>
          )}
          <span
            className={
              hasSameValues ? comparisonStyles.comparisonIsSame : undefined
            }
          >
            {data ? getStringWithUnit(data, unit) : children}
          </span>
        </span>
        {footer}
      </>
    </td>
  );
};

ComparisonCell.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.string,
  ]),
  hasSameValues: PropTypes.bool,
  unit: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  footer: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.number,
  ]),
  code: PropTypes.string.isRequired,
  className: PropTypes.string,
};

ComparisonCell.defaultProps = {
  data: null,
  hasSameValues: false,
  unit: null,
  children: null,
  footer: null,
  className: undefined,
};

export default ComparisonCell;
