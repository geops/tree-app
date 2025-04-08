import maplibregl from "maplibre-gl";
import Layer from "ol/layer/Layer";
import Source from "ol/source/Source";

import { MaplibreStyleType, OlMapType } from "@/utils/types/definitions";

import MaplibreRenderer from "../../renderer/MapLibre";

interface MaplibreLayerOptions {
  container: HTMLElement;
  map: null | OlMapType;
  mapboxMap?: maplibregl.Map;
  style?: MaplibreStyleType;
  zIndex: number;
}

// @ts-expect-error Fix and remove later
class MaplibreLayer extends Layer {
  private renderer_: MaplibreRenderer;
  public map: null | OlMapType;
  public maplibreMap: maplibregl.Map;
  constructor({ container, map, style, ...options }: MaplibreLayerOptions) {
    super({ ...options, source: new Source({}) });

    this.maplibreMap = new maplibregl.Map({
      attributionControl: false,
      boxZoom: false,
      center: [0, 0],
      container,
      doubleClickZoom: false,
      dragPan: false,
      dragRotate: false,
      interactive: false,
      keyboard: false,
      pitchWithRotate: false,
      scrollZoom: false,
      style,
      touchZoomRotate: false,
      zoom: 0,
    });
    this.maplibreMap.on("load", () => this.dispatchEvent("loadend"));

    this.map = map;

    // eslint-disable-next-line no-underscore-dangle
    this.renderer_ = new MaplibreRenderer({ layer: this });
  }
}

export default MaplibreLayer;
