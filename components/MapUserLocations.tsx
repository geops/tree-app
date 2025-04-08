import { CloseButton } from "@headlessui/react";
import {
  ArrowRightIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { Feature, MapBrowserEvent, Overlay } from "ol";
import { FeatureLike } from "ol/Feature";
import { Point } from "ol/geom";
import { unByKey } from "ol/Observable";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { UserLocationResponse } from "@/pages/api/userlocations";
import useStore from "@/store";
import { useFetch } from "@/utils/hooks/useFetch";
import useUserLocations from "@/utils/hooks/useUserLocations";
import removeIdUrlParam from "@/utils/removeIdUrlParam";

import Spinner from "./icons/Spinner";
import { LayersContext } from "./spatial/components/layer/LayersProvider";
import { MapContext } from "./spatial/components/Map";
import Button from "./ui/Button";
import UserLocationInfo from "./UserLocationInfo";

let abortController = new AbortController();

/**
 * Hook for creating an overlay on the map
 * @returns OL Overlay instance and a reference to the popup div
 */
function useOverlay() {
  const map = useContext(MapContext);
  const [overlay, setOverlay] = useState<null | Overlay>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newOverlay = popupRef.current
      ? new Overlay({
          element: popupRef.current,
          offset: [0, -70],
          positioning: "bottom-center",
          stopEvent: true,
        })
      : null;
    if (newOverlay) {
      setOverlay(newOverlay);
      map.addOverlay(newOverlay);
    }
    return () => {
      newOverlay?.setPosition(undefined);
    };
  }, [setOverlay, map]);

  return { overlay, popupRef };
}

/**
 * Hook for highlighting a feature on the map when the page is loaded with a query parameter
 */
function useHighlightOnLoad() {
  const userLocationsLayer = useContext(LayersContext).userLocationsLayer;
  const setSelectedFeature = useStore((state) => state.setSelectedFeature);
  const selectedFeature = useStore((state) => state.selectedFeature);

  useEffect(() => {
    function onFeaturesLoadEnd() {
      const idParam = new URLSearchParams(window.location.search).get("id");
      if (idParam && userLocationsLayer) {
        const feature = userLocationsLayer
          .getSource()!
          .getFeatures()
          .find((f) => f.get("id") === idParam);
        if (feature) {
          setSelectedFeature(feature);
          userLocationsLayer.set("selectedFeature", feature); // For highlighting
          userLocationsLayer.changed();
        }
      }
    }
    userLocationsLayer?.getSource()?.once("addfeature", onFeaturesLoadEnd);
  }, [userLocationsLayer, setSelectedFeature]);

  useEffect(() => {
    if (!selectedFeature) {
      userLocationsLayer?.set("selectedFeature", undefined);
      userLocationsLayer?.changed();
    }
  }, [selectedFeature, userLocationsLayer]);
}

/**
 * Hook for handling pointer events on the map: adds hover and click listeners to the map
 * @param overlay Openlayers overlay instance https://openlayers.org/en/latest/apidoc/module-ol_Overlay-Overlay.html
 * @returns selected Openlayers feature and a function (writes feature into state, updates the layer of highlighting and sets the overlay coordinate)
 */
function useMapPointerEvents(overlay: null | Overlay) {
  const { userLocationsLayer } = useContext(LayersContext);
  const map = useContext(MapContext);
  const selectedFeature = useStore((state) => state.selectedFeature);
  const setSelectedFeature = useStore((state) => state.setSelectedFeature);

  const selectFeature = useCallback(
    (feature?: FeatureLike) => {
      removeIdUrlParam();
      setSelectedFeature(feature);
      userLocationsLayer.set("selectedFeature", feature); // For highlighting
      const coordinate = (feature?.getGeometry() as Point)?.getCoordinates();
      overlay?.setPosition(coordinate);
      userLocationsLayer.changed();
    },
    [overlay, userLocationsLayer, setSelectedFeature],
  );

  useEffect(() => {
    const olListeners = (["click", "pointermove"] as const).map((eventType) => {
      return map.on(
        eventType,
        (event: MapBrowserEvent<MouseEvent | PointerEvent>) => {
          map.forEachFeatureAtPixel(event.pixel, (feature, layer) => {
            if (eventType === "click") {
              if (layer === userLocationsLayer) {
                selectFeature(feature);
                return true;
              }
              selectFeature();
              return false;
            }

            map.getTargetElement().style.cursor = "";
            if (layer === userLocationsLayer) {
              map.getTargetElement().style.cursor = "pointer";
              return true;
            }
            return false;
          });
        },
      );
    });
    return () => {
      unByKey(olListeners);
    };
  }, [userLocationsLayer, map, overlay, selectFeature]);

  return [selectedFeature, selectFeature] as const;
}

