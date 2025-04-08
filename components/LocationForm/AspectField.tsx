import useStore from "@/store";

import useTranslatedOptions from "../../utils/hooks/useTranslatedOptions";
import Dropdown, { DropdownOption } from "../ui/Dropdown";

function AspectField() {
  const setFormLocation = useStore((state) => state.setFormLocation);
  const formLocation = useStore((state) => state.formLocation);
  const options = useTranslatedOptions("aspect");

  return (
    <>
      <Dropdown
        component="combobox"
        isMulti
        onChange={(vals) => {
          const aspects = (vals as DropdownOption[])?.map((opt) => opt.value);
          setFormLocation({
            aspects: aspects?.length ? aspects : undefined,
          });
        }}
        options={options}
        value={options.filter((opt) =>
          formLocation?.aspects?.includes(opt.value),
        )}
      />
    </>
  );
}

export default AspectField;
