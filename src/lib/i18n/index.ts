import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import ar from "./ar.json";

export const SUPPORTED_LANGS = [
  { code: "en", label: "English", dir: "ltr" as const },
  { code: "ar", label: "العربية", dir: "rtl" as const },
];

let initialized = false;

export const LANG_STORAGE_KEY = "bioblend_lang";

export function initI18n(lang?: string) {
  const initial = lang === "ar" ? "ar" : "en";
  if (initialized || i18n.isInitialized) {
    setLanguageSync(initial);
    return i18n;
  }
  initialized = true;

  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    lng: initial,
    fallbackLng: "en",
    supportedLngs: ["en", "ar"],
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
  return i18n;
}

/**
 * Applies a language immediately (resources are bundled, so this is
 * synchronous). Used during render so SSR and hydration agree.
 */
export function setLanguageSync(lang: string) {
  const next = lang === "ar" ? "ar" : "en";
  if (i18n.language !== next) void i18n.changeLanguage(next);
}

export function persistLanguage(lang: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    /* storage unavailable */
  }
  document.cookie = `${LANG_STORAGE_KEY}=${encodeURIComponent(lang)}; path=/; max-age=31536000; samesite=lax`;
}


export function applyLangDir(lang: string) {
  if (typeof document === "undefined") return;
  const entry = SUPPORTED_LANGS.find((l) => l.code === lang) ?? SUPPORTED_LANGS[0];
  document.documentElement.lang = entry.code;
  document.documentElement.dir = entry.dir;
}


// Initialize eagerly on both server (SSR) and client so components render
// translated strings on first paint without a raw-key flash.
initI18n();

