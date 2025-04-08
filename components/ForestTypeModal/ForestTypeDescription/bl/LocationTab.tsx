import { cantonalMappings } from "@geops/tree-lib";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import ForestTypeLinksList from "@/components/ForestTypeLinksList";
import Table from "@/components/ui/Table";
import useStore from "@/store";
import useIsMobile from "@/utils/hooks/useIsMobile";
import parseString from "@/utils/parseString";

import DataTable from "../../../DataTable";
import Relief from "../Relief";

import Site from "./Site";
import { getTilleringTreeTypes, soilIconTranslator } from "./utils";

import type { BlForestType } from "@geops/tree-lib/types";

const vegetationMapping = cantonalMappings?.bl?.vegetation;

function LocationTab({ data }: { data: BlForestType }) {
  const { t } = useTranslation();
  const treeClient = useStore((state) => state.treeClient);
  const setForestTypeDescription = useStore(
    (state) => state.setForestTypeDescription,
  );
  const isMobile = useIsMobile();
  const transitions = useMemo(() => {
    const forestSubTypes = treeClient.getTypes<BlForestType>(
      "bl_foresttype",
      undefined,
      {
        code: `in (${data.transitions.map((c) => `'${c}'`).toString()})`,
      },
    );
    return forestSubTypes;
  }, [data.transitions, treeClient]);

  return (
    <Table stackable={isMobile}>
      <Table.Row className="border-b-0 border-t-0">
        <Table.Cell isHeader>Laubholzanteil</Table.Cell>
        <Table.Cell>
          {data.tilleringhardwood ? `${data.tilleringhardwood}%` : "-"}
        </Table.Cell>
      </Table.Row>
      <Table.Row className="border-b-0 border-t-0">
        <Table.Cell isHeader>Als Hauptbaumart geeignet</Table.Cell>
        <Table.Cell>
          {getTilleringTreeTypes(data.tilleringtreetypes, "D") ?? "-"}
        </Table.Cell>
      </Table.Row>
      <Table.Row className="border-b-0 border-t-0">
        <Table.Cell isHeader>Als Nebenbaumart geeignet</Table.Cell>
        <Table.Cell>
          {getTilleringTreeTypes(data.tilleringtreetypes, "N") ?? "-"}
        </Table.Cell>
      </Table.Row>
      <Table.Row className="border-b-0 border-t-0">
        <Table.Cell isHeader>Baumart mitpflegen</Table.Cell>
        <Table.Cell>
          {getTilleringTreeTypes(data.tilleringtreetypes, "S") ?? "-"}
        </Table.Cell>
      </Table.Row>
      <Table.Row className="border-b-0 border-t-0">
        <Table.Cell isHeader>Gastbaumart, als Hauptbaumart geeignet</Table.Cell>
        <Table.Cell>
          {getTilleringTreeTypes(data.tilleringtreetypes, "G") ?? "-"}
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>Eigenschaften</Table.Cell>
        <Table.Cell>{data.properties || "-"}</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>Bestockungsziele</Table.Cell>
        <Table.Cell>{data.tillering || "-"}</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>Verjüngung und Entwicklung</Table.Cell>
        <Table.Cell>
          <p>{parseString(data.forestryrejuvdev) || "-"}</p>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>Pflege</Table.Cell>
        <Table.Cell>
          <p>{parseString(data.forestrycare) || "-"}</p>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>
          {t("bl.forestType.descriptionNaturalForest")}
        </Table.Cell>
        <Table.Cell>
          <p>{parseString(data.descriptionnaturalforest) || "-"}</p>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>Übergänge zu</Table.Cell>
        <Table.Cell>
          <ForestTypeLinksList
            forestTypes={transitions}
            onClick={(evt, code) => setForestTypeDescription(code)}
          />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>Höhenverbreitung</Table.Cell>
        <Table.Cell>
          <p>{parseString(data.heightdispersion) || "-"}</p>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>Standort</Table.Cell>
        <Table.Cell>{data.location || "-"}</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>Geologie</Table.Cell>
        <Table.Cell>{data.geology || "-"}</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>{t("forestType.terrain")}</Table.Cell>
        <Table.Cell>
          <Relief code={data.code} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>Hangneigung & Exposition</Table.Cell>
        <Table.Cell>
          <div style={{ padding: "10px 0" }}>
            <Site data={data.expoandaspect} />
          </div>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>Vegetation</Table.Cell>
        <Table.Cell>
          <p>{parseString(data.vegetation || "-")}</p>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>Zeigerartengruppen</Table.Cell>
        <Table.Cell>
          <DataTable
            data={data.vegetationindicator}
            getLabel={(i) =>
              `${vegetationMapping?.[i]?.toUpperCase()}: ${
                t(
                  `bl.forestType.vegetationIndicators.${vegetationMapping?.[i]}`,
                ) as string
              }`
            }
            getValue={soilIconTranslator}
          />
        </Table.Cell>
      </Table.Row>
    </Table>
  );
}

export default LocationTab;
