import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import InfoIcon from "@/components/icons/InfoIcon";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ProfileSelect from "@/components/ProfileSelect";
import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import useStore from "@/store";

import type { ForestType } from "@geops/tree-lib/types";

import type { DropdownOption } from "@/components/ui/Dropdown";
import type { TreeAppLanguage } from "@/i18n/i18next";

function Index() {
  const { i18n } = useTranslation();
  const tc = useStore((state) => state.treeClient);
  const setForestTypeDescription = useStore(
    (state) => state.setForestTypeDescription,
  );

  const [forestType, setForestType] = useState<string>("");
  const ftOptions = useMemo(() => {
    return tc
      .getTypes<ForestType>(undefined, ["code", "de", "fr"], {
        de: "not null",
      })
      ?.map((ft: ForestType) => {
        const ftName = ft[i18n.language as TreeAppLanguage] ?? ft.de;
        return {
          filterValue: `${ft.code} - ${ftName}`,
          label: (
            <div className="grid grid-cols-[min-content,min-content,auto] gap-2">
              <span>{ft.code}</span>
              {ftName && (
                <>
                  <span>-</span>
                  <span className="text-left">{ftName}</span>
                </>
              )}
            </div>
          ),
          value: ft.code,
        };
      });
  }, [i18n.language, tc]);

  return (
    <div className="flex flex-col gap-4 p-5">
      {ftOptions && (
        <Dropdown
          className="w-full"
          closeMenuOnSelect
          component="combobox"
          isClearable
          onChange={(opt) => setForestType((opt as DropdownOption)?.value)}
          options={ftOptions}
          value={ftOptions.find((opt) => opt.value === forestType)}
        />
      )}
      {forestType && (
        <Button
          className="!px-2 !py-2"
          onClick={() => setForestTypeDescription(forestType)}
        >
          <InfoIcon color="white" />
        </Button>
      )}
      <LanguageSwitcher />
      <ProfileSelect />
    </div>
  );
}

export default Index;
