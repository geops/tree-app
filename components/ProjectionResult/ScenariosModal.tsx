import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import useStore from "@/store";
import useIsMobile from "@/utils/hooks/useIsMobile";
import { getScenarioButtonContent } from "@/utils/projectionResultUtils";

import Modal from "../ui/Modal";
import Table from "../ui/Table";

import ScenarioHeader from "./ScenarioHeader";
import TreeTypeList from "./TreeTypeList";

import type { ReactNode } from "react";

import type { Scenario } from "./Scenarios";

interface ScenariosModalProps {
  onClose: () => void;
  open: boolean;
  scenarios: Scenario[];
}

interface TableRows {
  dominant: ReactNode[];
  headers: ReactNode[];
  important: ReactNode[];
  other: ReactNode[];
}

const classesCell = "bg-primary-500 text-white flex items-center py-2";

// We define the classes here so tailwind can precompile them
// tailwind needs to check files for arbitrary values first so we can't create them dynamically
const gridCols2 = "grid-cols-[160px,1fr]";
const gridCols3 = "grid-cols-[160px,1fr,1fr]";
const gridCols4 = "grid-cols-[160px,1fr,1fr,1fr]";

const getGridCols = (scenariosLength: number) => {
  if (scenariosLength === 1) {
    return gridCols2;
  }
  if (scenariosLength === 2) {
    return gridCols3;
  }
  if (scenariosLength === 3) {
    return gridCols4;
  }
};

function ScenariosDesktop({ scenarios }: { scenarios: Scenario[] }) {
  const { t } = useTranslation();
  const treeClient = useStore((state) => state.treeClient);
  const cells: {
    dominant: React.ReactNode[];
    headers: React.ReactNode[];
    important: React.ReactNode[];
    other: React.ReactNode[];
  } = useMemo(() => {
    return scenarios.reduce(
      (acc: TableRows, { name, projection }: Scenario) => {
        if (!projection.altitudinalZone || !projection.forestType) {
          return acc;
        }
        const [one, two, three] = treeClient.getVegetationList(
          projection,
          true,
        );
        const content = getScenarioButtonContent(name, t);
        return {
          dominant: [
            ...acc.dominant,
            <Table.Cell className={classesCell} key={name}>
              <TreeTypeList codes={one} />
            </Table.Cell>,
          ],
          headers: [
            ...acc.headers,
            <Table.Cell
              className={`flex items-center gap-2 rounded-t-lg text-xl font-bold ${classesCell} border-b !p-0`}
              isHeader
              key={name}
            >
              <ScenarioHeader
                altitudinalZone={projection.altitudinalZone}
                classNameIcons="h-10 sm:h-6 md:h-8"
                forestType={projection.forestType}
                icons={content.icons}
                names={content.names}
                scenario={name}
                transitionForestType={projection.transitionForestType}
                trimOnMobile={false}
              />
            </Table.Cell>,
          ],
          important: [
            ...acc.important,
            <Table.Cell className={classesCell} key={name}>
              <TreeTypeList codes={two} />
            </Table.Cell>,
          ],
          other: [
            ...acc.other,
            <Table.Cell className={`rounded-b-lg ${classesCell}`} key={name}>
              <TreeTypeList codes={three} />
            </Table.Cell>,
          ],
        };
      },
      { dominant: [], headers: [], important: [], other: [] },
    );
  }, [scenarios, t, treeClient]);
  return (
    <Table className="rounded border-none">
      <Table.Row
        className={`grid ${getGridCols(scenarios.length)} border-none py-0`}
      >
        <Table.Cell isHeader>
          <div />
        </Table.Cell>
        {cells.headers}
      </Table.Row>
      <Table.Row
        className={`grid ${getGridCols(scenarios.length)} border-none py-0`}
      >
        <Table.Cell className="flex items-center" isHeader>
          <h4>{t("projection.treeTypesOne")}</h4>
        </Table.Cell>
        {cells.dominant}
      </Table.Row>
      <Table.Row
        className={`grid ${getGridCols(scenarios.length)} border-none py-0`}
      >
        <Table.Cell className="flex items-center" isHeader>
          <h4>{t("projection.treeTypesTwo")}</h4>
        </Table.Cell>
        {cells.important}
      </Table.Row>
      <Table.Row
        className={`grid ${getGridCols(scenarios.length)} border-none py-0`}
      >
        <Table.Cell className="flex items-center" isHeader>
          <h4>{t("projection.treeTypesThree")}</h4>
        </Table.Cell>
        {cells.other}
      </Table.Row>
    </Table>
  );
}

function ScenariosMobile({ scenarios }: { scenarios: Scenario[] }) {
  const { t } = useTranslation();
  const treeClient = useStore((state) => state.treeClient);

  return (
    <div className="flex flex-col gap-4 p-2 text-lg">
      {scenarios?.map(({ name, projection }) => {
        if (!projection.altitudinalZone || !projection.forestType) {
          return null;
        }
        const [one, two, three] = treeClient.getVegetationList(
          projection,
          true,
        );
        const content = getScenarioButtonContent(name, t);
        return (
          <div
            className="rounded-lg bg-primary-500 text-white shadow-3d"
            key={name}
          >
            <div className="border-b">
              <ScenarioHeader
                altitudinalZone={projection.altitudinalZone}
                classNameIcons="!h-8"
                forestType={projection.forestType}
                icons={content.icons}
                names={content.names}
                scenario={name}
                transitionForestType={projection.transitionForestType}
                trimOnMobile={false}
              />
            </div>
            <Table className="border-none">
              <Table.Row className="grid items-center gap-4 border-none [grid-template-columns:_clamp(120px,_30%,_200px)_auto]">
                <Table.Cell
                  className="line-clamp-2 truncate whitespace-normal"
                  isHeader
                >
                  {t("projection.treeTypesOne")}
                </Table.Cell>
                <Table.Cell>
                  <TreeTypeList codes={one} />
                </Table.Cell>
              </Table.Row>

              <Table.Row className="grid items-center gap-4 border-none [grid-template-columns:_clamp(120px,_30%,_200px)_auto]">
                <Table.Cell
                  className="line-clamp-2 truncate whitespace-normal"
                  isHeader
                >
                  {t("projection.treeTypesTwo")}
                </Table.Cell>
                <Table.Cell>
                  <TreeTypeList codes={two} />
                </Table.Cell>
              </Table.Row>

              <Table.Row className="grid items-center gap-4 border-none [grid-template-columns:_clamp(120px,_30%,_200px)_auto]">
                <Table.Cell
                  className="line-clamp-2 truncate whitespace-normal"
                  isHeader
                >
                  {t("projection.treeTypesThree")}
                </Table.Cell>
                <Table.Cell>
                  <TreeTypeList codes={three} />
                </Table.Cell>
              </Table.Row>
            </Table>
          </div>
        );
      })}
    </div>
  );
}

function ScenariosModal({ onClose, open, scenarios }: ScenariosModalProps) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <Modal
      body={
        isMobile ? (
          <ScenariosMobile scenarios={scenarios} />
        ) : (
          <ScenariosDesktop scenarios={scenarios} />
        )
      }
      onClose={onClose}
      open={open}
      title={t("projection.modalTitle")}
      Trigger={null}
    />
  );
}

export default ScenariosModal;
