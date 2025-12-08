import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import useStore from "@/store";

import ButtonGroup from "../ui/ButtonGroup";

import type { TranslatedTypeRecord } from "@geops/tree-lib/types";

import type { TreeAppLanguage } from "@/i18n/i18next";

import type { ButtonGroupItem } from "../ui/ButtonGroup";

function AdditionalField() {
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
    if (!options.additional?.length) return [];
    const additionalOpts = treeClient.getTypes<TranslatedTypeRecord>(
      "additional",
      ["code", i18n.language],
      {
        code: `IN (${options.additional.map((ft) => `'${ft}'`).join(", ")})`,
      },
      "ORDER BY code DESC",
    );

    const hasUnknown = additionalOpts.some((opt) => opt.code === "unknown");
    const shouldUseFirstAsDefault = !formLocation?.additional && !hasUnknown;

    return (
      additionalOpts.map((opt, index) => {
        return {
          active: formLocation?.additional
            ? formLocation?.additional === opt.code
            : shouldUseFirstAsDefault
              ? index === 0
              : opt.code === "unknown",
          label: opt[i18n.language as TreeAppLanguage],
          onClick: () => setFormLocation({ additional: opt.code }),
        };
      }) ?? []
    );
  }, [
    formLocation?.additional,
    i18n.language,
    options.additional,
    setFormLocation,
    treeClient,
  ]);

  if (items.length <= 1) return null;

  return <ButtonGroup items={items} label={t("additional.label")} />;
}

export default AdditionalField;
