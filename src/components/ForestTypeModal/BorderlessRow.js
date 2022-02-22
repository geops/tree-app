import React from 'react';
import PropTypes from 'prop-types';

import comparisonStyles from './ForestTypeComparison/ForestTypeComparison.module.css';
import useIsMobile from '../../hooks/useIsMobile';

const BorderlessRow = ({ children, borderTop, borderBottom }) => {
  const isMobile = useIsMobile();
  return (
    <tr
      className={comparisonStyles.borderless}
      ref={(el) => {
        // We need to use this hack for mobile view because react-semantic-ui sets a box shadow with !important
        if (el) {
          el.style.setProperty(
            'box-shadow',
            isMobile && borderBottom
              ? '0 -1px 0 0 rgba(0,0,0,.1) inset'
              : 'none',
            'important',
          );
          el.style.setProperty(
            'border-top',
            borderTop ? '1px solid rgba(0,0,0,.1)' : 'none',
            'important',
          );
          el.style.setProperty(
            'border-bottom',
            borderBottom ? '1px solid rgba(0,0,0,.1)' : 'none',
            'important',
          );
        }
      }}
    >
      {children}
    </tr>
  );
};

BorderlessRow.propTypes = {
  children: PropTypes.node,
  borderTop: PropTypes.bool,
  borderBottom: PropTypes.bool,
};

BorderlessRow.defaultProps = {
  children: undefined,
  borderTop: false,
  borderBottom: false,
};

export default BorderlessRow;
