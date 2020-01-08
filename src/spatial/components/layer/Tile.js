import OLTile from 'ol/layer/Tile';
import XYZSource from 'ol/source/XYZ';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import Base from './Base';

function Tile({ children, source }) {
  const layer = useMemo(() => new OLTile({ source }), [source]);
  return <Base layer={layer}>{children}</Base>;
}

Tile.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  source: PropTypes.shape(),
};

Tile.defaultProps = {
  children: null,
  source: new XYZSource(),
};

export default Tile;
