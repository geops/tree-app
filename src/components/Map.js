import { defaults as controlDefaults } from 'ol/control';
import { defaults as interactionDefaults } from 'ol/interaction';
import XYZSource from 'ol/source/XYZ';
import React from 'react';

import Map from '../spatial/components/Map';
import MapboxLayer from '../spatial/components/layer/Mapbox';
import TileLayer from '../spatial/components/layer/Tile';

import MapBaseLayer from './MapBaseLayer';
import MapLocation from './MapLocation';
import MapVectorLayer from './MapVectorLayer';
import MapView from './MapView';
import WelcomeModal from './WelcomeModal';
import styles from './Map.module.css';

const controls = controlDefaults({ rotate: false });
const interactions = interactionDefaults({
  altShiftDragRotate: false,
  pinchRotate: false,
});
const tileSource = new XYZSource();

function AppMap() {
  return (
    <Map className={styles.map} controls={controls} interactions={interactions}>
      <MapView />
      <MapLocation />
      <TileLayer source={tileSource}>
        <MapBaseLayer />
      </TileLayer>
      <MapboxLayer>
        <MapVectorLayer />
      </MapboxLayer>
    </Map>
  );
}

export default AppMap;
