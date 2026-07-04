import { useTranslation } from "react-i18next";

/** Returns true when the active i18n language is Arabic. */
export function useIsAr(): boolean {
  const { i18n } = useTranslation();
  return !!i18n.language?.toLowerCase().startsWith("ar");
}
