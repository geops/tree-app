import { useTranslation } from "react-i18next";

import useStore from "@/store";

import useTranslatedOptions from "../../utils/hooks/useTranslatedOptions";
import Dropdown from "../ui/Dropdown";

import type { YesNoUnknown } from "@geops/tree-lib/types";

import type { DropdownOption } from "../ui/Dropdown";

function CarbonateField() {
  const { t } = useTranslation();
  const setFormLocation = useStore((state) => state.setFormLocation);
  const formLocation = useStore((state) => state.formLocation);
  const options = useTranslatedOptions("yesNoUnknown");

  return (
    <>
      <Dropdown
        isClearable
        label={t("forestType.carbonate.fine")}
        onChange={(opt) => {
          setFormLocation({
            carbonateFine: (opt as DropdownOption)?.value as YesNoUnknown,
          });
        }}
        options={options}
        value={options.find((opt) => opt.value === formLocation?.carbonateFine)}
      />
      <br />
      <Dropdown
        isClearable
        label={t("forestType.carbonate.rock")}
        onChange={(opt) => {
          setFormLocation({
            carbonateRock: (opt as DropdownOption)?.value as YesNoUnknown,
          });
        }}
        options={options}
        value={options.find((opt) => opt.value === formLocation?.carbonateRock)}
      />
    </>
  );
}

export default CarbonateField;
