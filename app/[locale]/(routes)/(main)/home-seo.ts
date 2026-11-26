import { getTranslations } from "next-intl/server";

/** Заголовок, H1 і опис головної під «запчастини до ауді» — одні для метаданих і сторінки. */
export async function getHomeSeo(locale: string) {
  const t = await getTranslations({ locale, namespace: "seo.home" });

  return {
    title: t("metaTitle"),
    h1: t("h1"),
    description: t("metaDescription"),
  };
}
