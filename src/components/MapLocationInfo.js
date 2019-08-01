import { transform } from 'ol/proj';
import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import OLFeature from 'ol/Feature';
import { Point } from 'ol/geom';
import { Style, Icon } from 'ol/style';
import VectorSource from 'ol/source/Vector';

import mapPositionIcon from '../icons/mapPosition.svg';
import { EPSG2056 } from '../map/projection';
import { MapContext } from '../spatial/components/Map';
import { setMapLocation } from '../store/actions';
import Vector from '../spatial/components/layer/Vector';

const sourceLayerMapping = {
  altitudinal_zones_1995: 'altitudinalZone',
  altitudinal_zones_2085_less_dry: 'targetAltitudinalZoneModerate',
  altitudinal_zones_2085_dry: 'targetAltitudinalZoneExtreme',
  forest_ecoregions: 'forestEcoregion',
  forest_types: 'forestType',
  silver_fir_areas: 'silverFirArea',
};
const featuresToLocation = (location, feature) => ({
  ...location,
  [sourceLayerMapping[feature.sourceLayer] ||
  feature.sourceLayer]: feature.properties.code.toString(),
});

const iconFeature = new OLFeature({
  geometry: new Point([0, 0]),
  name: 'selected forest :D',
});
const vectorSource = new VectorSource({
  features: [iconFeature],
});

const iconStyle = new Style({
  image: new Icon({
    anchor: [0.5, 1],
    src: mapPositionIcon,
    scale: 0.05,
  }),
});

iconFeature.setStyle(iconStyle);

function MapLocationInfo() {
  const map = useContext(MapContext);
  const dispatch = useDispatch();

  useEffect(() => {
    map.on('click', event => {
      const coordinate = transform(event.coordinate, 'EPSG:3857', EPSG2056);

      iconFeature.getGeometry().setCoordinates(event.coordinate);

      const features = map.getFeaturesAtPixel(event.pixel) || [];
      const location = features
        .filter(feature => feature.properties && feature.properties.code)
        .reduce(featuresToLocation, {});
      dispatch(setMapLocation({ ...location, coordinate }));
    });
  }, [map, dispatch]);
  return <Vector source={vectorSource} zIndex={999} />;
}

export default MapLocationInfo;
