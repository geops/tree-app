import { cantonalMappings } from "@geops/tree-lib";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import ForestTypeLink from "@/components/ForestTypeLink";
import ForestTypeLinksList from "@/components/ForestTypeLinksList";
import SoilIcon from "@/components/icons/SoilIcon";
import Table from "@/components/ui/Table";
import useStore from "@/store";
import useIsMobile from "@/utils/hooks/useIsMobile";

import Site from "../../ForestTypeDescription/bl/Site";
import {
  getTilleringTreeTypes,
  soilIconTranslator,
} from "../../ForestTypeDescription/bl/utils";
import Relief from "../../ForestTypeDescription/Relief";
import ComparisonCell from "../ComparisonCell";
import HeaderCell from "../ComparisonHeaderCell";
import ForestTypeDropdown from "../ForestTypeDropdown";

import type { BlForestType } from "@geops/tree-lib/types";

const vegetationMapping = cantonalMappings?.bl?.vegetation;

function BaselForestTypeComparison() {
  const { t } = useTranslation();
  const forestTypeComparison = useStore((state) => state.forestTypeComparison);
  const setForestTypeModal = useStore((state) => state.setForestTypeModal);
  const setForestTypeComparison = useStore(
    (state) => state.setForestTypeComparison,
  );
  const setForestTypeDescription = useStore(
    (state) => state.setForestTypeDescription,
  );
  const treeClient = useStore((state) => state.treeClient);
  const isMobile = useIsMobile();

  const [options, data] = useMemo(() => {
    const forestTypes = treeClient.getTypes<BlForestType>("bl_foresttype");
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

  console.log(data);

  return (
    <div>
      <ForestTypeDropdown options={options} />
      <br />
      <Table stackable={isMobile}>
        {!isMobile && (
          <Table.Row>
            <HeaderCell>Standortstyp</HeaderCell>
            {data.map((ft) => (
              <HeaderCell key={ft.code}>
                <ForestTypeLink code={ft.code} />
              </HeaderCell>
            ))}
          </Table.Row>
        )}
        <Table.Row className="border-t-0 md:border-t">
          <HeaderCell>Lateinische Bezeichnung</HeaderCell>
          {data.map((ft, idx, arr) => (
            <ComparisonCell
              className="align-middle"
              code={ft.code}
              data={ft.la}
              footer={isMobile && idx + 1 !== arr.length && <br />}
              key={ft.code}
            />
          ))}
        </Table.Row>
        <Table.Row>
          <HeaderCell>Laubholzanteil</HeaderCell>
          {data.map((ft) => (
            <ComparisonCell
              className="align-middle"
              code={ft.code}
              data={ft.tilleringhardwood}
              key={ft.code}
              unit="%"
            />
          ))}
        </Table.Row>
        <Table.Row className="!border-t border-b-0">
          <HeaderCell>Als Hauptbaumart geeignet</HeaderCell>
          {data.map((ft) => (
            <ComparisonCell
              className="align-middle"
              code={ft.code}
              data={
                getTilleringTreeTypes(ft?.tilleringtreetypes, "D") ?? undefined
              }
              key={ft.code}
            />
          ))}
        </Table.Row>
        <Table.Row className="border-b-0 border-t-0">
          <HeaderCell>Als Nebenbaumart geeignet</HeaderCell>
          {data.map((ft) => (
            <ComparisonCell
              className="align-middle"
              code={ft.code}
              data={
                getTilleringTreeTypes(ft?.tilleringtreetypes, "N") ?? undefined
              }
              key={ft.code}
            />
          ))}
        </Table.Row>
        <Table.Row className="border-b-0 border-t-0">
          <HeaderCell>Baumart mitpflegen</HeaderCell>
          {data.map((ft) => (
            <ComparisonCell
              className="align-middle"
              code={ft.code}
              data={
                getTilleringTreeTypes(ft?.tilleringtreetypes, "S") ?? undefined
              }
              key={ft.code}
            />
          ))}
        </Table.Row>
        <Table.Row className="border-b-0 border-t-0">
          <HeaderCell>Gastbaumart, als Hauptbaumart geeignet</HeaderCell>
          {data.map((ft) => (
            <ComparisonCell
              className="align-middle"
              code={ft.code}
              data={
                getTilleringTreeTypes(ft?.tilleringtreetypes, "G") ?? undefined
              }
              key={ft.code}
            />
          ))}
        </Table.Row>
        <Table.Row>
          <HeaderCell>Eigenschaften</HeaderCell>
          {data.map((ft, idx, arr) => (
            <ComparisonCell
              code={ft.code}
              data={ft.properties}
              footer={isMobile && idx + 1 !== arr.length && <br />}
              key={ft.code}
            />
          ))}
        </Table.Row>
        <Table.Row>
          <HeaderCell>Bestockungsziele</HeaderCell>
          {data.map((ft) => (
            <ComparisonCell
              code={ft.code}
              data={ft.tillering ?? undefined}
              key={ft.code}
            />
          ))}
        </Table.Row>
        <Table.Row>
          <HeaderCell>Verjüngung und Entwicklung</HeaderCell>
          {data.map((ft) => (
            <ComparisonCell
              code={ft.code}
              data={ft.forestryrejuvdev ?? undefined}
              key={ft.code}
            />
          ))}
        </Table.Row>
        <Table.Row>
          <HeaderCell>Pflege</HeaderCell>
          {data.map((ft, idx, arr) => (
            <ComparisonCell
              className="md:max-w-32 md:overflow-hidden"
              code={ft.code}
              data={ft.forestrycare ?? undefined}
              footer={isMobile && idx + 1 !== arr.length && <br />}
              key={ft.code}
            />
          ))}
        </Table.Row>
        <Table.Row>
          <HeaderCell>{t("bl.forestType.descriptionNaturalForest")}</HeaderCell>
          {data.map((ft, idx, arr) => (
            <ComparisonCell
              code={ft.code}
              data={ft.descriptionnaturalforest ?? undefined}
              footer={isMobile && idx + 1 !== arr.length && <br />}
              key={ft.code}
            />
          ))}
        </Table.Row>
        <Table.Row>
          <HeaderCell>Übergänge zu</HeaderCell>
          {data.map((ft) => {
            const forestSubTypes = treeClient.getTypes<BlForestType>(
              "bl_foresttype",
              undefined,
              {
                code: `in (${ft.transitions.map((c) => `'${c}'`).toString()})`,
              },
            );
            return (
              <ComparisonCell
                className="md:max-w-32 md:overflow-hidden"
                code={ft.code}
                key={ft.code}
              >
                <ForestTypeLinksList
                  forestTypes={forestSubTypes}
                  onClick={(evt, code) => {
                    setForestTypeModal("d");
                    setForestTypeDescription(code);
                  }}
                />
              </ComparisonCell>
            );
          })}
        </Table.Row>
        <Table.Row>
          <HeaderCell>Höhenverbreitung</HeaderCell>
          {data.map((ft) => (
            <ComparisonCell
              code={ft.code}
              data={ft.heightdispersion ?? undefined}
              key={ft.code}
            />
          ))}
        </Table.Row>
        <Table.Row>
          <HeaderCell>Standort</HeaderCell>
          {data.map((ft, idx, arr) => (
            <ComparisonCell
              code={ft.code}
              data={ft.location ?? undefined}
              footer={isMobile && idx + 1 !== arr.length && <br />}
              key={ft.code}
            />
          ))}
        </Table.Row>
        <Table.Row>
          <HeaderCell>Geologie</HeaderCell>
          {data.map((ft, idx, arr) => (
            <ComparisonCell
              code={ft.code}
              data={ft.geology ?? undefined}
              footer={isMobile && idx + 1 !== arr.length && <br />}
              key={ft.code}
            />
          ))}
        </Table.Row>
        <Table.Row>
          <HeaderCell>{t("forestType.terrain")}</HeaderCell>
          {data.map((ft) => (
            <ComparisonCell code={ft.code} key={ft.code}>
              <Relief code={ft.code} />
            </ComparisonCell>
          ))}
        </Table.Row>
        <Table.Row>
          <HeaderCell>Vegetation</HeaderCell>
          <>
            {data.map((ft, idx, arr) => (
              <ComparisonCell
                code={ft.code}
                data={ft.vegetation ?? undefined}
                footer={isMobile && idx + 1 !== arr.length && <br />}
                key={ft.code}
              />
            ))}
          </>
        </Table.Row>
        <Table.Row>
          <HeaderCell>Hangneigung & Exposition</HeaderCell>
          {data.map((ft) => (
            <ComparisonCell code={ft.code} key={ft.code}>
              <Site className={`py-2 sm:max-w-40`} data={ft.expoandaspect} />
            </ComparisonCell>
          ))}
        </Table.Row>
        <Table.Row>
          <HeaderCell>Zeigerartengruppen</HeaderCell>
          {data.map((ft) => (
            <ComparisonCell code={ft.code} key={ft.code}>
              {vegetationMapping?.map((indicator, idx) => {
                const value = soilIconTranslator(ft.vegetationindicator?.[idx]);
                return (
                  <span
                    className={`flex min-w-20 justify-between gap-2.5 ${value ? "opacity-100" : "opacity-40"}`}
                    key={`${ft.code}-${indicator}`}
                  >
                    {indicator.toUpperCase()}
                    {value && <SoilIcon size={10} value={value} />}
                  </span>
                );
              })}
            </ComparisonCell>
          ))}
        </Table.Row>
      </Table>
    </div>
  );
}

export default BaselForestTypeComparison;
