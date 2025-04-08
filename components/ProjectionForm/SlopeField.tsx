import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import useStore from "@/store";

import ButtonGroup from "../ui/ButtonGroup";

import type { SlopeCode } from "@geops/tree-lib/types";

import type { TreeAppLanguage } from "@/i18n/i18next";

import type { ButtonGroupItem } from "../ui/ButtonGroup";

function SlopeField() {
  const { i18n, t } = useTranslation();
  const setFormLocation = useStore((state) => state.setFormLocation);
  const formLocation = useStore((state) => state.formLocation);
  const treeClient = useStore((state) => state.treeClient);
  const { options } = useStore((state) =>
    state.projectionMode === "m"
      ? state.projectionResult?.extreme
      : state.projectionResult.form,
  );

  const items: ButtonGroupItem[] = useMemo(() => {
    if (!options.slope?.length) return [];
    const slopeOpts = treeClient.getTypes<{
      code: SlopeCode;
      de?: string;
      fr?: string;
    }>(
      "slope",
      ["code", i18n.language],
      {
        code: `IN (${options.slope.map((ft) => `'${ft}'`).join(", ")})`,
      },
      "ORDER BY code DESC",
    );
    return (
      slopeOpts.map((opt) => {
        return {
          active: formLocation?.slope
            ? formLocation?.slope === opt.code
            : opt.code === "unknown",
          label: opt[i18n.language as TreeAppLanguage],
          onClick: () => setFormLocation({ slope: opt.code }),
        };
      }) ?? []
    );
  }, [
    formLocation?.slope,
    i18n.language,
    options.slope,
    setFormLocation,
    treeClient,
  ]);

  if (items.length <= 1) return null;

  return <ButtonGroup items={items} label={t("slope.label")} />;
}

export default SlopeField;
