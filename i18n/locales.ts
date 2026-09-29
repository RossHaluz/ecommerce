export const LOCALES = ["uk", "pl"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "uk";

/** Українська живе на корені, решта — з префіксом. Так усі наявні URL і
 *  позиції в Google лишаються без жодного 301. */
export const LOCALE_PREFIX = "as-needed" as const;

export const LOCALE_LABELS: Record<Locale, string> = {
  uk: "Українська",
  pl: "Polski",
};

/** Для `lang` в <html> і для hreflang. */
export const LOCALE_HTML_LANG: Record<Locale, string> = {
  uk: "uk-UA",
  pl: "pl-PL",
};

export const isLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value);
