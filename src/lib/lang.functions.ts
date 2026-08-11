import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";

export const LANG_COOKIE = "bioblend_lang";

/**
 * Reads the visitor's saved language from the request cookie so SSR renders
 * the same language the client will hydrate with (no hydration mismatch).
 */
export const getLanguageCookie = createServerFn({ method: "GET" }).handler(async () => {
  const cookie = getRequestHeader("cookie") ?? "";
  const match = cookie.match(new RegExp(`(?:^|;\\s*)${LANG_COOKIE}=([^;]+)`));
  const value = match?.[1] ? decodeURIComponent(match[1]) : "en";
  return { lang: value === "ar" ? "ar" : "en" };
});
