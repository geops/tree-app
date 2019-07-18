import React, { useContext, useEffect, useState } from 'react';
import { Segment } from 'semantic-ui-react';

import { MapContext } from '../spatial/components/Map';
import Popup from '../spatial/components/Popup';

import styles from './MapLocationInfo.module.css';

function MapLocationInfo() {
  const [location, setLocation] = useState({});
  const [position, setPosition] = useState();
  const map = useContext(MapContext);
  useEffect(() => {
    map.on('click', event => {
      const newLocation = map
        .getFeaturesAtPixel(event.pixel)
        .map(feature => feature.getProperties())
        .reduce((l, p) => ({ ...l, [p.layer]: p.code }), {});
      setLocation(newLocation);
      setPosition(event.coordinate);
    });
  }, [map]);
  return (
    <Popup position={position}>
      <Segment compact inverted className={styles.popup}>
        <pre>{JSON.stringify(location, null, 2)}</pre>
      </Segment>
    </Popup>
  );
}

export default MapLocationInfo;
