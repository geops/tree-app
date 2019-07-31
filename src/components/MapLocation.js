import { Point } from 'ol/geom';
import { Style, Icon } from 'ol/style';
import OLFeature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { layers } from '../map/style';
import mapPositionIcon from '../icons/mapPosition.svg';
import { MapContext } from '../spatial/components/Map';
import { MapboxLayer } from '../spatial/components/layer/Mapbox';
import Vector from '../spatial/components/layer/Vector';
import { setMapLocation } from '../store/actions';

const getKey = sl =>
  (layers.find(l => l['source-layer'] === sl && l.metadata) || { metadata: {} })
    .metadata.mapping;

const featuresToLocation = (location, f) => ({
  ...location,
  [getKey(f.sourceLayer) || f.sourceLayer]: f.properties.code.toString(),
});

const iconFeature = new OLFeature({ geometry: new Point([0, 0]) });
iconFeature.setStyle(
  new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: mapPositionIcon,
      scale: 0.05,
    }),
  }),
);
const vectorSource = new VectorSource({
  features: [iconFeature],
});

function MapLocation() {
  const map = useContext(MapContext);
  const dispatch = useDispatch();
  const mapLocation = useSelector(state => state.mapLocation);

  useEffect(() => {
    const handleMapLocation = ({ coordinate }) => {
      iconFeature.getGeometry().setCoordinates(coordinate);
      const pixel = map.getPixelFromCoordinate(coordinate);
      const features = map.getFeaturesAtPixel(pixel) || [];
      const location = features
        .filter(feature => feature.properties.code)
        .reduce(featuresToLocation, {});
      dispatch(setMapLocation({ ...location, coordinate }));
    };
    map.getLayers().on('propertychange', () => {
      const mapboxLayer = map
        .getLayers()
        .getArray()
        .find(layer => layer instanceof MapboxLayer);
      if (mapboxLayer && mapLocation && mapLocation.coordinate) {
        const { coordinate } = mapLocation;
        mapboxLayer.on('loadend', () => handleMapLocation({ coordinate }));
        map.getLayers().un('propertychange', this);
      }
    });
    map.on('click', handleMapLocation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, dispatch]);
  return <Vector source={vectorSource} zIndex={999} />;
}

export default MapLocation;
