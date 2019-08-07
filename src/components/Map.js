import XYZSource from 'ol/source/XYZ';
import React from 'react';

import Map from '../spatial/components/Map';
import Mapbox from '../spatial/components/layer/Mapbox';
import TileLayer from '../spatial/components/layer/Tile';

import MapLocation from './MapLocation';
import MapVectorStyle from './MapVectorStyle';
import MapView from './MapView';

import styles from './Map.module.css';
import WelcomeModal from './WelcomeModal';

const tileSource = new XYZSource({
  url:
    'https://wmts10.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg',
});

function AppMap() {
  return (
    <Map className={styles.map}>
      <MapView />
      <MapLocation />
      <TileLayer source={tileSource} />
      <Mapbox>
        <MapVectorStyle />
      </Mapbox>
      <WelcomeModal />
    </Map>
  );
}

export default AppMap;
