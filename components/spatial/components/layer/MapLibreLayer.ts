/* eslint-disable @typescript-eslint/no-use-before-define */
import maplibregl from "maplibre-gl";
import Layer from "ol/layer/Layer";
import Source from "ol/source/Source";

import { MaplibreStyleType, OlMapType } from "@/utils/types/definitions";

import MaplibreRenderer from "../../renderer/MapLibre";

import { TreeAppLayerSpecification } from "./LayersProvider";

type MaplibreLayerVisibility = "none" | "visible" | undefined;

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

    this.maplibreMap.on("load", () => {
      this.getLayersAreLoaded();
    });

    this.map = map;

    // eslint-disable-next-line no-underscore-dangle
    this.renderer_ = new MaplibreRenderer({ layer: this });
  }

  getLayersAreLoaded() {
    const layers = (
      (this.maplibreMap.getStyle().layers || []) as [TreeAppLayerSpecification]
    ).filter((l) => l.metadata?.group === "main");

    const loadedLayers = layers.map((layer) => ({
      id: layer.id,
      loaded: false,
    }));
    layers.forEach((layer) => {
      this.waitForVectorTileLayerToRender(layer.id, () => {
        const styleLayer = loadedLayers.find((l) => l.id === layer.id);
        if (styleLayer) {
          styleLayer.loaded = true;
        }
        if (loadedLayers.every((l) => l.loaded)) {
          this.dispatchEvent("loadend");
        }
      });
    });
  }

  /**
   * Waits for a Maplibre vector tile layer to be fully loaded and rendered.
   * Calls the provided callback when the layer is ready.
   *
   * @param map - The Maplibre map instance.
   * @param sourceId - The ID of the source associated with the layer.
   * @param layerId - The ID of the layer to check.
   * @param callback - The function to call when the layer is ready.
   */
  public waitForVectorTileLayerToRender(
    layerId: string,
    callback: () => void,
  ): void {
    const layer = this.maplibreMap.getLayer(layerId);
    if (!layer) {
      console.warn(`Layer "${layerId}" not found.`);
      return;
    }

    const visibility = this.maplibreMap.getLayoutProperty(
      layerId,
      "visibility",
    ) as MaplibreLayerVisibility;
    const sourceId = (layer as TreeAppLayerSpecification).source;

    if (typeof sourceId !== "string") {
      console.warn(`Layer "${layerId}" does not have a valid source.`);
      return;
    }

    const source = this.maplibreMap.getSource(sourceId);
    if (!source || source.type !== "vector") {
      console.warn(`Source "${sourceId}" is not a vector source.`);
      return;
    }

    let ready = false;

    const isTileWithState = (tile: unknown): tile is { state: string } => {
      return !!tile && typeof tile === "object" && "state" in tile;
    };

    const checkIfReady = (): void => {
      const isVisible = visibility !== "none";
      const zoom = this.maplibreMap.getZoom();
      const inZoom =
        zoom >= (layer.minzoom ?? 0) && zoom <= (layer.maxzoom ?? 24);
      const tilesLoaded = this.maplibreMap.areTilesLoaded();

      if (isVisible && inZoom && tilesLoaded && !ready) {
        ready = true;

        requestAnimationFrame(() => {
          this.maplibreMap.off("sourcedata", onSourceData);
          this.maplibreMap.off("moveend", onMoveEnd);
          callback();
        });
      }
    };

    const onSourceData = (e: maplibregl.MapSourceDataEvent): void => {
      if (
        e.sourceId === sourceId &&
        isTileWithState(e.tile) &&
        (e.tile.state === "loaded" || e.tile.state === "parsed")
      ) {
        checkIfReady();
      }
    };

    const onMoveEnd = (): void => {
      checkIfReady();
    };

    this.maplibreMap.on("sourcedata", onSourceData);
    this.maplibreMap.on("moveend", onMoveEnd);
    checkIfReady();
  }
}

export default MaplibreLayer;
