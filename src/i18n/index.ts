import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './locales/en.json';
import zuTranslations from './locales/zu.json';
import esTranslations from './locales/es.json';
import ptTranslations from './locales/pt.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      zu: { translation: zuTranslations },
      es: { translation: esTranslations },
      pt: { translation: ptTranslations },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;