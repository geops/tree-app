import { useTranslation } from "react-i18next";

import Grid from "./Grid";

function SoilWetnessTailwater({ data }: { data: number[][] }) {
  const { t } = useTranslation();
  return (
    <Grid
      data={data}
      header={t("forestTypeDiagram.soilWetness.tailwater")}
      headerX={t("forestTypeDiagram.soilWetness.label")}
      headerY={t("forestTypeDiagram.soilWetness.permeability")}
      labelX={[
        t("forestTypeDiagram.soilWetness.stagnogley"),
        t("forestTypeDiagram.soilWetness.pseudogley"),
        t("forestTypeDiagram.soilWetness.highPseudogleyed"),
        t("forestTypeDiagram.soilWetness.pseudogleyed"),
        t("forestTypeDiagram.soilWetness.lowPseudogleyed"),
        t("forestTypeDiagram.soilWetness.veryLowPseudogleyed"),
      ]}
      labelY={[
        t("forestTypeDiagram.amount.extremelyHigh"),
        t("forestTypeDiagram.amount.veryHigh"),
        t("forestTypeDiagram.amount.high"),
        t("forestTypeDiagram.amount.medium"),
        t("forestTypeDiagram.amount.low"),
        t("forestTypeDiagram.amount.veryLow"),
      ]}
    />
  );
}

export default SoilWetnessTailwater;
