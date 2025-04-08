import { cantonalMappings } from "@geops/tree-lib/";
import { useTranslation } from "react-i18next";

import Table from "@/components/ui/Table";
import useIsMobile from "@/utils/hooks/useIsMobile";
import parseString from "@/utils/parseString";

import DataTable from "../../../DataTable";
import Relief from "../Relief";

import Site from "./Site";
import Tillering from "./Tillering";
import TilleringSingle from "./TilleringSingle";

import type { LuForestType } from "@geops/tree-lib/types";

const vegetationMapping = cantonalMappings?.lu?.vegetation;
const soilMapping = cantonalMappings?.lu?.soil;

function LocationTab({ data }: { data: LuForestType }) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <Table stackable={isMobile}>
      <Table.Row className="border-t-0">
        <Table.Cell isHeader>{t("lu.forestType.tilleringHardwood")}</Table.Cell>
        <Table.Cell>
          <TilleringSingle data={data.tilleringhardwood} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>{t("lu.forestType.tillering")}</Table.Cell>
        <Table.Cell>
          <Tillering data={data.tillering} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell
          isHeader
        >{`${t("lu.forestType.tilleringFirwood") as string} min (opt)`}</Table.Cell>
        <Table.Cell>
          <p>
            {data.tilleringfirwood.every((val) => !val)
              ? "-"
              : `${data.tilleringfirwood[0]}${
                  data.tilleringfirwood[1]
                    ? ` (${data.tilleringfirwood[1]})`
                    : ""
                }`}
          </p>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>{t("lu.forestType.pioneerTreeTypes")}</Table.Cell>
        <Table.Cell>
          <p>{data.pioneertreetypes.join(", ") || "-"}</p>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>{t("lu.forestType.compactRisk.label")}</Table.Cell>
        <Table.Cell>
          <p>{t(`lu.forestType.compactRisk.${data.compactrisk}`)}</p>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>{t("lu.forestType.priority.label")}</Table.Cell>
        <Table.Cell>
          <p>
            {data.priority ? t(`lu.forestType.priority.${data.priority}`) : "-"}
          </p>
        </Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell isHeader>{t("lu.forestType.aptitude")}</Table.Cell>
        <Table.Cell>
          <p>{parseString(data.aptitude)}</p>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>{t("forestType.rejuvDev")}</Table.Cell>
        <Table.Cell>
          <p>{parseString(data.forestryrejuvdev)}</p>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>{t("forestType.care")}</Table.Cell>
        <Table.Cell>
          <p>{parseString(data.forestrycare)}</p>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>{t("lu.forestType.description")}</Table.Cell>
        <Table.Cell>
          <p>{parseString(data.description)}</p>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>{t("lu.forestType.heightDispersion")}</Table.Cell>
        <Table.Cell>
          <p>{parseString(data.heightdispersion)}</p>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>{t("forestType.terrain")}</Table.Cell>
        <Table.Cell>
          <Relief code={data.code} trimCode />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>
          {`${t("forestTypeDiagram.slope") as string} & ${
            t("forestTypeDiagram.aspect.label") as string
          }`}
        </Table.Cell>
        <Table.Cell>
          <div style={{ padding: "10px 0" }}>
            <Site data={data.expoandaspect} />
          </div>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>{t("forestTypeDiagram.vegetation")}</Table.Cell>
        <Table.Cell>
          <p>{parseString(data.vegetation)}</p>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>{t("forestType.vegetationIndicator")}</Table.Cell>
        <Table.Cell>
          <DataTable
            data={data.vegetationindicator}
            getLabel={(i) =>
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              `${vegetationMapping?.[i]?.toUpperCase()}: ${t(
                `lu.forestType.vegetationIndicator.${vegetationMapping?.[i]}`,
              )}`
            }
          />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>{t("lu.forestType.soil.label")}</Table.Cell>
        <Table.Cell>
          <DataTable
            data={data.soil}
            getLabel={(i) =>
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              `${soilMapping?.[i]?.toUpperCase()}: ${t(
                `lu.forestType.soil.typeMapping.${soilMapping?.[i]}`,
              )}`
            }
          />
        </Table.Cell>
      </Table.Row>
    </Table>
  );
}

export default LocationTab;
