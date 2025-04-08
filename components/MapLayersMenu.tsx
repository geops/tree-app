import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useContext, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import useStore from "@/store";

import getIsAz, { azLayers } from "../utils/getIsAzLayer";

import LayersIcon from "./icons/LayersIcon";
import MapBaselayerSwitcher from "./MapBaselayerSwitcher";
import {
  getStyle,
  LayersContext,
  mapStyle,
} from "./spatial/components/layer/LayersProvider";
import { buttonStyles, outlinedStyles } from "./ui/Button";
import Checkbox from "./ui/Checkbox";
import InfoModal from "./ui/Modal";
import RadioGroup from "./ui/RadioGroup";

import type { TranslatedTypeRecord } from "@geops/tree-lib/types";

import type { TreeAppLanguage } from "@/i18n/i18next";

import type { TreeAppLayerSpecification } from "./spatial/components/layer/LayersProvider";

const getLayersByGroup = (group: string) =>
  mapStyle.layers.filter(
    (l: TreeAppLayerSpecification) => l.metadata && l.metadata.group === group,
  );

function LegendModal({
  layerStyle,
}: {
  layerStyle: TreeAppLayerSpecification;
}) {
  const {
    i18n: { language: lng },
  } = useTranslation();
  const treeClient = useStore((state) => state.treeClient);

  const info = useMemo(
    () => (type: string, code?: null | string) =>
      treeClient.getTypes<TranslatedTypeRecord>(
        `${type.toLowerCase()}`,
        ["code", lng],
        code ? { code: `= '${code}'` } : undefined,
      ),
    [lng, treeClient],
  );

  const legend = useMemo(() => {
    if (!layerStyle?.metadata) {
      return null;
    }
    let code: null | string;
    const { type } = layerStyle.metadata;

    const layerFillColor = layerStyle.paint["fill-color"];

    return Array.isArray(layerFillColor)
      ? layerFillColor
          .map((fc) => {
            const row: { color: string; label?: null | string } = {
              color: fc as string,
            };
            if (typeof fc === "string" && fc.startsWith("#") && code) {
              row.label =
                type === "altitudinalZone" && code.startsWith("8")
                  ? `${info("altitudinalZone", "80")?.[0]?.[lng as TreeAppLanguage]} ${info("silverFirArea", code?.[1])?.[0]?.[lng as TreeAppLanguage]}`
                  : info(type, code)?.[0]?.[lng as TreeAppLanguage];
              code = null;
            } else {
              code = fc?.toString() ?? null;
            }
            return row;
          })
          .filter((row) => row.label)
      : null;
  }, [info, layerStyle.metadata, layerStyle.paint, lng]);
  return (
    <ul>
      {legend?.map(({ color, label }) => (
        <li className="flex items-center gap-2" key={label}>
          <div
            className="h-5 w-5 rounded border border-gray-200"
            style={{ backgroundColor: color }}
          />
          {label}
        </li>
      ))}
    </ul>
  );
}

function LayertreeItem({
  active,
  className = "",
  label,
  layer,
  onChange,
}: {
  active: boolean;
  className?: string;
  label: string;
  layer: TreeAppLayerSpecification;
  onChange: (checked: boolean) => void;
}) {
  const { t } = useTranslation();
  if (!label) {
    return null;
  }

  const hasLegend =
    layer?.metadata?.type && Array.isArray(layer.paint["fill-color"]);
  return (
    <div className="items center flex justify-between" key={layer.id}>
      <Checkbox
        checked={active}
        className={className}
        label={active ? <b>{label}</b> : label}
        onChange={(checked: boolean) => onChange(checked)}
      />
      {hasLegend ? (
        <InfoModal
          className="!max-w-[500px]"
          title={`${t("map.legend") as string} - ${
            t(
              layer.id === "azt"
                ? "map.altitudinalZones"
                : `map.${layer["source-layer"]}`,
            ) as string
          }`}
        >
          <LegendModal layerStyle={layer} />
        </InfoModal>
      ) : null}
    </div>
  );
}

