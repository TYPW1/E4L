import en from "../public/language/en";
import ru from "../public/language/ru";
import fr from "../public/language/fr";
import de from "../public/language/de";
import lu from "../public/language/lu";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translations: en,
    },
    // ru: {
    //   translations: ru,
    // },
    fr: {
      translations: fr,
    },
    de: {
      translations: de,
    },
    lu: {
      translations: lu,
    },
  },
  fallbackLng: "en",

  ns: ["translations"],
  defaultNS: "translations",

  interpolation: {
    escapeValue: false,
    formatSeparator: ",",
  },

  react: {
    wait: true,
  },
});

export default i18n;
