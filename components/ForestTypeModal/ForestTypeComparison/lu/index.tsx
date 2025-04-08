import { cantonalMappings } from "@geops/tree-lib";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import ForestTypeLink from "@/components/ForestTypeLink";
import SoilIcon from "@/components/icons/SoilIcon";
import Table from "@/components/ui/Table";
import useStore from "@/store";
import useIsMobile from "@/utils/hooks/useIsMobile";

import Relief from "../../ForestTypeDescription/Relief";
import ComparisonCell from "../ComparisonCell";
import HeaderCell from "../ComparisonHeaderCell";
import ForestTypeDropdown from "../ForestTypeDropdown";
import getIsDefinedOrZero from "../getIsDefinedOrZero";
import { getStringWithUnit } from "../getStringWithUnit";

import type { LuForestType } from "@geops/tree-lib/types";
import type { ReactNode } from "react";

const treeTypesMapping = cantonalMappings?.lu?.treeTypes;
const soilMapping = cantonalMappings?.lu?.soil;
interface TreeTypeRow {
  cells: ReactNode;
  treeType: string;
}

function LuzernForestTypeComparison() {
  const { t } = useTranslation();
  const forestTypeComparison = useStore((state) => state.forestTypeComparison);
  const setForestTypeComparison = useStore(
    (state) => state.setForestTypeComparison,
  );
  const treeClient = useStore((state) => state.treeClient);
  const isMobile = useIsMobile();

  const [options, data] = useMemo(() => {
    const forestTypes = treeClient.getTypes<LuForestType>("lu_foresttype");
    return [
      forestTypes?.map((ft) => ({
        label: `${ft.code} - ${ft.de}`,
        value: ft.code,
      })),
      forestTypes?.filter((ft) => forestTypeComparison?.includes(ft.code)),
    ];
  }, [treeClient, forestTypeComparison]);

  useEffect(() => {
    // Sync the query params with the profile forest types
    if (
      !(
        data.length === forestTypeComparison.length &&
        data.every((ft) => forestTypeComparison.includes(ft.code))
      )
    ) {
      setForestTypeComparison(data.map((ft) => ft.code));
    }
  }, [data, setForestTypeComparison, forestTypeComparison]);

  const treeTypeRows: TreeTypeRow[] = useMemo(
    () =>
      (treeTypesMapping ?? []).reduce((treeTypes, currTreeType, idx) => {
        const cells = data.map((ft) => {
          return {
            code: ft.code,
            commercial: ft.tillering?.[1]?.[idx],
            natural: ft.tillering?.[0]?.[idx],
          };
        });
        const hideTreeType = cells.every((cell) => {
          return !cell?.natural?.[0] && !cell?.natural?.[1];
        });
        return hideTreeType
          ? treeTypes
          : [
              ...treeTypes,
              {
                cells: cells.map((cell) => {
                  const natural = cell?.natural?.every(getIsDefinedOrZero)
                    ? getStringWithUnit(cell?.natural?.join(" - "), "%")
                    : null;
                  const commercial = cell?.commercial?.every(getIsDefinedOrZero)
                    ? getStringWithUnit(cell?.commercial?.join(" - "), "%")
                    : null;

                  return (
                    <ComparisonCell
                      className="align-middle"
                      code={cell.code}
                      key={`${currTreeType} - ${cell.code}`}
                    >
                      {natural ? <div>{natural}</div> : "-"}
                      {commercial && <div>({commercial})</div>}
                    </ComparisonCell>
                  );
                }),
                treeType: currTreeType,
              },
            ];
      }, [] as TreeTypeRow[]),
    [data],
  );

  return (
    <div>
      <ForestTypeDropdown options={options} />
      <br />
      {data?.length ? (
        <Table stackable={isMobile}>
          {!isMobile && (
            <Table.Row>
              <HeaderCell>{t("forestType.label")}</HeaderCell>
              {data.map((ft) => (
                <HeaderCell key={ft.code}>
                  <ForestTypeLink code={ft.code} />
                </HeaderCell>
              ))}
            </Table.Row>
          )}
          <Table.Row className="border-t-0">
            <HeaderCell>{t("lu.forestType.tilleringHardwood")}</HeaderCell>
            {data.map((ft) => (
              <ComparisonCell
                code={ft.code}
                data={ft.tilleringhardwood.join(" - ")}
                key={ft.code}
                unit="%"
              />
            ))}
          </Table.Row>
          {treeTypeRows.map((tt, idx) => (
            <Table.Row
              className={`border-b-0 ${idx === 0 ? "border-t" : "border-t-0"}`}
              key={tt.treeType}
            >
              <>
                <Table.Cell
                  className={`${!isMobile ? "grid grid-cols-[2fr,1fr]" : ""} ${idx === 0 ? "" : "!pt-6"}`}
                  isHeader
                >
                  <span>{idx === 0 && t("lu.forestType.tillering")}</span>
                  <div>{tt.treeType}</div>
                </Table.Cell>
                {tt.cells}
              </>
            </Table.Row>
          ))}
          <Table.Row>
            <HeaderCell>{t("lu.forestType.tilleringFirwood")}</HeaderCell>
            {data.map((ft) => (
              <ComparisonCell
                code={ft.code}
                data={ft.tilleringfirwood.join(" - ")}
                key={ft.code}
              />
            ))}
          </Table.Row>
          <Table.Row>
            <HeaderCell>{t("lu.forestType.pioneerTreeTypes")}</HeaderCell>
            {data.map((ft) => (
              <ComparisonCell
                code={ft.code}
                data={ft.pioneertreetypes.join(", ")}
                hasSameValues={false}
                key={ft.code}
              />
            ))}
          </Table.Row>
          <Table.Row>
            <HeaderCell>{t("lu.forestType.priority.label")}</HeaderCell>
            {data.map((ft) => (
              <ComparisonCell
                code={ft.code}
                data={
                  ft.priority ? t(`lu.forestType.priority.${ft.priority}`) : ""
                }
                key={ft.code}
              />
            ))}
          </Table.Row>
          <Table.Row>
            <HeaderCell>{t("lu.forestType.aptitude")}</HeaderCell>
            {data.map((ft, idx, arr) => (
              <ComparisonCell
                code={ft.code}
                data={ft.aptitude ?? ""}
                footer={isMobile && idx + 1 !== arr.length && <br />}
                key={ft.code}
              />
            ))}
          </Table.Row>
          <Table.Row>
            <HeaderCell>{t("forestType.rejuvDev")}</HeaderCell>
            {data.map((ft, idx, arr) => (
              <ComparisonCell
                code={ft.code}
                data={ft.forestryrejuvdev}
                footer={isMobile && idx + 1 !== arr.length && <br />}
                key={ft.code}
              />
            ))}
          </Table.Row>
          <Table.Row>
            <HeaderCell>{t("forestType.care")}</HeaderCell>
            {data.map((ft, idx, arr) => (
              <ComparisonCell
                code={ft.code}
                data={ft.forestrycare}
                footer={isMobile && idx + 1 !== arr.length && <br />}
                key={ft.code}
              />
            ))}
          </Table.Row>
          <Table.Row>
            <HeaderCell>{t("lu.forestType.heightDispersion")}</HeaderCell>
            {data.map((ft) => (
              <ComparisonCell
                code={ft.code}
                data={ft.heightdispersion}
                key={ft.code}
              />
            ))}
          </Table.Row>
          <Table.Row>
            <HeaderCell>{t("forestType.terrain")}</HeaderCell>
            {data.map((ft) => (
              <ComparisonCell code={ft.code} key={ft.code}>
                <Relief code={ft.code} trimCode />
              </ComparisonCell>
            ))}
          </Table.Row>
          <Table.Row>
            <HeaderCell>{t("forestTypeDiagram.vegetation")}</HeaderCell>
            {data.map((ft, idx, arr) => (
              <ComparisonCell
                code={ft.code}
                data={ft.vegetation}
                footer={isMobile && idx + 1 !== arr.length && <br />}
                key={ft.code}
              />
            ))}
          </Table.Row>
          <Table.Row>
            <HeaderCell>{t("lu.forestType.soil.label")}</HeaderCell>
            {data.map((ft) => (
              <ComparisonCell code={ft.code} key={ft.code}>
                {soilMapping?.map((soilType, idx) => {
                  const value = ft.soil[idx];
                  return (
                    <span
                      className={`flex min-w-40 justify-between gap-2.5 md:min-w-[11vw] opacity-${value ? "100" : "40"}`}
                      key={soilType}
                    >
                      {soilType.toUpperCase()}
                      {value && <SoilIcon size={10} value={value} />}
                    </span>
                  );
                })}
              </ComparisonCell>
            ))}
          </Table.Row>
        </Table>
      ) : null}
    </div>
  );
}

export default LuzernForestTypeComparison;
