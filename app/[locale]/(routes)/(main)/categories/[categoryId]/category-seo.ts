import { getTranslations } from "next-intl/server";
import { formatCategoryName } from "@/lib/seo/format-category-name";

/** Заголовок, H1 і опис під запит «деталь + Audi» — одні для метаданих і сторінки. */
export async function getCategorySeo({ locale, categoryName, productCount }: { locale: string; categoryName: string; productCount: number }) {
  const t = await getTranslations({ locale, namespace: "seo" });
  const category = formatCategoryName(categoryName);

  return {
    category,
    title: t("categoryTitle", { category }),
    h1: t("categoryH1", { category }),
    description: t("categoryDescription", { category, count: productCount }),
  };
}
