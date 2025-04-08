import useStore from "@/store";

import useTranslatedOptions from "../../utils/hooks/useTranslatedOptions";
import Dropdown from "../ui/Dropdown";

import type { TreeLocationGroup } from "@geops/tree-lib/types";

import type { DropdownOption } from "../ui/Dropdown";

function GroupsField() {
  const setFormLocation = useStore((state) => state.setFormLocation);
  const formLocation = useStore((state) => state.formLocation);
  const options = useTranslatedOptions("group");

  return (
    <>
      <Dropdown
        component="combobox"
        isMulti
        onChange={(vals) => {
          const groups = ((vals as DropdownOption[])?.map((opt) => opt.value) ??
            []) as TreeLocationGroup[];
          setFormLocation({
            groups: groups?.length ? groups : undefined,
          });
        }}
        options={options}
        value={options.filter((opt) =>
          formLocation?.groups?.includes(opt.value as TreeLocationGroup),
        )}
      />
    </>
  );
}

export default GroupsField;
