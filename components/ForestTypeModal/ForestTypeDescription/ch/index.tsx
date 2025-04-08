import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Fragment, useMemo } from "react";
import { useTranslation } from "react-i18next";

import useStore from "@/store";

import SoilTab, { SoilTabProps } from "./SoilTab";
import TerrainTab, { TerrainTabProps } from "./TerrainTab";
import VegetationTab, { VegetationTabProps } from "./VegetationTab";

import type { ForestType } from "@geops/tree-lib/types";

const categories = [
  {
    id: "forestTypeDiagram.vegetation",
    render: (data: VegetationTabProps["data"]) => <VegetationTab data={data} />,
  },
  {
    id: "forestTypeDiagram.terrain",
    render: (data: TerrainTabProps["data"]) => <TerrainTab data={data} />,
  },
  {
    id: "forestTypeDiagram.soil.header",
    render: (data: SoilTabProps["data"]) => <SoilTab data={data} />,
  },
];

export default function ForestTypeDescription({ code }: { code: string }) {
  const { t } = useTranslation();
  const treeClient = useStore((state) => state.treeClient);
  const dataCh = useMemo(
    () => treeClient.getForestTypeByCode<ForestType>(code),
    [code, treeClient],
  );

  return (
    <TabGroup>
      <TabList>
        {categories.map(({ id }) => (
          <Tab as={Fragment} key={id}>
            {({ selected }) => (
              <button
                className={`mb-[-1px] rounded-t px-6 py-2 ${selected ? "z-10 border border-gray-200 border-b-white font-bold" : ""}`}
              >
                {t(id)}
              </button>
            )}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {categories.map(({ id, render }, idx) => (
          <TabPanel
            className={`${idx === 0 ? "data-[selected]:rounded-tl-none" : ""} rounded border border-gray-200 p-4`}
            key={id}
          >
            {/* @ts-expect-error dev */}
            {render(dataCh)}
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}