/**
 * Hook for updating OL Features for the userLocations on the map
 * @param selectFeature Function for selecting a feature on the map
 */
function useUpdateMapFeatures(selectFeature: () => void) {
  const { userLocationsLayer } = useContext(LayersContext);
  const map = useContext(MapContext);
  const mapLayers = useStore((state) => state.mapLayers);
  const userLocations = useStore((state) => state.userLocations);
  useEffect(() => {
    if (!map || !userLocationsLayer || !userLocations) return;

    const source = userLocationsLayer.getSource()!;
    source.clear();

    const flatPoints = userLocations && Object.values(userLocations).flat();

    if (flatPoints?.length) {
      const feats = flatPoints.map((point) => {
        const feature = new Feature({
          geometry: new Point(point.coordinate),
        });
        feature.setProperties({
          ...point,
          layer: userLocationsLayer.get("id") as string,
        });
        return feature;
      });
      source.addFeatures(feats);
    }

    if (mapLayers.includes(userLocationsLayer.get("id") as string)) {
      userLocationsLayer.setVisible(true);
    } else {
      userLocationsLayer.setVisible(false);
      selectFeature();
    }

    userLocationsLayer.setVisible(
      mapLayers.includes(userLocationsLayer.get("id") as string),
    );

    userLocationsLayer.changed();
  }, [userLocations, map, userLocationsLayer, mapLayers, selectFeature]);
}

function MapUserLocations() {
  const { t } = useTranslation();
  const setUserLocations = useStore((state) => state.setUserLocations);
  const { data: points } = useUserLocations();
  const { overlay, popupRef } = useOverlay();
  const { fetchData, isLoading } = useFetch<UserLocationResponse>();
  const [selectedFeature, selectFeature] = useMapPointerEvents(overlay);
  const { id, querystring } = selectedFeature?.getProperties() ?? {};
  const canDelete =
    new URLSearchParams(window.location.search).get("del") === "t";

  useHighlightOnLoad();

  useUpdateMapFeatures(selectFeature);

  useEffect(() => {
    setUserLocations(points ?? {});
  }, [points, setUserLocations]);

  return (
    <div
      className="relative flex w-72 flex-col rounded-lg border border-primary-500 bg-white p-3 shadow"
      ref={popupRef}
    >
      <CloseButton
        className="absolute right-1 top-1 h-10 w-10 p-2 text-gray-700"
        onClick={() => selectFeature()}
        title={t("app.close")}
      >
        <XMarkIcon />
      </CloseButton>
      <UserLocationInfo />
      <a
        className="flex items-center gap-1"
        href={`/projection${querystring as string}&pm=f&id=${id}`}
      >
        {t("userLocations.showDetails")} <ArrowRightIcon className="max-h-4" />
      </a>
      <div className="absolute -bottom-3 left-2/4 h-0 w-0 -translate-x-2/4 border-x-[10px] border-t-[10px] border-solid border-x-transparent border-t-primary-500">
        <div className="absolute -left-[9px] -top-[12px] h-0 w-0 border-x-[9px] border-t-[9px] border-solid border-x-transparent border-t-white" />
      </div>
      {canDelete ? (
        <Button
          className="my-2 flex w-full items-center justify-center gap-2"
          disabled={isLoading}
          onClick={() => {
            abortController.abort();
            abortController = new AbortController();
            void fetchData(`/api/userlocations?id=${id}`, {
              method: "DELETE",
              signal: abortController.signal,
            }).then((jsonData) => {
              setUserLocations(jsonData.data!);
              overlay?.setPosition(undefined);
            });
          }}
        >
          {isLoading ? (
            <>
              <Spinner />
              {t("userLocations.loading")}
            </>
          ) : (
            <>
              <TrashIcon className="max-h-6 w-6" /> {t("userLocations.delete")}
            </>
          )}
        </Button>
      ) : null}
    </div>
  );
}

export default MapUserLocations;