function MapLayersMenu() {
  const { t } = useTranslation();
  const { maplibreLayer: layer, userLocationsLayer } =
    useContext(LayersContext);
  const mapLayers = useStore((state) => state.mapLayers);
  const setMapLayers = useStore((state) => state.setMapLayers);
  const azLayer = useStore((state) => state.azLayer);
  const activeProfile = useStore((state) => state.activeProfile);
  const mlStyle = getStyle(mapLayers, activeProfile);

  useEffect(() => {
    if (!layer?.maplibreMap) return;
    if (!layer?.maplibreMap?.getStyle()) return;
    layer?.maplibreMap.setStyle({ ...mlStyle });
  }, [layer, mlStyle]);

  return (
    <Popover>
      {({ open }) => {
        return (
          <>
            <PopoverButton className="absolute right-5 top-5 z-50 flex items-center rounded-lg p-1 backdrop-blur-sm sm:w-60">
              <div
                className={`${buttonStyles} ${outlinedStyles} flex w-full justify-between gap-2 border-none !px-3`}
              >
                <div className="flex gap-2">
                  <LayersIcon className="h-6 w-6" />

                  {t("map.layers")}
                </div>
                <ChevronDownIcon
                  className={`h-6 w-6 transition ${open ? "rotate-180" : ""}`}
                />
              </div>
            </PopoverButton>
            <PopoverPanel
              anchor={{ to: "bottom end" }}
              className="z-40 flex !max-h-[80vh] min-w-72 justify-center !overflow-hidden rounded-lg p-1 backdrop-blur-sm"
            >
              <div className="w-full overflow-auto rounded-lg bg-[rgba(255,255,255,0.85)] p-3 shadow-3d">
                <MapBaselayerSwitcher />
                <br />
                <div className="flex flex-col gap-2">
                  {getLayersByGroup("main").map((lyr) => {
                    return (
                      <LayertreeItem
                        active={mapLayers.includes(lyr.id)}
                        key={lyr.id}
                        label={t(`map.${lyr["source-layer"]}`)}
                        layer={lyr}
                        onChange={(active) => {
                          setMapLayers(
                            active
                              ? [...mapLayers, lyr.id]
                              : mapLayers.filter((l) => l !== lyr.id),
                          );
                        }}
                      />
                    );
                  })}
                  <LayertreeItem
                    active={azLayers.some((l) => mapLayers.includes(l))}
                    label={t("map.altitudinalZones")}
                    layer={mapStyle.layers.find((l) => l.id === "azt")!}
                    onChange={(active) => {
                      const nonAzLayers = mapLayers.filter((l) => !getIsAz(l));
                      setMapLayers(
                        !active ? nonAzLayers : [...nonAzLayers, azLayer],
                      );
                    }}
                  />
                  <div className="ml-8 flex flex-col gap-2">
                    <RadioGroup
                      items={getLayersByGroup("altitudinalZones").map((lyr) => {
                        return {
                          label: t(`map.${lyr["source-layer"]}`),
                          value: lyr.id,
                        };
                      })}
                      onChange={(value) => {
                        if (mapLayers.includes(value)) return;
                        setMapLayers([
                          ...mapLayers.filter((l) => !getIsAz(l)),
                          value,
                        ]);
                      }}
                      // @ts-expect-error Let value be null in order to deselect all options when deactivating the main AZ layer
                      value={
                        azLayers.find((item) => mapLayers.includes(item)) ??
                        null
                      }
                    />
                  </div>
                  <Checkbox
                    checked={mapLayers.includes(
                      userLocationsLayer.get("id") as string,
                    )}
                    label={
                      mapLayers.includes(
                        userLocationsLayer.get("id") as string,
                      ) ? (
                        <b>{t("userLocations.layer")}</b>
                      ) : (
                        t("userLocations.layer")
                      )
                    }
                    onChange={(checked: boolean) => {
                      setMapLayers(
                        checked
                          ? [
                              ...mapLayers,
                              userLocationsLayer.get("id") as string,
                            ]
                          : mapLayers.filter(
                              (l) => l !== userLocationsLayer.get("id"),
                            ),
                      );
                    }}
                  />
                </div>
              </div>
            </PopoverPanel>
          </>
        );
      }}
    </Popover>
  );
}

export default MapLayersMenu;
