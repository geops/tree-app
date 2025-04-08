import OLTile from "ol/layer/Tile";
import OLVector from "ol/layer/Vector";
import VectorLayer from "ol/layer/Vector";
import OLVectorTile from "ol/layer/VectorTile";
import OlVectorSource from "ol/source/Vector";
import VectorSource from "ol/source/Vector";
import OLVectorTileSource from "ol/source/VectorTile";
import XYZSource from "ol/source/XYZ";
import { Icon, Style } from "ol/style";
import { createContext, useContext, useEffect, useState } from "react";

import { BASELAYER_GRAY } from "@/components/MapBaselayerSwitcher";
import useStore from "@/store";

import mapPosition from "../../../icons/mapPosition.svg";
import userLocation from "../../../icons/userLocation.svg";
import style from "../../style.json";
import { MapContext } from "../Map";

import MaplibreLayer from "./MapLibreLayer";

import type { TreeAppProfile } from "@geops/tree-lib/types";
import type {
  ColorSpecification,
  DataDrivenPropertyValueSpecification,
  FillLayerSpecification,
  LineLayerSpecification,
  StyleSpecification,
  SymbolLayerSpecification,
} from "maplibre-gl";
import type { FeatureLike } from "ol/Feature";
import type { StyleLike } from "ol/style/Style";

interface Metadata {
  group: string;
  mapping: string;
  type: string;
}

interface Paint {
  "fill-color"?: DataDrivenPropertyValueSpecification<ColorSpecification>;
  "fill-opacity"?: number;
  "line-opacity"?: number;
  "text-opacity"?: number;
}

interface Layout {
  ["text-field"]?: [string, string[], string[], string[]];
}

export type TreeAppLayerSpecification =
  | ({
      layout: Layout;
      metadata?: Metadata;
      paint: Paint;
    } & FillLayerSpecification)
  | ({
      layout: Layout;
      metadata?: Metadata;
      paint: Paint;
    } & LineLayerSpecification)
  | ({
      layout: Layout;
      metadata?: Metadata;
      paint: Paint;
    } & SymbolLayerSpecification);

// Extend SourceSpecification to allow dynamic tile URLs
interface TreeAppSourceSpecification {
  maxzoom?: number;
  tiles?: string[];
  type: "vector";
}

// Extend StyleSpecification to include your custom sources and layers
interface TreeAppMaplibreStyle
  extends Omit<StyleSpecification, "layers" | "sources"> {
  layers: TreeAppLayerSpecification[];
  sources: Record<string, TreeAppSourceSpecification>;
}
// @ts-expect-error dev
export const mapStyle: TreeAppMaplibreStyle = { ...style };

export const getStyle = (
  sourceLayers: string[],
  activeProfile: TreeAppProfile = "ch",
) => {
  const layers = mapStyle.layers.map((layer: TreeAppLayerSpecification) => {
    const currentSourceLayers = mapStyle.layers.filter((l) =>
      sourceLayers.includes(l.id),
    );
    const isSourceLayer = !!currentSourceLayers.find(
      (l) => l["source-layer"] === layer["source-layer"],
    );
    const paint = { ...layer.paint };
    if (layer.type === "fill") {
      paint["fill-opacity"] = isSourceLayer ? 0.5 : 0.0;
    } else if (layer.type === "line") {
      paint["line-opacity"] = isSourceLayer ? 0.8 : 0.0;
    } else if (layer.type === "symbol") {
      paint["text-opacity"] = isSourceLayer ? 1 : 0.0;
    }
    if (/^ft_label$/.test(layer.id)) {
      // eslint-disable-next-line no-param-reassign
      layer.layout["text-field"] = [
        "case",
        ["has", `code_${activeProfile}`],
        ["get", `code_${activeProfile}`],
        ["get", "code"],
      ];
    }
    return { ...layer, paint };
  });

  const mlStyle = {
    ...mapStyle,
    glyphs: `${process.env.NEXT_PUBLIC_VECTOR_TILES_ENDPOINT}/fonts/{fontstack}/{range}.pbf`,
    layers,
    sources: {
      tree: {
        ...mapStyle.sources.tree,
        tiles: [
          `${process.env.NEXT_PUBLIC_VECTOR_TILES_ENDPOINT}/tree/{z}/{x}/{y}.pbf`,
        ],
      },
    },
  };
  return mlStyle;
};

