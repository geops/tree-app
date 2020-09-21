import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import resources from './resources';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'de',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // not needed for React as it escapes by default
    },
    resources,
  });

if (['de', 'fr'].includes(i18n.language) === false) {
  i18n.changeLanguage('de');
}

export default i18n;
