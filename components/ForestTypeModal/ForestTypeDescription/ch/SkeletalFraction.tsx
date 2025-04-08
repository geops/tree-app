import { useTranslation } from "react-i18next";

import Grid from "./Grid";

function SkeletalFraction({ data }: { data: number[][] }) {
  const { t } = useTranslation();
  return (
    <Grid
      data={data}
      header=""
      headerX={t("forestTypeDiagram.skeletalFraction")}
      headerY={t("forestTypeDiagram.soilDepth.label")}
      labelX={[
        t("forestTypeDiagram.amount.extremelyHigh"),
        t("forestTypeDiagram.amount.veryHigh"),
        t("forestTypeDiagram.amount.high"),
        t("forestTypeDiagram.amount.medium"),
        t("forestTypeDiagram.amount.low"),
        t("forestTypeDiagram.amount.veryLow"),
      ]}
      labelY={[
        t("forestTypeDiagram.soilDepth.veryShallow"),
        t("forestTypeDiagram.soilDepth.shallow"),
        t("forestTypeDiagram.soilDepth.medium"),
        t("forestTypeDiagram.soilDepth.deep"),
        t("forestTypeDiagram.soilDepth.veryDeep"),
        t("forestTypeDiagram.soilDepth.extremelyDeep"),
      ]}
    />
  );
}

export default SkeletalFraction;
