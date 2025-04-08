import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";

import useStore from "@/store";

import HeaderButtons from "../HeaderButtons";

import AssociationsTab from "./AssociationsTab";
import LocationTab from "./LocationTab";

import type { LuForestType } from "@geops/tree-lib/types";

function Index({ code }: { code: string }) {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const treeClient = useStore((state) => state.treeClient);

  const data = treeClient.getForestTypeByCode<LuForestType>(
    code,
    undefined,
    "lu",
  );
  if (!data) return t("forestTypeModal.noDataMessage");
  const categories = [
    {
      component: <LocationTab data={data} />,
      id: "forestType.label",
    },
    {
      component: (
        <AssociationsTab
          data={data}
          onForestTypeChange={() => setSelectedIndex(0)}
        />
      ),
      id: "lu.forestType.associations",
    },
  ];
  return (
    <>
      <HeaderButtons data={data} />
      <hr />
      <TabGroup
        className="mt-4"
        onChange={setSelectedIndex}
        selectedIndex={selectedIndex}
      >
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
          {categories.map(({ component, id }, idx) => (
            <TabPanel
              className={`${idx === 0 ? "data-[selected]:rounded-tl-none" : ""} rounded border border-gray-200 p-4`}
              key={id}
            >
              {component}
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </>
  );
}

export default Index;
