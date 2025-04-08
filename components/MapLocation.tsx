import { useRouter } from "next/router";
import OLFeature from "ol/Feature";
import { Point } from "ol/geom";
import { transform } from "ol/proj";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

import useStore from "@/store";

import translation from "../i18n/resources/de/translation.json";
import { EPSG2056 } from "../map/projection";
import style from "../map/style.json";

import { LayersContext } from "./spatial/components/layer/LayersProvider";
import { MapContext } from "./spatial/components/Map";
import Dialog from "./ui/Dialog";

import type TreeClient from "@geops/tree-lib";
import type { Coordinate } from "ol/coordinate";
import type { FeatureLike } from "ol/Feature";
import type { EventTypes } from "ol/Observable";
import type { ProjectionLike } from "ol/proj";

import type { TreeAppLanguage } from "@/i18n/i18next";
import type { Location as MapLocationType } from "@/store";

import type { TreeAppLayerSpecification } from "./spatial/components/layer/LayersProvider";

interface TreeAppGeoJsonFeature extends Omit<FeatureLike, "properties"> {
  coordinate: number[];
  properties: {
    [name: string]: unknown;
    code: string;
  };
  sourceLayer: string;
}

const getKey = (sl: string) => {
  const layer = style.layers.find(
    // @ts-expect-error dev
    (l: TreeAppLayerSpecification) => l["source-layer"] === sl && l.metadata,
  );
  return layer?.metadata?.mapping;
};

const getHasTransition = (code: string): boolean =>
  code.includes("(") && code.endsWith(")");

const featuresToLocation =
  (treeClient: TreeClient) =>
  (location: MapLocationType, f: TreeAppGeoJsonFeature) => {
    const key = getKey(f.sourceLayer) ?? f.sourceLayer;
    const value: string = f.properties.code.toString();
    const transition = getHasTransition(value);

    if (f.sourceLayer === "forest_types") {
      let forestType: string = value;
      let transitionForestType: null | string = null;
      if (transition) {
        [, forestType, transitionForestType] = /(.*)\((.*)\)/.exec(value) ?? [];
      }
      let forestTypeInfo;
      try {
        forestTypeInfo = treeClient.getForestTypeByCode(forestType);
      } catch (error) {
        // Log missing forest types for debugging
        console.warn(error);
      }

      const cantonalData = Object.keys(translation.profiles).reduce(
        (allCantonalData, profile) => ({
          ...allCantonalData,
          [`forestType_${profile}`]: f.properties[`code_${profile}`],
          [`info_${profile}`]: f.properties[`info_${profile}`],
        }),
        {},
      );

      if (
        forestTypeInfo &&
        !location?.forestTypes?.find((t) => t.forestType === forestType)
      ) {
        return {
          ...location,
          forestTypes: [
            ...(location.forestTypes ?? []),
            {
              forestType,
              info: forestTypeInfo,
              transition,
              transitionForestType,
              ...cantonalData,
            },
          ],
        };
      }
      return { ...location, ...cantonalData };
    }

    if (f.sourceLayer.startsWith("altitudinal_zones_")) {
      if (value === "-10") {
        return { ...location, [key]: null };
      }
      if (transition) {
        const [, azValue, transAzValue] = /(.*)\((.*)\)/.exec(value) ?? [];
        return {
          ...location,
          [key]: azValue,
          transitionAltitudinalZone: transAzValue,
        };
      }
    }

    return { ...location, [key]: value };
  };

const to2056 = (coordinate: Coordinate) =>
  transform(coordinate, "EPSG:3857", EPSG2056 as ProjectionLike);
const to3857 = (coordinate: Coordinate) =>
  transform(coordinate, EPSG2056 as ProjectionLike, "EPSG:3857");

const iconFeature: OLFeature = new OLFeature({
  geometry: new Point([4756710, -2831367]),
});

function MapLocation() {
  const map = useContext(MapContext);
  const { maplibreLayer, markerLayer, userLocationsLayer } =
    useContext(LayersContext);
  const router = useRouter();
  const mapLocation = useStore((state) => state.mapLocation);
  const activeProfile = useStore((state) => state.activeProfile);
  const tc = useStore((state) => state.treeClient);
  const setMapLocation = useStore((state) => state.setMapLocation);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const handleCoords = (
      { coordinate }: { coordinate: Coordinate },
      resetFormLocation = true,
    ) => {
      const pixel: number[] = map.getPixelFromCoordinate(coordinate);
      const features = (map?.getFeaturesAtPixel(pixel) ??
        []) as unknown as TreeAppGeoJsonFeature[];

      if (
        features.some(
          (f) =>
            userLocationsLayer &&
            f.get?.("layer") === userLocationsLayer.get("id"),
        )
      )
        return; // We abort if there is a custom location present

      const source = markerLayer?.getSource();
      source?.clear();
      source?.addFeature(iconFeature);

      // @ts-expect-error dev
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      iconFeature?.getGeometry()?.setCoordinates(coordinate);

      let location: MapLocationType = features
        .filter((feature) => feature.properties?.code !== undefined)
        // @ts-expect-error dev
        .reduce(featuresToLocation(tc), {
          forestTypes: [],
        });
      location.coordinate = to2056(coordinate);
      if (location.forestTypes?.length === 1) {
        location = { ...location, ...location.forestTypes[0] };
      } else {
        location.forestType = undefined;
        location.transitionForestType = undefined;
        location.transition = false;
      }
      setMapLocation(location, resetFormLocation);
      void router.push(`/projection${window.location.search}`);
      if (!location.altitudinalZone) {
        setMapLocation(location, true, true, "f");
      }
    };
    maplibreLayer?.on("loadend" as EventTypes, () => {
      mapLocation.coordinate &&
        handleCoords({ coordinate: to3857(mapLocation.coordinate) }, false);
    });
    map.on("singleclick", handleCoords);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, activeProfile]);

  return (
    <Dialog
      body={
        <ul>
          {mapLocation.forestTypes?.map((ft) => {
            const cantonalFt = ft[`forestType_${activeProfile}`];
            return (
              ft.info && (
                <button
                  className="w-full rounded p-2 text-left text-primary-500 hover:bg-gray-100"
                  key={ft.forestType}
                  onClick={() => {
                    setMapLocation({ ...mapLocation, ...ft }, true);
                    void router.push(`/projection${window.location.search}`);
                  }}
                >
                  <h4 className="text-primary-500">
                    {ft.transition
                      ? `${cantonalFt ?? ft.forestType} (${
                          ft.transitionForestType
                        })`
                      : (cantonalFt ?? ft.forestType)}
                  </h4>
                  <p>{ft.info[i18n.language as TreeAppLanguage]}</p>
                </button>
              )
            );
          })}
        </ul>
      }
      className="!max-w-[600px]"
      onClose={() => setMapLocation({ ...mapLocation, forestTypes: [] })}
      open={
        !mapLocation.forestType && (mapLocation?.forestTypes?.length ?? 0) > 1
      }
      title={t("forestType.select")}
    />
  );
}

export default MapLocation;
