import OLTile from 'ol/layer/Tile';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import Base from './Base';

function Tile({ children, ...props }) {
  const layer = useMemo(() => new OLTile(props), [props]);
  return <Base layer={layer}>{children}</Base>;
}

Tile.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Tile.defaultProps = {
  children: null,
};

export default Tile;
