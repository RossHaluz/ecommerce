import type { Crumb } from "@/lib/breadcrumbs/build-breadcrumb-trail";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/locales";
import { localizedPath } from "./alternates";

interface BreadcrumbJsonLdOptions {
  siteUrl: string;
  locale: string;
  homeLabel: string;
  /** Шлях поточної сторінки без мовного префікса — для останньої ланки (у неї немає href). */
  currentPath: string;
}

/** schema.org BreadcrumbList: Google показує цей шлях у видачі замість голої адреси. */
export function buildBreadcrumbJsonLd(trail: Crumb[], { siteUrl, locale, homeLabel, currentPath }: BreadcrumbJsonLdOptions) {
  const lang = isLocale(locale) ? locale : DEFAULT_LOCALE;
  const links = [{ label: homeLabel, href: "/" }, ...trail.map((c) => ({ label: c.label, href: c.href ?? currentPath }))];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: links.map((link, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: link.label,
      item: `${siteUrl}${localizedPath(link.href, lang)}`,
    })),
  };
}
