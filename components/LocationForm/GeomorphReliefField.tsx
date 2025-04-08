import { useTranslation } from "react-i18next";

import useStore from "@/store";
import capitalize from "@/utils/capitalize";

import useTranslatedOptions, {
  translationOptions,
} from "../../utils/hooks/useTranslatedOptions";
import Dropdown, { DropdownOption } from "../ui/Dropdown";

function GeomorphReliefField() {
  const { t } = useTranslation();
  const setFormLocation = useStore((state) => state.setFormLocation);
  const formLocation = useStore((state) => state.formLocation);
  const optionsGeomorphology = useTranslatedOptions("geomorphology");
  const optionsReliefType = useTranslatedOptions("reliefType");

  return (
    <>
      <Dropdown
        component="combobox"
        isMulti
        label={t("forestType.geomorphology.label")}
        onChange={(opts) => {
          const newValues = translationOptions.geomorphology.reduce(
            (vals, key: string) => ({
              ...vals,
              [`geomorphology${capitalize(key)}`]: (
                opts as DropdownOption[]
              )?.some((opt) => opt.value === key),
            }),
            {},
          );
          setFormLocation({
            ...newValues,
          });
        }}
        options={optionsGeomorphology}
        value={optionsGeomorphology.filter(
          // @ts-expect-error dev
          (opt) => formLocation[`geomorphology${capitalize(opt.value)}`],
        )}
      />
      <br />
      <Dropdown
        component="combobox"
        isMulti
        label={t("forestType.reliefType.label")}
        onChange={(opts) => {
          const newValues = translationOptions.reliefType.reduce(
            (vals, key: string) => ({
              ...vals,
              [`reliefType${capitalize(key)}`]: (
                opts as DropdownOption[]
              )?.some((opt) => opt.value === key),
            }),
            {},
          );
          setFormLocation({
            ...newValues,
          });
        }}
        options={optionsReliefType}
        value={optionsReliefType.filter(
          // @ts-expect-error dev
          (opt) => formLocation[`reliefType${capitalize(opt.value)}`],
        )}
      />
    </>
  );
}

export default GeomorphReliefField;
