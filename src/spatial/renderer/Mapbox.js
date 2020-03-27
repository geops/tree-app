/* eslint-disable no-underscore-dangle */
import { toLonLat } from 'ol/proj';

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
      zoom: zoom - 1,
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
    features.forEach((f) => callback(f));
    return features;
  }
}

export default MapboxRenderer;
