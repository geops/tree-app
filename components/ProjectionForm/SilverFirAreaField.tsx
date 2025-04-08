import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import useStore from "@/store";

import ButtonGroup from "../ui/ButtonGroup";

import type { SilverFirAreaCode } from "@geops/tree-lib/types";

import type { TreeAppLanguage } from "@/i18n/i18next";

import type { ButtonGroupItem } from "../ui/ButtonGroup";

function SilverFirAreaField() {
  const { i18n, t } = useTranslation();
  const setFormLocation = useStore((state) => state.setFormLocation);
  const formLocation = useStore((state) => state.formLocation);
  const treeClient = useStore((state) => state.treeClient);
  const projectionMode = useStore((state) => state.projectionMode);
  const { options } = useStore((state) =>
    state.projectionMode === "m"
      ? state.projectionResult?.extreme
      : state.projectionResult.form,
  );

  const items: ButtonGroupItem[] = useMemo(() => {
    if (projectionMode === "m" || !options.silverFirArea?.length) return [];
    const silverFirAreaOpts = treeClient.getTypes<{
      code: SilverFirAreaCode;
      de?: string;
      fr?: string;
    }>(
      "silverfirarea",
      ["code", i18n.language],
      {
        code: `IN (${options.silverFirArea.map((ft) => `'${ft}'`).join(", ")})`,
      },
      "ORDER BY code DESC",
    );
    return (
      silverFirAreaOpts.map((opt) => {
        return {
          active: formLocation?.silverFirArea
            ? formLocation?.silverFirArea === opt.code
            : opt.code === "unknown",
          // className: "w-full sm:w-auto",
          label: opt[i18n.language as TreeAppLanguage],
          onClick: () => setFormLocation({ silverFirArea: opt.code }),
        };
      }) ?? []
    );
  }, [
    formLocation?.silverFirArea,
    i18n.language,
    options.silverFirArea,
    setFormLocation,
    treeClient,
    projectionMode,
  ]);

  if (projectionMode === "m" || items.length <= 1) return null;

  return <ButtonGroup items={items} label={t("silverFirArea.label")} />;
}

export default SilverFirAreaField;
