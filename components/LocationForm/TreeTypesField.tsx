import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { TreeAppLanguage } from "@/i18n/i18next";
import useStore from "@/store";
import { getTypeOptions } from "@/utils/getTypeOptions";

import LatinSwitcher from "../LatinSwitcher";
import Dropdown from "../ui/Dropdown";

import type { TranslatedTypeRecordLatin } from "@geops/tree-lib/types";

import type { DropdownOption } from "../ui/Dropdown";

function TreeTypesField() {
  const { i18n } = useTranslation();
  const { options: opts } = useStore((state) => state.locationResult);
  const formLocation = useStore((state) => state.formLocation);
  const setFormLocation = useStore((state) => state.setFormLocation);
  const treeClient = useStore((state) => state.treeClient);
  const latinActive = useStore((state) => state.latinActive);

  const options = useMemo(() => {
    return getTypeOptions<TranslatedTypeRecordLatin, DropdownOption>({
      codes: opts?.treeType ?? [],
      columns: ["code", "la", i18n.language],
      mapOption: (tt) => ({
        filterValue: `${tt.la} ${tt[i18n.language as TreeAppLanguage]}`,
        label: latinActive ? tt.la : tt[i18n.language as TreeAppLanguage],
        value: tt.code,
      }),
      treeClient,
      type: "treetype",
    });
  }, [opts, i18n.language, treeClient, latinActive]);

  return (
    <>
      <LatinSwitcher />
      <br />
      <Dropdown
        component="combobox"
        isDisabled={!options?.length}
        isMulti
        onChange={(vals) => {
          setFormLocation({
            treeTypes:
              (vals as DropdownOption[])?.map(
                (opt: DropdownOption) => opt.value,
              ) ?? [],
          });
        }}
        options={options}
        value={options.filter((opt) =>
          formLocation.treeTypes?.includes(opt.value),
        )}
      />
    </>
  );
}

export default TreeTypesField;