function useMapLibreLayer() {
  const mapLayers = useStore((state) => state.mapLayers);
  const activeProfile = useStore((state) => state.activeProfile);
  const map = useContext(MapContext);
  const [container, setContainer] = useState<HTMLElement>();
  const [layer, setLayer] = useState<MaplibreLayer>();
  map.on("change:target", () => setContainer(map.getTargetElement()));

  useEffect(() => {
    const resizeListener = () => layer?.maplibreMap.resize();
    if (container && !layer) {
      const maplibreLayer = new MaplibreLayer({
        container,
        map,
        style: getStyle(mapLayers, activeProfile),
        zIndex: 888,
      });
      setLayer(maplibreLayer);
      map.addLayer(maplibreLayer);
    }
    map.on("change:size", resizeListener);
  }, [mapLayers, activeProfile, container, layer, map]);
  return layer;
}

function useRasterLayer() {
  const map = useContext(MapContext);
  const [layer, setLayer] = useState<OLTile<XYZSource>>();
  useEffect(() => {
    const baseLayer = new OLTile({
      source: new XYZSource({
        url: BASELAYER_GRAY,
      }),
    });
    setLayer(baseLayer);
    map.addLayer(baseLayer);
  }, [map]);
  return layer;
}

function useVectorLayer(
  id?: string,
  layerStyle?:
    | ((f: FeatureLike, l: VectorLayer<VectorSource>) => Style)
    | StyleLike,
) {
  const map = useContext(MapContext);
  const [layer, setLayer] = useState<OLVector<OlVectorSource>>();
  useEffect(() => {
    const vectorLayer = new OLVector({
      properties: { id },
      source: new VectorSource(),
      zIndex: 999,
    });
    setLayer(vectorLayer);
    if (typeof layerStyle === "function") {
      // @ts-expect-error dev
      vectorLayer.setStyle((feature) => layerStyle(feature, vectorLayer));
    } else {
      vectorLayer.setStyle(layerStyle);
    }
    map.addLayer(vectorLayer);
  }, [map, id, layerStyle]);
  return layer;
}

interface TreeAppLayers {
  baseLayer: OLTile<XYZSource> | OLVectorTile<OLVectorTileSource>;
  maplibreLayer: MaplibreLayer | null;
  markerLayer: OLVector<OlVectorSource>;
  userLocationsLayer: OLVector<OlVectorSource>;
}

export const LayersContext = createContext<TreeAppLayers>({
  baseLayer: new OLTile({ source: new XYZSource() }),
  maplibreLayer: null,
  markerLayer: new OLVector(),
  userLocationsLayer: new OLVector(),
});

interface LayersProvider {
  children?: React.ReactNode | React.ReactNode[];
}

const locationMarker = new Style({
  image: new Icon({
    anchor: [0.5, 1],
    scale: 2,
    src: mapPosition as string,
  }),
});

const getUserLocationMarker = (
  feature: FeatureLike,
  layer: VectorLayer<VectorSource>,
) => {
  return new Style({
    image: new Icon({
      anchor: [0.5, 1],
      scale: layer.get("selectedFeature") === feature ? 2 : 1.5,
      src: userLocation as string,
    }),
  });
};

function LayersProvider({ children }: LayersProvider) {
  const maplibreLayer = useMapLibreLayer();
  const baseLayer = useRasterLayer();
  const markerLayer = useVectorLayer("l", locationMarker);
  const userLocationsLayer = useVectorLayer("ul", getUserLocationMarker);

  if (!maplibreLayer || !baseLayer || !userLocationsLayer || !markerLayer)
    return null;

  return (
    <LayersContext.Provider
      value={{
        baseLayer,
        maplibreLayer,
        markerLayer,
        userLocationsLayer,
      }}
    >
      {children}
    </LayersContext.Provider>
  );
}

export default LayersProvider;
