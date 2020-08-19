import { Point } from 'ol/geom';
import { transform } from 'ol/proj';
import { Style, Icon } from 'ol/style';
import OLFeature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EPSG2056 } from '../map/projection';
import { layers } from '../map/style.json';
import mapPositionIcon from '../icons/mapPosition.svg';
import { MapContext } from '../spatial/components/Map';
import Mapbox from '../spatial/components/layer/Mapbox';
import Vector from '../spatial/components/layer/Vector';
import { setMapLocation } from '../store/actions';

const getKey = (sl) =>
  (
    layers.find((l) => l['source-layer'] === sl && l.metadata) || {
      metadata: {},
    }
  ).metadata.mapping;

const featuresToLocation = (location, f) => ({
  ...location,
  [getKey(f.sourceLayer) || f.sourceLayer]: f.properties.code.toString(),
});

const to2056 = (coordinate) => transform(coordinate, 'EPSG:3857', EPSG2056);

const iconFeature = new OLFeature({ geometry: new Point([0, 0]) });
iconFeature.setStyle(
  new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: mapPositionIcon,
      scale: 0.1,
    }),
  }),
);
const vectorSource = new VectorSource({
  features: [iconFeature],
});

function MapLocation() {
  const map = useContext(MapContext);
  const dispatch = useDispatch();
  const mapLocation = useSelector((state) => state.mapLocation);

  useEffect(() => {
    const handleCoords = ({ coordinate }) => {
      iconFeature.getGeometry().setCoordinates(coordinate);
      const pixel = map.getPixelFromCoordinate(coordinate);
      const features = map.getFeaturesAtPixel(pixel) || [];
      const location = features
        .filter((feature) => feature.properties && feature.properties.code)
        .reduce(featuresToLocation, {});
      dispatch(setMapLocation({ ...location, coordinate: to2056(coordinate) }));
    };
    const waitForLoad = () => {
      const mapboxLayer = map
        .getLayers()
        .getArray()
        .find((layer) => layer instanceof Mapbox.Layer);
      if (mapboxLayer && mapLocation && mapLocation.coordinate) {
        mapboxLayer.on('loadend', () => handleCoords(mapLocation));
        map.getLayers().un('propertychange', waitForLoad);
      }
    };
    map.getLayers().on('propertychange', waitForLoad);
    map.on('click', handleCoords);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, dispatch]);
  return <Vector source={vectorSource} zIndex={999} />;
}

export default MapLocation;
