import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { DEFAULT_LOCALE, LOCALES, LOCALE_PREFIX } from "./locales";

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: LOCALE_PREFIX,
});

/**
 * Локалізовані Link / redirect / usePathname.
 *
 * Імпортуємо саме їх, а не `next/link`: інакше перехід з польської версії
 * губить префікс і кидає користувача на українську.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
