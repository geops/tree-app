import WMTSSource from 'ol/source/WMTS';
import WMTSTilegrid from 'ol/tilegrid/WMTS';
import View from 'ol/View';
import React from 'react';

import Map from '../spatial/components/Map';
import MapboxLayer from '../spatial/components/layer/Mapbox';
import TileLayer from '../spatial/components/layer/Tile';

import MapLocationInfo from './MapLocationInfo';
import MapVectorStyle from './MapVectorStyle';

import { EPSG2056, extent, resolutions } from '../map/projection';

const center = [2655946, 1209129];
const mapStyle = { height: '100vh' };
const mapView = new View({ center, resolution: 100, projection: EPSG2056 });
const tileSource = new WMTSSource({
  layer: 'ch.swisstopo.swissimage',
  projection: EPSG2056,
  requestEncoding: 'REST',
  tileGrid: new WMTSTilegrid({
    origin: [extent[0], extent[3]],
    resolutions,
    matrixIds: Object.keys(resolutions).map(i => parseInt(i, 10)),
  }),
  url:
    '//wmts10.geo.admin.ch/1.0.0/{Layer}/default/current/2056/{TileMatrix}/{TileCol}/{TileRow}.jpeg',
});

function AppMap() {
  return (
    <Map style={mapStyle} view={mapView}>
      <MapLocationInfo />
      <TileLayer source={tileSource} />
      <MapboxLayer>
        <MapVectorStyle />
      </MapboxLayer>
    </Map>
  );
}

export default AppMap;
