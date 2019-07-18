import Overlay from 'ol/Overlay';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef } from 'react';

import { MapContext } from './Map';

const overlay = new Overlay({ autoPan: true });

function Popup({ children, position }) {
  const popup = useRef(null);
  const map = useContext(MapContext);
  useEffect(() => {
    overlay.setElement(popup.current);
    map.addOverlay(overlay);
  }, [map]);
  useEffect(() => overlay.setPosition(position), [position]);
  return <div ref={popup}>{children}</div>;
}

Popup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  position: PropTypes.arrayOf(PropTypes.number),
};

Popup.defaultProps = {
  position: undefined,
};

export default Popup;
