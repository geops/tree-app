import { cantonalMappings } from "@geops/tree-lib";
import { Field } from "@headlessui/react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { TreeAppLanguage } from "@/i18n/i18next";
import useStore from "@/store";

import InfoButton from "../ui/InfoButton";
import Label from "../ui/Label";

import type { ForestType } from "@geops/tree-lib/types";

function CantonalTransitionField() {
  const { i18n, t } = useTranslation();
  const activeProfile = useStore((state) => state.activeProfile);
  const location = useStore((state) => state.location);
  const treeClient = useStore((state) => state.treeClient);
  const setForestTypeDescription = useStore(
    (state) => state.setForestTypeDescription,
  );

  const cantonalTransitionForestTypes = useMemo(() => {
    try {
      const mappedFts =
        cantonalMappings[activeProfile]?.transition?.[
          `${location.forestType}(${location.transitionForestType})`
        ];

      return mappedFts?.length
        ? treeClient.getTypes<ForestType>(
            `${activeProfile}_foresttype`,
            ["code", i18n.language],
            { code: `IN (${mappedFts.map((ft) => `'${ft}'`).join(", ")}` },
          )
        : [];
    } catch {
      return undefined;
    }
  }, [
    activeProfile,
    location.forestType,
    location.transitionForestType,
    treeClient,
    i18n.language,
  ]);

  if (!cantonalTransitionForestTypes?.length) return null;

  return (
    <Field>
      <Label>{t("forestType.cantonalTransitionForestTypes")}</Label>
      {cantonalTransitionForestTypes.map((cft) => {
        const { code, [i18n.language as TreeAppLanguage]: name } = cft;
        return (
          <div key={`cantonal-ft-${code}`}>
            <InfoButton
              circle={false}
              className="h-8 w-8 rounded bg-primary-500 text-white hover:bg-primary-200 hover:text-white"
              disabled
              onClick={() => setForestTypeDescription(code)}
            />
            <span>{`${code}${name ? " - " : ""}`}</span>
            <span>{name ? name : ""}</span>
          </div>
        );
      })}
    </Field>
  );
}

export default CantonalTransitionField;
