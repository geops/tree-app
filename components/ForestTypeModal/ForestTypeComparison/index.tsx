import { useTranslation } from "react-i18next";

import useStore from "@/store";

import BlForestTypeComparison from "./bl";
import LuForestTypeComparison from "./lu";
function ForestTypeComparison() {
  const { t } = useTranslation();
  const activeProfile = useStore((state) => state.activeProfile);
  if (activeProfile === "lu") return <LuForestTypeComparison />;
  if (activeProfile === "bl") return <BlForestTypeComparison />;
  return <p>{t("forestTypeModal.noComparisonMessage")}</p>;
}

ForestTypeComparison.Header = function ForestTypeComparisonHeader() {
  const { t } = useTranslation();
  return <>{t("forestTypeModal.compare")}</>;
};

export default ForestTypeComparison;
