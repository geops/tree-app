import OLVector from 'ol/layer/Vector';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import Base from './Base';

function Vector({ children, ...props }) {
  const layer = useMemo(() => new OLVector(props), [props]);
  return <Base layer={layer}>{children}</Base>;
}

Vector.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Vector.defaultProps = {
  children: null,
};

export default Vector;
