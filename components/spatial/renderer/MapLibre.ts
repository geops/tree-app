import { LngLatLike, MapGeoJSONFeature, PointLike } from "maplibre-gl";
import { FrameState } from "ol/Map";
import { toLonLat } from "ol/proj";

import { CoordinateArrayType } from "@/utils/types/definitions";

import MaplibreLayer from "../components/layer/MapLibreLayer";

class MapLibreRenderer {
  public layer: MaplibreLayer;
  constructor({ layer }: { layer: MaplibreLayer }) {
    this.layer = layer;
  }

  forEachFeatureAtCoordinate(
    coordinate: CoordinateArrayType,
    frameState: FrameState,
    hitTolerance: number,
    callback: (feature: MapGeoJSONFeature) => void,
  ) {
    if (!this.layer.maplibreMap || !this.layer.map) return [];
    const pixel = this.layer.map.getPixelFromCoordinate(coordinate);
    const features =
      this.layer.maplibreMap.queryRenderedFeatures(pixel as PointLike) || [];
    features.forEach((f) => callback(f));
    return features;
  }

  prepareFrame() {
    return typeof this.layer.maplibreMap === "object";
  }

  renderFrame(frameState: FrameState) {
    const { maplibreMap } = this.layer;
    const canvas = maplibreMap.getCanvas();
    const { center, rotation, zoom } = frameState.viewState;
    const visible = this.layer.getVisible();
    canvas.style.display = visible ? "block" : "none";
    canvas.style.position = "absolute";
    const opacity = this.layer.getOpacity();
    canvas.style.opacity = opacity.toString();
    // adjust view parameters in mapbox
    if (rotation) {
      maplibreMap.rotateTo((-rotation * 180) / Math.PI, {
        animate: false,
      });
    }
    maplibreMap.jumpTo({
      center: toLonLat(center) as LngLatLike,
      zoom: zoom - 1,
    });
    // cancel the scheduled update & trigger synchronous redraw
    // see https://github.com/mapbox/mapbox-gl-js/issues/7893#issue-408992184
    // NOTE: THIS MIGHT BREAK WHEN UPDATING MAPBOX
    // ts-ignore
    maplibreMap.stop();
    maplibreMap.redraw();
    return canvas;
  }
}

export default MapLibreRenderer;
