import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Segment } from 'semantic-ui-react';

import { MapContext } from '../spatial/components/Map';
import Popup from '../spatial/components/Popup';
import { SET_MAP_LOCATION } from '../store/actions';

import styles from './MapLocationInfo.module.css';

function MapLocationInfo() {
  const map = useContext(MapContext);
  const dispatch = useDispatch();
  const mapLocation = useSelector(state => state.mapLocation);
  useEffect(() => {
    map.on('click', ({ coordinate, pixel }) => {
      const features = map.getFeaturesAtPixel(pixel) || [];
      const properties = features.reduce(
        (l, f) => ({ ...l, [f.sourceLayer]: f.properties.code }),
        {},
      );
      dispatch({
        type: SET_MAP_LOCATION,
        mapLocation: { ...properties, coordinate },
      });
    });
  }, [map, dispatch]);
  return (
    <Popup position={mapLocation.coordinate}>
      <Segment compact inverted className={styles.popup}>
        <pre>{JSON.stringify(mapLocation, null, 2)}</pre>
      </Segment>
    </Popup>
  );
}

export default MapLocationInfo;
