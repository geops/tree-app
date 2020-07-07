import { defaults as controlDefaults, ScaleLine } from 'ol/control';
import { defaults as interactionDefaults } from 'ol/interaction';
import React from 'react';

import Map from '../spatial/components/Map';
import MapboxLayer from '../spatial/components/layer/Mapbox';
import TileLayer from '../spatial/components/layer/Tile';

import MapBaseLayer from './MapBaseLayer';
import MapGeolocation from './MapGeolocation';
import MapLocation from './MapLocation';
import MapVectorLayer from './MapVectorLayer';
import MapView from './MapView';

import styles from './Map.module.css';

const scaleLine = new ScaleLine();

const controls = controlDefaults({ rotate: false }).extend([scaleLine]);
const interactions = interactionDefaults({
  altShiftDragRotate: false,
  pinchRotate: false,
});

function AppMap() {
  return (
    <Map className={styles.map} controls={controls} interactions={interactions}>
      <MapView />
      <MapLocation />
      <TileLayer>
        <MapBaseLayer />
      </TileLayer>
      <MapboxLayer>
        <MapVectorLayer />
      </MapboxLayer>
      <MapGeolocation />
    </Map>
  );
}

export default AppMap;
