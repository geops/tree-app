import { useTranslation } from "react-i18next";

import useStore from "@/store";
import { langOverrides } from "@/utils/hooks/useLangOverride";

import ButtonGroup from "./ui/ButtonGroup";

function LanguageButtonGroup({ fullWidth = false }: { fullWidth?: boolean }) {
  const { i18n, t } = useTranslation();
  const activeProfile = useStore((state) => state.activeProfile);

  if (langOverrides[activeProfile]) return null;

  return (
    <ButtonGroup
      items={[
        {
          active: i18n.language === "de",
          className: fullWidth ? "flex-1" : "min-w-24",
          label: "deutsch",
          onClick: () => void i18n.changeLanguage("de"),
        },
        {
          active: i18n.language === "fr",
          className: fullWidth ? "flex-1" : "min-w-24",
          label: "français",
          onClick: () => void i18n.changeLanguage("fr"),
        },
      ]}
      label={t("app.language")}
    />
  );
}

export default LanguageButtonGroup;
