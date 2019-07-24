/* eslint-disable no-underscore-dangle */
import mapboxgl from 'mapbox-gl';
import Layer from 'ol/layer/Layer';
import { toLonLat } from 'ol/proj';
import Source from 'ol/source/Source';
import PropTypes from 'prop-types';
import React, { useContext, useMemo, useState } from 'react';

import Base from './Base';
import { MapContext } from '../Map';

class MapboxRenderer {
  constructor({ layer }) {
    this.layer = layer;
  }

  prepareFrame() {
    return typeof this.layer.mapboxMap === 'object';
  }

  renderFrame(frameState) {
    const { mapboxMap } = this.layer;
    const canvas = mapboxMap.getCanvas();
    const { center, rotation, zoom } = frameState.viewState;
    const visible = this.layer.getVisible();
    canvas.style.display = visible ? 'block' : 'none';
    const opacity = this.layer.getOpacity();
    canvas.style.opacity = opacity;
    // adjust view parameters in mapbox
    if (rotation) {
      mapboxMap.rotateTo((-rotation * 180) / Math.PI, {
        animate: false,
      });
    }
    mapboxMap.jumpTo({
      center: toLonLat(center),
      zoom: zoom + 4,
      animate: false,
    });
    // cancel the scheduled update & trigger synchronous redraw
    // see https://github.com/mapbox/mapbox-gl-js/issues/7893#issue-408992184
    // NOTE: THIS MIGHT BREAK WHEN UPDATING MAPBOX
    if (mapboxMap._frame) {
      mapboxMap._frame.cancel();
      mapboxMap._frame = null;
    }
    mapboxMap._render();
    return canvas;
  }

  forEachFeatureAtCoordinate(coordinate, frameState, hitTolerance, callback) {
    const pixel = this.layer.map.getPixelFromCoordinate(coordinate);
    const features = this.layer.mapboxMap.queryRenderedFeatures(pixel) || [];
    features.forEach(f => callback(f));
    return features;
  }
}

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

    this.map = map;

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
  return layer ? <Base layer={layer}>{children}</Base> : null;
}

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
