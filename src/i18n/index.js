import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './resources';

i18n.use(initReactI18next).init({
  lng: 'de',
  debug: process.env.NODE_ENV === 'development',
  interpolation: {
    escapeValue: false, // not needed for React as it escapes by default
  },
  resources,
});

export default i18n;
