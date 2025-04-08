import { useTranslation } from "react-i18next";

import useStore from "@/store";

import Input from "../ui/Input";

let typeTimeout: ReturnType<typeof setTimeout>;

function TreeHeightField() {
  const { t } = useTranslation();
  const formLocation = useStore((state) => state.formLocation);
  const setFormLocation = useStore((state) => state.setFormLocation);

  return (
    <>
      <Input
        defaultValue={formLocation?.coniferTreeHeightMax ?? ""}
        label={`${t("forestType.coniferTreeHeightMax") as string} [m]`}
        onChange={(evt) => {
          clearTimeout(typeTimeout);
          typeTimeout = setTimeout(() => {
            setFormLocation({
              coniferTreeHeightMax: evt.target.value
                ? parseInt(evt.target.value, 10)
                : undefined,
            });
          }, 200);
        }}
        type="number"
      />
      <br />
      <Input
        defaultValue={formLocation?.deciduousTreeHeightMax ?? ""}
        label={`${t("forestType.deciduousTreeHeightMax") as string} [m]`}
        onChange={(evt) => {
          clearTimeout(typeTimeout);
          typeTimeout = setTimeout(() => {
            setFormLocation({
              deciduousTreeHeightMax: evt.target.value
                ? parseInt(evt.target.value, 10)
                : undefined,
            });
          }, 200);
        }}
        type="number"
      />
    </>
  );
}

export default TreeHeightField;
