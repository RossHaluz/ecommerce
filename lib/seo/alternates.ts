import type { Metadata } from "next";
import { DEFAULT_LOCALE, LOCALES, LOCALE_HTML_LANG, isLocale, type Locale } from "@/i18n/locales";

/** Шлях сторінки в певній мові: українська на корені, решта з префіксом. */
export const localizedPath = (path: string, locale: Locale) => {
  const clean = path === "/" ? "" : path;
  if (locale === DEFAULT_LOCALE) return clean || "/";
  return `/${locale}${clean}`;
};

/**
 * canonical + hreflang для КОНКРЕТНОЇ сторінки. Задавати лише в сторінці, не в
 * layout: layout не знає шляху, і раніше всі сторінки отримували canonical
 * головної — Google вважав їх копіями головної.
 *
 * `path` — без мовного префікса і без query (?from=, ?page=…).
 */
export function buildAlternates(path: string, rawLocale: string): NonNullable<Metadata["alternates"]> {
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return {
    canonical: localizedPath(path, locale),
    languages: {
      ...Object.fromEntries(LOCALES.map((l) => [LOCALE_HTML_LANG[l], localizedPath(path, l)])),
      "x-default": localizedPath(path, DEFAULT_LOCALE),
    },
  };
}
