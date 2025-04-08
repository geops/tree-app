import { useTranslation } from "react-i18next";

import useStore from "@/store";

import BlForestTypeComparison from "./bl";
import LuForestTypeComparison from "./lu";
import NoForestTypeComparison from "./NoForestTypeComparison";
function ForestTypeComparison() {
  const activeProfile = useStore((state) => state.activeProfile);

  return (
    <>
      {/^(ch|vd|so)$/.test(activeProfile) && <NoForestTypeComparison />}
      {activeProfile === "lu" && <LuForestTypeComparison />}
      {activeProfile === "bl" && <BlForestTypeComparison />}
    </>
  );
}

ForestTypeComparison.Header = function ForestTypeComparisonHeader() {
  const { t } = useTranslation();
  return <>{t("forestTypeModal.compare")}</>;
};

export default ForestTypeComparison;
