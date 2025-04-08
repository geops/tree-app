import { useTranslation } from "react-i18next";

import useStore from "@/store";

import Switch from "../ui/Switch";

function TransitionSwitcherField() {
  const { t } = useTranslation();
  const setFormLocation = useStore((state) => state.setFormLocation);
  const location = useStore((state) => state.location);
  const projectionMode = useStore((state) => state.projectionMode);
  const mapLocation = useStore((state) => state.mapLocation);
  const formLocation = useStore((state) => state.formLocation);
  const { options: opts } = useStore((state) =>
    state.projectionMode === "m"
      ? state.projectionResult?.extreme
      : state.projectionResult.form,
  );
  if (!opts?.forestType?.length) return null;
  return (
    <Switch
      checked={!!location.transition}
      className="my-2"
      label={t("projection.transition.label")}
      onChange={(checked) => {
        const mapLocationHasTransition =
          projectionMode === "m" && mapLocation.transition;
        setFormLocation(
          {
            ...formLocation,
            transition: checked,
          },
          mapLocationHasTransition ? "f" : undefined,
        );
      }}
    />
  );
}

export default TransitionSwitcherField;
