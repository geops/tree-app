import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import resources from "./resources";

const defaultLanguage = "de";

const createI18n = async () => {
  const i18n = await i18next
    .createInstance()
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      debug: process.env.NODE_ENV === "development",
      fallbackLng: defaultLanguage,
      interpolation: {
        escapeValue: false, // not needed for React as it escapes by default
      },
      resources,
      supportedLngs: Object.keys(resources),
    });
  return i18n;
};

export const i18n = createI18n();
