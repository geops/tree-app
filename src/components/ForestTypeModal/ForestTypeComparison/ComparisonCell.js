import React from 'react';
import PropTypes from 'prop-types';

import ForestTypeLink from '../ForestTypeLink';
import comparisonStyles from './ForestTypeComparison.module.css';
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
    <td className={className || ''} style={{ verticalAlign: 'top' }}>
      <>
        <span style={{ display: 'flex' }}>
          {isMobile && (
            <span style={{ minWidth: 60 }}>
              <ForestTypeLink code={code} />:
            </span>
          )}
          <span
            className={
              hasSameValues ? comparisonStyles.comparisonIsSame : undefined
            }
          >
            {!data && !children && '-'}
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
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
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
