import OLVectorTile from 'ol/layer/VectorTile';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import Base from './Base';

function VectorTile({ children, ...props }) {
  const layer = useMemo(() => new OLVectorTile(props), [props]);
  return <Base layer={layer}>{children}</Base>;
}

VectorTile.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default VectorTile;
