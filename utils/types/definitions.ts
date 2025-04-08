import { StyleSpecification } from "maplibre-gl";
import { Map as OlMap } from "ol";
import Layer from "ol/layer/Layer";

export type OlMapType = OlMap;
export type OlMapContextType = null | OlMapType;
export type OlLayerType = Layer;

export type ChildrenType = React.ReactNode | React.ReactNode[];

export type CoordinateArrayType = [number, number];

export type MaplibreStyleType = string | StyleSpecification | undefined;

export type TreeAppProfile = "bl" | "ch" | "lu" | "so" | "vd";

export interface IconProps {
  className?: string;
  color?: string;
  size?: number | string;
}
