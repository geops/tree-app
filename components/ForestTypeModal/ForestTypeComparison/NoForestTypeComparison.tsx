import { useTranslation } from "react-i18next";

function NoForestTypeComparison() {
  const { t } = useTranslation();

  return <p>{t("forestTypeModal.noComparisonMessage")}</p>;
}

export default NoForestTypeComparison;
