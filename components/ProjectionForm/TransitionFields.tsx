import { useTranslation } from "react-i18next";

import useStore from "@/store";

import AltitudinalZoneField from "../AltitudinalZoneField";

import ForestTypeField from "./ForestTypeField";

import type { Location } from "@geops/tree-lib/types";

import type { DropdownOption } from "../ui/Dropdown";

function TransitionFields() {
  const { t } = useTranslation();
  const location = useStore((state) => state.location);
  const setFormLocation = useStore((state) => state.setFormLocation);
  const projectionMode = useStore((state) => state.projectionMode);
  const mapLocation = useStore((state) => state.mapLocation);
  const formLocation = useStore((state) => state.formLocation);
  const { options: opts } = useStore((state) =>
    state.projectionMode === "m"
      ? state.projectionResult?.extreme
      : state.projectionResult.form,
  );

  if (!location.transition) return null;
  if (!opts.transitionForestType?.length && !opts.forestType?.length)
    return null;

  return (
    <div className="w-full rounded border border-gray-200 p-4">
      <ForestTypeField
        isTransition
        label={t("forestType.transition")}
        onChange={(opt) => {
          const mapLocationHasTft =
            projectionMode === "m" && mapLocation.transitionForestType;
          const newFormLocation = (
            mapLocationHasTft
              ? {
                  ...mapLocation,
                  transitionForestType: (opt as DropdownOption)?.value,
                }
              : {
                  ...formLocation,
                  transitionForestType: (opt as DropdownOption)?.value,
                }
          ) as Location;
          setFormLocation(newFormLocation, mapLocationHasTft ? "f" : undefined);
        }}
      />
      <br />
      <AltitudinalZoneField
        isTransition
        label={t("altitudinalZone.transition")}
        onChange={(opt) => {
          const mapLocationHasTraz =
            projectionMode === "m" && mapLocation.transitionAltitudinalZone;
          const newFormLocation = (
            mapLocationHasTraz
              ? {
                  ...mapLocation,
                  transitionAltitudinalZone: (opt as DropdownOption)?.value,
                }
              : {
                  ...formLocation,
                  transitionAltitudinalZone: (opt as DropdownOption)?.value,
                }
          ) as Location;
          console.log(newFormLocation);

          setFormLocation(
            newFormLocation,
            mapLocationHasTraz ? "f" : undefined,
          );
        }}
        optionsSource="projection"
      />
    </div>
  );
}

export default TransitionFields;
