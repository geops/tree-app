import Geolocation from 'ol/Geolocation';
import React, { useContext, useMemo } from 'react';

import Button from './Button';
import { MapContext } from '../spatial/components/Map';
import styles from './MapGeolocation.module.css';

// Source: https://coderwall.com/p/i817wa/one-line-function-to-detect-mobile-devices-with-javascript
function isMobileDevice() {
  return (
    typeof window.orientation !== 'undefined' ||
    navigator.userAgent.indexOf('IEMobile') !== -1
  );
}

function MapGeolocation() {
  const map = useContext(MapContext);
  const projection = map.getView().getProjection();
  const geoloc = useMemo(() => new Geolocation({ projection }), [projection]);

  geoloc.on('change:position', () => {
    const coordinate = geoloc.getPosition();
    map.dispatchEvent({ type: 'singleclick', coordinate });
    map.getView().setCenter(coordinate);
    geoloc.setTracking(false);
  });

  return isMobileDevice() ? (
    <Button
      active
      className={styles.button}
      icon="location arrow"
      onClick={() => geoloc.setTracking(true)}
    />
  ) : null;
}

export default MapGeolocation;
