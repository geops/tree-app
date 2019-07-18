import OLMap from 'ol/Map';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useRef } from 'react';

import 'ol/ol.css';

export const MapContext = React.createContext();

function Map({ children, style, ...props }) {
  const map = useMemo(() => new OLMap(props), [props]);
  const target = useRef(null);
  useEffect(() => map.setTarget(target.current));
  return (
    <MapContext.Provider value={map}>
      <div ref={target} style={style}>
        {children}
      </div>
    </MapContext.Provider>
  );
}

Map.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  style: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
};

Map.defaultProps = {
  style: null,
};

export default Map;
