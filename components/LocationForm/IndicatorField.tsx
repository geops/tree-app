import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { TreeAppLanguage } from "@/i18n/i18next";
import useStore from "@/store";

import LatinSwitcher from "../LatinSwitcher";
import Dropdown from "../ui/Dropdown";

import type { TranslatedTypeRecordLatin } from "@geops/tree-lib/types";

import type { DropdownOption } from "../ui/Dropdown";

function IndicatorField() {
  const { i18n } = useTranslation();
  const { options: opts } = useStore((state) => state.locationResult);
  const formLocation = useStore((state) => state.formLocation);
  const setFormLocation = useStore((state) => state.setFormLocation);
  const treeClient = useStore((state) => state.treeClient);
  const latinActive = useStore((state) => state.latinActive);

  const options = useMemo(() => {
    if (!opts?.indicator?.length) return [];
    const indicators = treeClient.getTypes<TranslatedTypeRecordLatin>(
      "indicator",
      ["code", "la", i18n.language],
      opts?.indicator?.length
        ? { code: `IN (${opts.indicator.map((ind) => `${ind}`).join(", ")})` }
        : undefined,
    );

    return (
      indicators
        .filter((ind) => opts.indicator?.includes(ind.code))
        .map((ind) => ({
          filterValue: `${ind.la} ${ind[i18n.language as TreeAppLanguage]}`,
          label: latinActive ? ind.la : ind[i18n.language as TreeAppLanguage],
          value: ind.code,
        })) ?? []
    );
  }, [opts?.indicator, i18n.language, treeClient, latinActive]);

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
            indicators:
              (vals as DropdownOption[])?.map(
                (opt: DropdownOption) => opt.value,
              ) ?? [],
          });
        }}
        options={options}
        value={options.filter((opt) =>
          formLocation.indicators?.includes(opt.value),
        )}
      />
    </>
  );
}

export default IndicatorField;
