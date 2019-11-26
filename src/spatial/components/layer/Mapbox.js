import mapboxgl from 'mapbox-gl';
import Layer from 'ol/layer/Layer';
import Source from 'ol/source/Source';
import PropTypes from 'prop-types';
import React, { useContext, useMemo, useState } from 'react';

import Base from './Base';
import { MapContext } from '../Map';
import MapboxRenderer from '../../renderer/Mapbox';

class MapboxLayer extends Layer {
  constructor({ container, map, style, ...options }) {
    super({ ...options, source: new Source({}) });

    this.mapboxMap = new mapboxgl.Map({
      container,
      style,
      zoom: 0,
      center: [0, 0],
      attributionControl: false,
      boxZoom: false,
      doubleClickZoom: false,
      dragPan: false,
      dragRotate: false,
      interactive: false,
      keyboard: false,
      pitchWithRotate: false,
      scrollZoom: false,
      touchZoomRotate: false,
    });
    this.mapboxMap.on('load', () => this.dispatchEvent('loadend'));

    this.map = map;

    // eslint-disable-next-line no-underscore-dangle
    this.renderer_ = new MapboxRenderer({ layer: this });
  }
}

function Mapbox({ children, style, ...props }) {
  const map = useContext(MapContext);
  const [container, setContainer] = useState();
  map.on('change:target', () => setContainer(map.getTargetElement()));
  const layer = useMemo(
    () => container && new MapboxLayer({ container, map, style }),
    [container, map, style],
  );
  map.on('change:size', () => layer && layer.mapboxMap.resize());
  return layer ? <Base layer={layer}>{children}</Base> : null;
}

Mapbox.Layer = MapboxLayer;

Mapbox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: PropTypes.shape(),
};

Mapbox.defaultProps = {
  children: null,
  style: null,
};

export default Mapbox;
