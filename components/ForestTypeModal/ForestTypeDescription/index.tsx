import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import useStore from "@/store";
import getForestTypePdfUrl from "@/utils/getForestTypesPdfUrl";
import useHasPdf from "@/utils/hooks/useHasPdf";

import BlForestTypeDescription from "./bl";
import ChForestTypesDescription from "./ch";
import LuForestTypeDescription from "./lu";
import SoForestTypeDescription from "./so";

function useShowForestTypeDescription(code: string, activeProfile: string) {
  const hasPdf = useHasPdf(code && getForestTypePdfUrl(code), ["so"]);

  const showForestTypeDescription = useMemo(
    () => (activeProfile === "so" ? hasPdf : !!code),
    [code, activeProfile, hasPdf],
  );
  return showForestTypeDescription;
}

function ForestTypeDescription() {
  const activeProfile = useStore((state) => state.activeProfile);
  const code = useStore((state) => state.forestTypeDescription);
  const { t } = useTranslation();
  const showForestTypeDescription = useShowForestTypeDescription(
    code!,
    activeProfile,
  );

  if (!code) return null;

  return showForestTypeDescription ? (
    <>
      {activeProfile === "ch" && <ChForestTypesDescription code={code} />}
      {activeProfile === "lu" && <LuForestTypeDescription code={code} />}
      {activeProfile === "bl" && <BlForestTypeDescription code={code} />}
      {activeProfile === "so" && <SoForestTypeDescription code={code} />}
      {activeProfile === "vd" && (
        <p className="p-2">{t("forestTypeModal.noDataMessage")}</p>
      )}
    </>
  ) : (
    t("forestTypeModal.noDataMessage")
  );
}

export default ForestTypeDescription;
