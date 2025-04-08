import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { TreeAppLanguage } from "@/i18n/i18next";
import useStore from "@/store";

import Dropdown, { DropdownOption } from "./ui/Dropdown";
import Input from "./ui/Input";

import type {
  ForestEcoregion,
  ForestEcoregionCode,
} from "@geops/tree-lib/types";

function ForestEcoregionField() {
  const { i18n, t } = useTranslation();
  const { options: opts } = useStore((state) => state.locationResult);
  const location = useStore((state) => state.location);
  const setFormLocation = useStore((state) => state.setFormLocation);
  const formLocation = useStore((state) => state.formLocation);
  const mapLocation = useStore((state) => state.mapLocation);
  const treeClient = useStore((state) => state.treeClient);
  const projectionMode = useStore((state) => state.projectionMode);
  const pathName = usePathname();

  const options = useMemo(() => {
    if (projectionMode === "m") return [];
    const forestEcoregions = treeClient.getTypes<ForestEcoregion>(
      "forestecoregion",
      ["code", i18n.language],
      opts?.forestEcoregion?.length
        ? {
            code: `IN (${opts.forestEcoregion.map((ecoRegion) => `'${ecoRegion}'`).join(", ")})`,
          }
        : undefined,
    );

    return (
      forestEcoregions
        .filter((ecoRegion) => opts.forestEcoregion?.includes(ecoRegion.code))
        .map((ecoRegion) => ({
          label: ecoRegion[i18n.language as TreeAppLanguage],
          value: ecoRegion.code,
        })) ?? []
    );
  }, [opts?.forestEcoregion, i18n.language, treeClient, projectionMode]);

  if (projectionMode === "m") {
    return /(\/|\/location)$/.test(pathName) ? (
      <Input
        className="opacity-50"
        disabled
        label={t("forestEcoregion.label")}
        value={
          location.forestEcoregion
            ? treeClient.getTypes<ForestEcoregion>(
                "forestecoregion",
                [i18n.language],
                {
                  code: `= '${location.forestEcoregion}'`,
                },
              )?.[0][i18n.language as TreeAppLanguage]
            : "-"
        }
      />
    ) : null;
  }

  if (!opts.forestEcoregion?.length) {
    return null;
  }

  return (
    <Dropdown
      isClearable={formLocation.forestEcoregion !== mapLocation.forestEcoregion}
      label={t("forestEcoregion.label")}
      onChange={(opt) => {
        setFormLocation({
          forestEcoregion:
            ((opt as DropdownOption)?.value as ForestEcoregionCode) ?? "",
        });
      }}
      options={options}
      value={
        options.find((opt) => opt.value === location.forestEcoregion) ?? null
      }
    />
  );
}

export default ForestEcoregionField;
