import useStore from "@/store";

import useTranslatedOptions from "../../utils/hooks/useTranslatedOptions";
import Dropdown from "../ui/Dropdown";

import type { SlopeCode } from "@geops/tree-lib/types";

import type { DropdownOption } from "../ui/Dropdown";

function SlopeField() {
  const setFormLocation = useStore((state) => state.setFormLocation);
  const formLocation = useStore((state) => state.formLocation);
  const options = useTranslatedOptions("slope");

  return (
    <>
      <Dropdown
        component="combobox"
        isMulti
        onChange={(vals) => {
          const slopes = ((vals as DropdownOption[])?.map((opt) => opt.value) ??
            []) as SlopeCode[];
          setFormLocation({
            slopes: slopes?.length ? slopes : undefined,
          });
        }}
        options={options}
        value={options.filter((opt) =>
          formLocation?.slopes?.includes(opt.value as SlopeCode),
        )}
      />
    </>
  );
}

export default SlopeField;
