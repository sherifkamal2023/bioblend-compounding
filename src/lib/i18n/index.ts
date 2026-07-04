import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./en.json";
import ar from "./ar.json";

export const SUPPORTED_LANGS = [
  { code: "en", label: "English", dir: "ltr" as const },
  { code: "ar", label: "العربية", dir: "rtl" as const },
];

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        ar: { translation: ar },
      },
      fallbackLng: "en",
      supportedLngs: ["en", "ar"],
      interpolation: { escapeValue: false },
      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
        lookupLocalStorage: "bioblend_lang",
      },
    });
}

export function applyLangDir(lang: string) {
  if (typeof document === "undefined") return;
  const entry = SUPPORTED_LANGS.find((l) => l.code === lang) ?? SUPPORTED_LANGS[0];
  document.documentElement.lang = entry.code;
  document.documentElement.dir = entry.dir;
}

export default i18n;
