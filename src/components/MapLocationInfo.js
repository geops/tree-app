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
      const features = map.getFeaturesAtPixel(event.pixel) || [];
      const newLocation = features.reduce(
        (l, f) => ({ ...l, [f.sourceLayer]: f.properties.code }),
        {},
      );
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
