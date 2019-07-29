import XYZSource from 'ol/source/XYZ';
import View from 'ol/View';
import React from 'react';

import Map from '../spatial/components/Map';
import MapboxLayer from '../spatial/components/layer/Mapbox';
import TileLayer from '../spatial/components/layer/Tile';

import MapLocationInfo from './MapLocationInfo';
import MapVectorStyle from './MapVectorStyle';

import styles from './Map.module.css';

const mapView = new View({
  maxZoom: 20,
  center: [910001, 5947112],
  zoom: 9,
  minZoom: 2,
});
const tileSource = new XYZSource({
  url:
    'https://wmts10.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg',
});

function AppMap() {
  return (
    <Map className={styles.map} view={mapView}>
      <MapLocationInfo />
      <TileLayer source={tileSource} />
      <MapboxLayer>
        <MapVectorStyle />
      </MapboxLayer>
    </Map>
  );
}

export default AppMap;
