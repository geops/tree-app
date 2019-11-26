import { getUid } from 'ol';
import OLMap from 'ol/Map';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useRef } from 'react';

export const MapContext = React.createContext();

function Map({ children, className, ...props }) {
  const map = useMemo(
    () => new OLMap(props),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Object.values(props).map(prop => getUid(prop)),
  );

  const target = useRef(null);
  useEffect(() => {
    map.setTarget(target.current);
    map.updateSize();
  });
  return (
    <MapContext.Provider value={map}>
      <div ref={target} className={className}>
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
  className: PropTypes.string,
};

Map.defaultProps = {
  className: null,
};

export default Map;
