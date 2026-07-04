import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./en.json";
import ar from "./ar.json";

export const SUPPORTED_LANGS = [
  { code: "en", label: "English", dir: "ltr" as const },
  { code: "ar", label: "العربية", dir: "rtl" as const },
];

let initialized = false;

export function initI18n() {
  if (initialized || i18n.isInitialized) return i18n;
  initialized = true;
  const chain = typeof window !== "undefined"
    ? i18n.use(LanguageDetector).use(initReactI18next)
    : i18n.use(initReactI18next);

  chain.init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    lng: typeof window === "undefined" ? "en" : undefined,
    fallbackLng: "en",
    supportedLngs: ["en", "ar"],
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "bioblend_lang",
    },
    react: { useSuspense: false },
  });
  return i18n;
}

export function applyLangDir(lang: string) {
  if (typeof document === "undefined") return;
  const entry = SUPPORTED_LANGS.find((l) => l.code === lang) ?? SUPPORTED_LANGS[0];
  document.documentElement.lang = entry.code;
  document.documentElement.dir = entry.dir;
}

// Initialize eagerly on the client so components can call useTranslation.
if (typeof window !== "undefined") {
  initI18n();
}

export default i18n;
