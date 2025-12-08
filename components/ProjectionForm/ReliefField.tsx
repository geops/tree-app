import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import useStore from "@/store";

import ButtonGroup from "../ui/ButtonGroup";

import type { ReliefCode } from "@geops/tree-lib/types";

import type { TreeAppLanguage } from "@/i18n/i18next";

import type { ButtonGroupItem } from "../ui/ButtonGroup";

function ReliefField() {
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
    if (!options.relief?.length) return [];
    const reliefOpts = treeClient.getTypes<{
      code: ReliefCode;
      de?: string;
      fr?: string;
    }>(
      "relief",
      ["code", i18n.language],
      {
        code: `IN (${options.relief.map((ft) => `'${ft}'`).join(", ")})`,
      },
      "ORDER BY code DESC",
    );

<<<<<<< HEAD
=======
    const hasUnknown = reliefOpts.some((opt) => opt.code === "unknown");
    const shouldUseFirstAsDefault = !formLocation?.relief && !hasUnknown;

>>>>>>> 8f37c87 (fix: activate first item for relief field if non selected)
    return (
      reliefOpts.map((opt, index) => {
        return {
          active: formLocation?.relief
            ? formLocation?.relief === opt.code
            : shouldUseFirstAsDefault
              ? index === 0
              : opt.code === "unknown",
          label: opt[i18n.language as TreeAppLanguage],
          onClick: () => setFormLocation({ relief: opt.code }),
        };
      }) ?? []
    );
  }, [
    formLocation?.relief,
    i18n.language,
    options.relief,
    setFormLocation,
    treeClient,
  ]);

  if (items.length <= 1) return null;

  return <ButtonGroup items={items} label={t("relief.label")} />;
}

export default ReliefField;
