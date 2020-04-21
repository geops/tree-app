import Geolocation from 'ol/Geolocation';
import React, { useContext, useMemo } from 'react';

import Button from './Button';
import { MapContext } from '../spatial/components/Map';
import styles from './MapGeolocation.module.css';

function MapGeolocation() {
  const map = useContext(MapContext);
  const projection = map.getView().getProjection();
  const geoloc = useMemo(() => new Geolocation({ projection }), [projection]);

  geoloc.on('change:position', () => {
    const coordinate = geoloc.getPosition();
    map.dispatchEvent({ type: 'click', coordinate });
    map.getView().setCenter(coordinate);
    geoloc.setTracking(false);
  });

  return (
    <Button
      active
      className={styles.button}
      icon="location arrow"
      onClick={() => geoloc.setTracking(true)}
    />
  );
}

export default MapGeolocation;
