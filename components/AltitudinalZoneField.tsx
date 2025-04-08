import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { TreeAppLanguage } from "@/i18n/i18next";
import useStore from "@/store";

import Dropdown, { DropdownOption, DropdownProps } from "./ui/Dropdown";
import Input from "./ui/Input";

import type {
  AltitudinalZone,
  AltitudinalZoneCode,
} from "@geops/tree-lib/types";

interface AzfProps extends DropdownProps<DropdownOption> {
  isTarget?: boolean;
  isTransition?: boolean;
  optionsSource?: "location" | "projection";
}

function AltitudinalZoneField({
  isTarget = false,
  isTransition = false,
  optionsSource = "location",
  ...props
}: AzfProps) {
  const { i18n, t } = useTranslation();
  const location = useStore((state) => state.location);
  const setFormLocation = useStore((state) => state.setFormLocation);
  const treeClient = useStore((state) => state.treeClient);
  const projectionMode = useStore((state) => state.projectionMode);
  const pathName = usePathname();
  const azProperty = useMemo(
    () => (isTarget ? "targetAltitudinalZone" : "altitudinalZone"),
    [isTarget],
  );
  const opts = useStore((state) => {
    if (optionsSource === "location") {
      return state.locationResult.options.altitudinalZone;
    }
    return (
      state.projectionResult.form.options[azProperty] ??
      state.projectionResult.moderate.options[azProperty]
    );
  });

  const options = useMemo(() => {
    if ((projectionMode === "m" && !isTransition) || !opts?.length) return [];
    const altitudinalZones = treeClient.getTypes<AltitudinalZone>(
      "altitudinalzone",
      ["code", i18n.language],
      opts?.length
        ? {
            code: `IN (${opts?.map((az) => `'${az}'`).join(", ")})`,
          }
        : undefined,
    );

    return (
      altitudinalZones
        .filter((az) => opts?.includes(az.code))
        .map((az) => ({
          label: az[i18n.language as TreeAppLanguage],
          value: az.code,
        })) ?? []
    );
  }, [opts, i18n.language, treeClient, projectionMode, isTransition]);

  if (projectionMode === "m" && !isTransition) {
    return /(\/|\/location)$/.test(pathName) ? (
      <Input
        className="opacity-50"
        disabled
        label={t("altitudinalZone.label")}
        value={
          location.altitudinalZone
            ? treeClient.getTypes<AltitudinalZone>(
                "altitudinalzone",
                [i18n.language],
                {
                  code: `= '${location.altitudinalZone}'`,
                },
              )?.[0][i18n.language as TreeAppLanguage]
            : "-"
        }
      />
    ) : null;
  }

  if (!opts?.length) {
    return null;
  }

  const compareVal = isTransition
    ? location.transitionAltitudinalZone
    : location[azProperty];

  return (
    <Dropdown
      // defaultValue={options.find((opt) => opt.value === compareVal) ?? null}
      isClearable
      label={t("altitudinalZone.label")}
      onChange={(opt) => {
        const field = isTransition
          ? "transitionAltitudinalZone"
          : "altitudinalZone";
        setFormLocation({
          [field]:
            ((opt as DropdownOption)?.value as AltitudinalZoneCode) ?? "",
        });
      }}
      options={options}
      value={options.find((opt) => opt.value === compareVal) ?? null}
      {...props}
    />
  );
}

export default AltitudinalZoneField;
