import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import ExportButton from "@/components/ExportButton";
import Button from "@/components/ui/Button";
import { TreeAppLanguage } from "@/i18n/i18next";
import useStore from "@/store";
import exportLocationBl from "@/utils/docx/bl/exportLocation";
import exportLocationLu from "@/utils/docx/lu/exportLocation";

import getComparisonForestTypes from "../ForestTypeComparison/getComparisonForestTypes";

import type { BlForestType, LuForestType } from "@geops/tree-lib/types";

function HeaderButtons({ data }: { data: BlForestType | LuForestType }) {
  const { i18n, t } = useTranslation();
  const setForestTypeComparison = useStore(
    (state) => state.setForestTypeComparison,
  );
  const comparison = useStore((state) => state.forestTypeComparison) || [];
  const activeProfile = useStore((state) => state.activeProfile);

  const exportDocx = useCallback(() => {
    return activeProfile === "bl"
      ? exportLocationBl(
          data as BlForestType,
          i18n.language as TreeAppLanguage,
          t,
        )
      : exportLocationLu(
          data as LuForestType,
          i18n.language as TreeAppLanguage,
          t,
        );
  }, [activeProfile, data, i18n.language, t]);

  return (
    <div className="mb-4 flex items-center justify-between gap-2">
      <Button
        onClick={() =>
          setForestTypeComparison(
            getComparisonForestTypes(comparison, data.code),
          )
        }
      >
        {t("forestTypeModal.compare")}
      </Button>
      <ExportButton onClick={() => exportDocx()}>
        {t("export.exportForestTypeDescription")}
      </ExportButton>
    </div>
  );
}

export default HeaderButtons;
