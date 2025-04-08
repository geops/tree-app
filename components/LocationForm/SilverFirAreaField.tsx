import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { TreeAppLanguage } from "@/i18n/i18next";
import useStore from "@/store";

import Dropdown from "../ui/Dropdown";
import Input from "../ui/Input";

import type { SilverFirArea, SilverFirAreaCode } from "@geops/tree-lib/types";

import type { DropdownOption } from "../ui/Dropdown";

function SilverFirAreaField() {
  const { i18n, t } = useTranslation();
  const { options: opts } = useStore((state) => state.locationResult);
  const location = useStore((state) => state.location);
  const setFormLocation = useStore((state) => state.setFormLocation);
  const formLocation = useStore((state) => state.formLocation);
  const mapLocation = useStore((state) => state.mapLocation);
  const treeClient = useStore((state) => state.treeClient);
  const projectionMode = useStore((state) => state.projectionMode);

  const options = useMemo(() => {
    if (projectionMode === "m" || !opts?.silverFirArea?.length) return [];
    const silverFirAreas = treeClient.getTypes<SilverFirArea>(
      "silverfirarea",
      ["code", i18n.language],
      opts?.silverFirArea?.length
        ? {
            code: `IN (${opts.silverFirArea.map((sfa) => `'${sfa}'`).join(", ")})`,
          }
        : undefined,
    );

    return (
      silverFirAreas
        .filter((sfa) => opts.silverFirArea?.includes(sfa.code))
        .map((sfa) => ({
          label: sfa[i18n.language as TreeAppLanguage],
          value: sfa.code,
        })) ?? []
    );
  }, [opts?.silverFirArea, i18n.language, treeClient, projectionMode]);

  if (projectionMode === "m") {
    return (
      <Input
        className="opacity-50"
        disabled
        label={t("silverFirArea.label")}
        value={
          location.silverFirArea
            ? treeClient.getTypes<Record<TreeAppLanguage, string>>(
                "silverfirarea",
                [i18n.language],
                {
                  code: `= '${location.silverFirArea}'`,
                },
              )?.[0]?.[i18n.language as TreeAppLanguage]
            : "-"
        }
      />
    );
  }

  if (!opts.silverFirArea?.length) {
    return null;
  }

  return (
    <Dropdown
      defaultValue={options.find((opt) => opt.value === location.silverFirArea)}
      isClearable={formLocation.silverFirArea !== mapLocation.silverFirArea}
      label={t("silverFirArea.label")}
      onChange={(opt) => {
        setFormLocation({
          silverFirArea:
            ((opt as DropdownOption)?.value as SilverFirAreaCode) ?? "",
        });
      }}
      options={options}
    />
  );
}

export default SilverFirAreaField;
