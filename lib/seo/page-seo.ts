import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { buildAlternates } from "./alternates";

/** Сторінки з власною темою пошуку; тексти — у перекладах `seo.<page>`. */
export type SeoPage = "home" | "catalog";

/** Заголовок, H1 і опис сторінки — одні для метаданих і самої сторінки. */
export async function getPageSeo(locale: string, page: SeoPage) {
  const t = await getTranslations({ locale, namespace: `seo.${page}` });

  return {
    title: t("metaTitle"),
    h1: t("h1"),
    description: t("metaDescription"),
  };
}

export async function buildPageMetadata(locale: string, page: SeoPage, path: string): Promise<Metadata> {
  const { title, description } = await getPageSeo(locale, page);
  return { title, description, openGraph: { title, description }, alternates: buildAlternates(path, locale) };
}
