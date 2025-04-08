import { useTranslation } from "react-i18next";

import useStore from "@/store";

import AltitudinalZoneField from "../AltitudinalZoneField";

import type { AltitudinalZoneCode } from "@geops/tree-lib/types";

import type { DropdownOption } from "../ui/Dropdown";

function TargetAltitudinalZoneField() {
  const { t } = useTranslation();
  const formLocation = useStore((state) => state.formLocation);
  const mapLocation = useStore((state) => state.mapLocation);
  const setFormLocation = useStore((state) => state.setFormLocation);
  const projectionMode = useStore((state) => state.projectionMode);
  const { options: opts } = useStore((state) => state.projectionResult.form);

  if (projectionMode === "m") return null;
  if ((opts?.targetAltitudinalZone?.length ?? 0) < 1) return null;
  return (
    <AltitudinalZoneField
      isClearable={
        formLocation.targetAltitudinalZone !== mapLocation.targetAltitudinalZone
      }
      isTarget
      label={t("targetAltitudinalZone.label")}
      onChange={(opt) => {
        setFormLocation({
          targetAltitudinalZone: ((opt as DropdownOption)?.value ??
            "") as AltitudinalZoneCode,
        });
      }}
      optionsSource="projection"
    />
  );
}

export default TargetAltitudinalZoneField;
