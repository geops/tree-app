import { useTranslation } from "react-i18next";

import useStore from "@/store";

import Switch from "./ui/Switch";

function LatinSwitcher({
  className,
  classNameContainer,
  classNameLabel,
  classNameSlider,
  label,
}: {
  className?: string;
  classNameContainer?: string;
  classNameLabel?: string;
  classNameSlider?: string;
  label?: React.ReactNode;
}) {
  const { t } = useTranslation();
  const latinActive = useStore((state) => state.latinActive);
  const setLatinActive = useStore((state) => state.setLatinActive);

  return (
    <Switch
      checked={latinActive}
      className={className}
      classNameContainer={classNameContainer}
      classNameLabel={classNameLabel}
      classNameSlider={classNameSlider}
      label={label ?? t("app.latinActive")}
      onChange={setLatinActive}
    />
  );
}

export default LatinSwitcher;
