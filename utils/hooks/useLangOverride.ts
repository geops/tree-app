import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import useStore from "@/store";

import type { TreeAppProfile } from "@geops/tree-lib/types";

import type { TreeAppLanguage } from "@/i18n/i18next";

type ProfileLanguages = {
  [key in TreeAppProfile]?: TreeAppLanguage;
};

export const langOverrides: ProfileLanguages = {
  vd: "fr",
};

function useLangOverride() {
  const activeProfile = useStore((state) => state.activeProfile);
  const { i18n } = useTranslation();
  useEffect(() => {
    if (langOverrides[activeProfile]) {
      void i18n.changeLanguage(langOverrides[activeProfile]);
    }
  }, [activeProfile, i18n]);
}

export default useLangOverride;
